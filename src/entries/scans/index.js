const scanFiles = import.meta.glob("./**/*.jpg", {
  eager: true,
  import: "default",
});

function parseFilename(filename) {
  const match = filename.match(/^page-(\d+)(?:-(.+))?\.jpg$/);
  if (!match) return null;
  const pageNum = parseInt(match[1], 10);
  const suffix = match[2];
  let label = `Page ${pageNum}`;
  if (suffix) {
    label += ` (${suffix})`;
  }
  return { pageNum, label };
}

export function getScans(date) {
  const prefix = `./${date}/`;
  const results = [];

  for (const [path, src] of Object.entries(scanFiles)) {
    if (!path.startsWith(prefix)) continue;
    const filename = path.slice(prefix.length);
    const parsed = parseFilename(filename);
    if (!parsed) continue;
    results.push({
      src,
      label: parsed.label,
      pageNum: parsed.pageNum,
    });
  }

  results.sort((a, b) => a.pageNum - b.pageNum);
  return results;
}
