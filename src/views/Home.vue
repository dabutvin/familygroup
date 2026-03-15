<template>
  <v-app id="inspire">
    <v-app-bar color="white" density="compact" :order="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="text-h6">The Isaac and Celia Sklar Family Group</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :order="1">
      <v-list density="compact" open-strategy="multiple" :opened="openedGroups">
        <v-list-group
          v-for="year in years"
          :key="year.text"
          :value="year.text"
          subgroup
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-google-circles-communities"
              :title="String(year.text)"
              @click.stop="setActiveYear(year.text)"
            />
          </template>
          <v-list-item
            v-for="entry in entriesByYear(year.text)"
            :key="entry.id"
            :title="entry.title"
            color="blue"
            :active="scrolledPost === entry.id"
            @click="setActiveYear(year.text, entry.id)"
          >
            <template v-slot:prepend>
              <v-icon
                v-if="scrolledPost === entry.id"
                color="blue"
                size="12"
                icon="mdi-checkbox-blank-circle"
              />
              <v-icon
                v-else
                size="12"
                icon="mdi-checkbox-blank-circle-outline"
              />
            </template>
          </v-list-item>
        </v-list-group>

        <v-list-item
          class="mt-4"
          to="/tree"
          prepend-icon="mdi-plus-circle-outline"
          title="Family Tree"
        />
        <v-list-item
          to="/photos"
          prepend-icon="mdi-image"
          title="Photos"
        />
        <v-list-item prepend-icon="mdi-cog" title="About" />
      </v-list>
    </v-navigation-drawer>

    <v-main v-scroll="scrolled">
      <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="lightboxImgs"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
      />
      <v-card class="entry-card mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6">
        <div class="entry-layout">
          <div class="entry-text-col">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="9">
                <h1>{{ active }}</h1>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
      <v-card
        :id="`entry_${entry.id}`"
        class="entry-card mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6"
        v-for="entry in entriesByYear(active)"
        :key="entry.id"
      >
        <div class="entry-layout">
          <div class="entry-text-col">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="9">
                <h2 class="entry-title">
                  {{ entry.title }}
                </h2>
                <div class="content" v-html="renderMarkdown(entry.text)"></div>
                <div
                  v-if="entryScans(entry.date).length"
                  class="scan-thumbs-row"
                >
                  <img
                    v-for="(scan, si) in entryScans(entry.date)"
                    :key="si"
                    :src="scan.src"
                    :alt="scan.label"
                    :title="scan.label"
                    class="scan-thumb"
                    @click="openLightbox(entry.date, si)"
                  />
                </div>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="entryScans(entry.date).length"
            class="entry-scan-col"
          >
            <img
              v-for="(scan, si) in entryScans(entry.date)"
              :key="si"
              :src="scan.src"
              :alt="scan.label"
              :title="scan.label"
              class="scan-side-img"
              @click="openLightbox(entry.date, si)"
            />
          </div>
        </div>
      </v-card>
      <div class="mt-8"></div>
      <v-card class="entry-card mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6">
        <div class="entry-layout">
          <div class="entry-text-col">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="9">
                <v-btn class="float-left" variant="text" @click="goPrevious">
                  Previous
                </v-btn>
                <v-btn class="float-right" variant="text" @click="goNext">
                  Next
                </v-btn>
                <h1>{{ active }}</h1>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-main>
    <v-footer class="py-8">
      <div class="flex-grow-1"></div>
      <div>Dedicated in memory to Marilyn Butvinik (2/14/1931 &ndash; 11/17/2025)</div>
    </v-footer>
  </v-app>
</template>

<script>
import MarkdownIt from "markdown-it";
import VueEasyLightbox from "vue-easy-lightbox";
import { entries } from "../entries";
import { getScans } from "../entries/scans";

const md = new MarkdownIt();

const scanCache = {};
function getCachedScans(date) {
  if (!scanCache[date]) {
    scanCache[date] = getScans(date);
  }
  return scanCache[date];
}

