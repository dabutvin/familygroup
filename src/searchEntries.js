/**
 * Strip common markdown for search indexing and snippets (readable plain text).
 * @param {string} s
 * @returns {string}
 */
export function stripMarkdown(s) {
  if (!s) return "";
  let t = s;
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  t = t.replace(/^#{1,6}\s+/gm, "");
  t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
  t = t.replace(/\*([^*]+)\*/g, "$1");
  t = t.replace(/__([^_]+)__/g, "$1");
  t = t.replace(/_([^_]+)_/g, "$1");
  t = t.replace(/`([^`]+)`/g, "$1");
  // Markdown sources use \$ for a literal dollar (math delimiter escape).
  t = t.replace(/\\\$/g, "$");
  // GFM table separator rows (pipes and hyphen runs only, e.g. |---|---| or | --- | --- |)
  t = t.replace(/\|(?:\s*:?-{2,}:?\s*\|)+/g, " ");
  // Raw HTML in sources (e.g. <div class="table-dashed"> around markdown tables)
  // must not appear in search snippets or normalization.
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/\s+/g, " ");
  return t.trim();
}

/**
 * @param {string} q
 * @returns {string[]}
 */
export function tokenizeQuery(q) {
  return q
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mergeRanges(ranges) {
  if (!ranges.length) return [];
  ranges.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const r of ranges) {
    if (!merged.length || r.start > merged[merged.length - 1].end) {
      merged.push({ start: r.start, end: r.end });
    } else {
      merged[merged.length - 1].end = Math.max(
        merged[merged.length - 1].end,
        r.end,
      );
    }
  }
  return merged;
}

function findRangesInText(text, tokens) {
  const lower = text.toLowerCase();
  const ranges = [];
  for (const tok of tokens) {
    if (!tok) continue;
    for (let i = 0; ; ) {
      const j = lower.indexOf(tok, i);
      if (j < 0) break;
      ranges.push({ start: j, end: j + tok.length });
      i = j + 1;
    }
  }
  return mergeRanges(ranges);
}

function buildHighlightedHtmlFromRanges(text, merged) {
  let out = "";
  let last = 0;
  for (const r of merged) {
    out += escapeHtml(text.slice(last, r.start));
    out +=
      '<mark class="search-highlight">' +
      escapeHtml(text.slice(r.start, r.end)) +
      "</mark>";
    last = r.end;
  }
  out += escapeHtml(text.slice(last));
  return out;
}

/**
 * Escape plain text, wrapping token matches in &lt;mark class="search-highlight"&gt;.
 * @param {string} text
 * @param {string[]} tokens
 * @returns {string}
 */
export function highlightPlainText(text, tokens) {
  if (!tokens.length) return escapeHtml(text);
  const merged = findRangesInText(text, tokens);
  if (!merged.length) return escapeHtml(text);
  return buildHighlightedHtmlFromRanges(text, merged);
}

function highlightTextNode(textNode, tokens) {
  const merged = findRangesInText(textNode.data, tokens);
  if (!merged.length) return;
  const html = buildHighlightedHtmlFromRanges(textNode.data, merged);
  const parent = textNode.parentNode;
  if (!parent) return;
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  while (tpl.content.firstChild) {
    parent.insertBefore(tpl.content.firstChild, textNode);
  }
  parent.removeChild(textNode);
}

function walkHighlight(node, tokens) {
  if (node.nodeType === Node.TEXT_NODE) {
    highlightTextNode(node, tokens);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node;
  if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return;
  const children = [...node.childNodes];
  for (const c of children) walkHighlight(c, tokens);
}

/**
 * Wrap token matches in rendered HTML (text nodes only; skips script/style).
 * @param {string} html
 * @param {string[]} tokens
 * @returns {string}
 */
export function highlightHtmlWithTokens(html, tokens) {
  if (!tokens.length || typeof document === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;
  if (!body) return html;
  const children = [...body.childNodes];
  for (const c of children) walkHighlight(c, tokens);
  return body.innerHTML;
}

/**
 * @param {string} plain
 * @param {string[]} tokens
 * @returns {number} -1 if no token found
 */
function firstMatchIndex(plain, tokens) {
  const lower = plain.toLowerCase();
  let best = -1;
  for (const tok of tokens) {
    const i = lower.indexOf(tok);
    if (i >= 0 && (best < 0 || i < best)) best = i;
  }
  return best;
}

/**
 * @param {{ title: string, text: string }} entry
 * @param {string[]} tokens
 * @param {number} [maxLen]
 * @returns {string}
 */
export function snippetForEntry(entry, tokens, maxLen = 140) {
  const displayPlain = stripMarkdown(`${entry.title} ${entry.text}`);
  if (!tokens.length) {
    return displayPlain.length > maxLen
      ? `${displayPlain.slice(0, maxLen)}…`
      : displayPlain;
  }
  const idx = firstMatchIndex(displayPlain, tokens);
  if (idx < 0) {
    const head = displayPlain.slice(0, maxLen);
    return displayPlain.length > maxLen ? `${head}…` : head;
  }
  const half = Math.floor(maxLen / 2);
  const start = Math.max(0, idx - half);
  const end = Math.min(displayPlain.length, start + maxLen);
  let out = displayPlain.slice(start, end);
  if (start > 0) out = `…${out}`;
  if (end < displayPlain.length) out = `${out}…`;
  return out;
}

/**
 * @param {string} titleNorm
 * @param {string} bodyNorm
 * @param {string} token
 * @returns {number}
 */
function tokenScore(titleNorm, bodyNorm, token) {
  if (titleNorm.includes(token)) return 10;
  if (bodyNorm.includes(token)) return 3;
  return 0;
}

/**
 * @param {string} query
 * @param {Array<{ id: number, year: number, date: string, title: string, text: string }>} entries
 * @returns {Array<{ entry: (typeof entries)[number], score: number, snippet: string }>}
 */
export function searchEntries(query, entries) {
  const tokens = tokenizeQuery(query);
  if (!tokens.length) return [];

  const results = [];
  for (const entry of entries) {
    const titleNorm = stripMarkdown(entry.title).toLowerCase();
    const bodyNorm = stripMarkdown(entry.text).toLowerCase();
    let score = 0;
    let ok = true;
    for (const tok of tokens) {
      const s = tokenScore(titleNorm, bodyNorm, tok);
      if (s === 0) {
        ok = false;
        break;
      }
      score += s;
    }
    if (!ok) continue;
    results.push({
      entry,
      score,
      snippet: snippetForEntry(entry, tokens),
    });
  }
  results.sort((a, b) => b.score - a.score || a.entry.id - b.entry.id);
  return results;
}
