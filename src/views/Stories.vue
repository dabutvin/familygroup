<template>
  <v-app id="stories-app">
    <v-app-bar color="#1b2a4a" density="compact">
      <v-btn icon="mdi-arrow-left" color="#f5f0e8" to="/" aria-label="Back to journal" />
      <v-toolbar-title class="stories-toolbar-title"
        >Isaac and Celia’s story</v-toolbar-title
      >
    </v-app-bar>
    <v-main class="stories-main">
      <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="lightboxImgs"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
      />
      <div class="stories-inner mx-auto pa-4 pa-sm-6 pb-12">
        <div
          ref="storyBody"
          class="content stories-content"
          v-html="bodyHtml"
          @click="onStoryContentClick"
        ></div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MarkdownIt from "markdown-it";
import VueEasyLightbox from "vue-easy-lightbox";
import storiesSource from "../assets/stories-page.md?raw";

const md = new MarkdownIt({ html: true });

export default {
  name: "Stories",
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      lightboxVisible: false,
      lightboxIndex: 0,
      lightboxImgs: [],
    };
  },
  computed: {
    bodyHtml() {
      return md.render(storiesSource.trim());
    },
  },
  methods: {
    onStoryContentClick(e) {
      if (e.target.tagName !== "IMG") return;
      const body = this.$refs.storyBody;
      if (!body) return;
      const imgs = Array.from(body.querySelectorAll("img"));
      const index = imgs.indexOf(e.target);
      if (index === -1) return;
      this.lightboxImgs = imgs.map((img) => ({
        src: img.currentSrc || img.src,
        title: img.getAttribute("alt") || "",
      }));
      this.lightboxIndex = index;
      this.lightboxVisible = true;
    },
  },
};
</script>

<style scoped>
.stories-main {
  background-color: #f5f0e8 !important;
  min-height: 100vh;
}

.stories-inner {
  max-width: 40rem;
}

.stories-toolbar-title {
  font-family: "Monomakh", Georgia, serif;
  font-size: 1.1rem;
  color: #f5f0e8;
}

.stories-lead {
  font-family: "Monomakh", Georgia, serif;
  font-size: 1.15rem;
  color: #1b2a4a;
  line-height: 1.45;
  margin: 0 0 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(27, 42, 74, 0.15);
}

.stories-content :deep(h2) {
  font-family: "Monomakh", Georgia, serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: #1b2a4a;
  margin: 2.25rem 0 0.85rem;
  line-height: 1.25;
  letter-spacing: 0.02em;
}

.stories-content :deep(h2:first-of-type) {
  margin-top: 0;
}

.stories-content :deep(h3) {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  margin: 1.5rem 0 0.5rem;
}

.stories-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(27, 42, 74, 0.12);
  margin: 2rem 0;
}

.stories-content :deep(p) {
  margin: 0 0 0.85em;
  text-indent: 1.5em;
}

.stories-content :deep(blockquote.stories-attribution) {
  margin: 0 0 1.5rem;
  padding: 1rem 1.1rem;
  border-left: 4px solid #1b2a4a;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 0 6px 6px 0;
}

.stories-content :deep(blockquote.stories-attribution p) {
  text-indent: 0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #444;
}

.stories-content :deep(p.stories-image-caption) {
  text-indent: 0;
  margin: -0.35rem 0 1rem;
  font-size: 0.85rem;
  font-style: italic;
  color: #555;
  line-height: 1.4;
}

.stories-content :deep(nav.stories-toc) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  align-items: baseline;
  margin: 0 0 1.75rem;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  border: 1px solid rgba(27, 42, 74, 0.1);
}

.stories-content :deep(.stories-toc-title) {
  width: 100%;
  margin: 0 0 0.35rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
  text-indent: 0;
}

.stories-content :deep(nav.stories-toc a) {
  font-size: 0.8125rem;
  color: #1b2a4a;
  text-decoration: none;
  border-bottom: 1px solid rgba(27, 42, 74, 0.25);
}

.stories-content :deep(nav.stories-toc a:hover) {
  border-bottom-color: #1b2a4a;
}

.stories-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 0.75rem 0 0.25rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
}

.stories-content :deep(ul) {
  margin: 0.5rem 0 1rem;
  padding-left: 1.5rem;
}

.stories-content :deep(ul li) {
  margin: 0.25rem 0;
}

.stories-content :deep(ul + p),
.stories-content :deep(h3 + p) {
  text-indent: 0;
}

.stories-content :deep(h2 + p) {
  text-indent: 1.5em;
}

.stories-content :deep(em) {
  font-style: italic;
}

</style>