export default {
  components: {
    VueEasyLightbox,
  },
  props: {
    source: String,
  },
  data() {
    const isDesktop = window.innerWidth >= 960;
    return {
      drawer: isDesktop,
      entries: entries,
      years: [
        { text: 1939 },
        { text: 1940 },
        { text: 1941 },
        { text: 1942 },
        { text: 1943 },
        { text: 1944 },
        { text: 1945 },
        { text: 1946 },
        { text: 1947 },
        { text: 1948 },
      ],
      active: 1939,
      openedGroups: [1939],
      scrolledPost: undefined,
      lightboxVisible: false,
      lightboxIndex: 0,
      lightboxImgs: [],
    };
  },
  methods: {
    renderMarkdown(text) {
      return md.render(text);
    },
    entriesByYear(year) {
      return this.entries.filter((entry) => entry.year === year);
    },
    entryScans(date) {
      return getCachedScans(date);
    },
    openLightbox(date, index) {
      const scans = getCachedScans(date);
      this.lightboxImgs = scans.map((s) => ({ src: s.src, title: s.label }));
      this.lightboxIndex = index;
      this.lightboxVisible = true;
    },
    setActiveYear(year, id) {
      this.active = year;
      if (!this.openedGroups.includes(year)) {
        this.openedGroups = [year];
      }
      if (id != undefined && window.innerWidth < 960) {
        this.drawer = false;
      }
      if (id != undefined) {
        this.$nextTick(() => {
          const el = document.querySelector(`#entry_${id}`);
          if (el) {
            const appBar = document.querySelector(".v-app-bar");
            const offset = appBar ? appBar.offsetHeight + 16 : 64;
            const top =
              el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        });
      } else {
        window.scrollTo(0, 0);
        const firstEntry = this.entriesByYear(year)[0];
        this.scrolledPost = firstEntry ? firstEntry.id : undefined;
      }
    },
    scrolled() {
      for (let i = this.entries.length - 1; i >= 0; i--) {
        let entry = document.querySelector(`#entry_${i}`);
        if (entry && entry.getBoundingClientRect().top < 75) {
          this.scrolledPost = i;
          break;
        }
      }
    },
    goNext() {
      this.setActiveYear(this.active + 1);
    },
    goPrevious() {
      this.setActiveYear(this.active - 1);
    },
  },
};
</script>

<style scoped>
.entry-card {
  max-width: 800px;
}

.entry-layout {
  display: flex;
  gap: 24px;
}

.entry-text-col {
  flex: 1;
  min-width: 0;
}

.entry-scan-col {
  display: none;
  flex-shrink: 0;
  width: 450px;
  align-self: flex-start;
  position: sticky;
  top: 72px;
}

.scan-side-img {
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
  margin-bottom: 12px;
}

.scan-side-img:hover {
  opacity: 1;
}

.scan-thumbs-row {
  display: flex;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.scan-thumb {
  height: 100px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s;
}

.scan-thumb:hover {
  opacity: 1;
}

@media (min-width: 1200px) {
  .entry-card {
    max-width: 1300px;
  }

  .entry-scan-col {
    display: block;
  }

  .scan-thumbs-row {
    display: none;
  }
}

.content :deep(p) {
  margin-bottom: 0.75em;
  text-indent: 3.5em;
}

.entry-title {
  text-align: right;
  font-style: italic;
  font-weight: normal;
  font-size: 17px;
  margin-bottom: 11px;
  margin-right: 0;
}
</style>

<style>
#inspire .v-navigation-drawer .v-list-item-title {
  font-size: 0.8125rem;
}
#inspire .v-navigation-drawer .v-list-item {
  padding-inline-start: 8px !important;
  padding-inline-end: 8px !important;
}
#inspire .v-navigation-drawer .v-list-group__items .v-list-item {
  padding-inline-start: 24px !important;
}
</style>
