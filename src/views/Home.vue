<template>
  <v-app id="inspire">
    <v-app-bar color="#1b2a4a" density="compact" :order="0">
      <v-app-bar-nav-icon color="#f5f0e8" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="app-bar-title">The Isaac and Celia Sklar Family Group</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :order="1" color="#f5f0e8">
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
              :title="String(year.text)"
              @click.stop="setActiveYear(year.text)"
            />
          </template>
          <v-list-item
            v-for="entry in entriesByYear(year.text)"
            :key="entry.id"
            :title="entry.title"
            color="#1b2a4a"
            :active="scrolledPost === entry.id"
            @click="setActiveYear(year.text, entry.id)"
          >
            <template v-slot:prepend>
              <v-icon
                v-if="scrolledPost === entry.id"
                color="#1b2a4a"
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
          class="mt-6"
          to="/tree"
          prepend-icon="mdi-plus-circle-outline"
          title="Family Tree"
        />
        <v-list-item
          class="mt-2"
          to="/photos"
          prepend-icon="mdi-image"
          title="Photos"
        />
        <v-list-item class="mt-2" prepend-icon="mdi-cog" title="About" />
      </v-list>
    </v-navigation-drawer>

    <v-main v-scroll="scrolled" class="beige-bg">
      <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="lightboxImgs"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
      />
      <div class="year-masthead">
        <div class="masthead-rule masthead-rule--top"></div>
        <div class="masthead-content">
          <div
            v-for="(h, hi) in yearHeadlines(active)"
            :key="hi"
            class="masthead-headline"
            :style="h.style"
            aria-hidden="true"
          >
            {{ h.text }}
          </div>
          <div class="entry-section mx-auto px-4 px-sm-6">
            <div class="entry-layout">
              <div class="entry-text-col">
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="9">
                    <h1 class="year-heading">{{ active }}</h1>
                  </v-col>
                </v-row>
              </div>
              <div class="entry-scan-col-spacer"></div>
            </div>
          </div>
        </div>
        <div class="masthead-rule masthead-rule--bottom"></div>
      </div>
      <div
        :id="`entry_${entry.id}`"
        class="entry-section mx-auto pa-4 pa-sm-6"
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
                  <div
                    v-for="(scan, si) in entryScans(entry.date)"
                    :key="si"
                    class="scan-matte"
                  >
                    <img
                      :src="scan.src"
                      :alt="scan.label"
                      :title="scan.label"
                      class="scan-thumb"
                      @click="openLightbox(entry.date, si)"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="entryScans(entry.date).length"
            class="entry-scan-col"
          >
            <div
              v-for="(scan, si) in entryScans(entry.date)"
              :key="si"
              class="scan-matte scan-matte--side"
            >
              <img
                :src="scan.src"
                :alt="scan.label"
                :title="scan.label"
                class="scan-side-img"
                @click="openLightbox(entry.date, si)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8"></div>
      <div class="entry-section mx-auto pa-4 pa-sm-6">
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
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <footer class="site-footer">
        Dedicated in memory to Marilyn Butvinik (2/14/1931 &ndash; 11/17/2025)
      </footer>
    </v-main>
  </v-app>
</template>

<script>
import MarkdownIt from "markdown-it";
import VueEasyLightbox from "vue-easy-lightbox";
import { entries } from "../entries";
import { getScans } from "../entries/scans";

const md = new MarkdownIt({ html: true });

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
    yearHeadlines(year) {
      const all = {
        1939: [
          "World's Fair Opens in New York",
          "Germany Invades Poland",
          "Gone With the Wind Premieres",
          "Einstein Warns Roosevelt on Atomic Bomb",
          "Lou Gehrig Bids Farewell",
        ],
        1940: [
          "Roosevelt Wins Third Term",
          "Blitz Rains Fire on London",
          "Selective Service Act Signed",
          "Fantasia Opens in Theaters",
          "Hemingway Publishes Bell Tolls",
        ],
        1941: [
          "Pearl Harbor Attacked",
          "United States Enters the War",
          "Lend-Lease Act Signed",
          "Joe DiMaggio's 56-Game Streak",
          "Citizen Kane Released",
        ],
        1942: [
          "Rationing Begins Across Nation",
          "Battle of Midway Turns the Tide",
          "Casablanca Premieres",
          "Women Enter the Workforce",
          "Voice of America Goes on Air",
        ],
        1943: [
          "Allies Invade Sicily",
          "Mussolini Overthrown",
          "Zoot Suit Riots in Los Angeles",
          "Pentagon Building Completed",
          "Oklahoma! Opens on Broadway",
        ],
        1944: [
          "Allied Forces Storm Normandy",
          "Paris Liberated",
          "GI Bill Signed Into Law",
          "Eisenhower Leads D-Day Invasion",
          "Smokey Bear Campaign Begins",
        ],
        1945: [
          "Victory in Europe!",
          "War Is Over!",
          "United Nations Charter Signed",
          "Atomic Bomb Dropped on Hiroshima",
          "Troops Come Home at Last",
        ],
        1946: [
          "United Nations Holds First Session",
          "Baby Boom Sweeps the Nation",
          "Nuremberg Verdicts Delivered",
          "It's a Wonderful Life Opens",
          "ENIAC Computer Unveiled",
        ],
        1947: [
          "Jackie Robinson Breaks Color Barrier",
          "Marshall Plan Announced",
          "Dead Sea Scrolls Discovered",
          "India Gains Independence",
          "A Streetcar Named Desire Opens",
        ],
        1948: [
          "State of Israel Proclaimed",
          "Truman Wins in Stunning Upset",
          "Berlin Airlift Begins",
          "NHS Founded in Britain",
          "Polaroid Camera Goes on Sale",
        ],
      };
      const layouts = [
        { top: "8%",  left: "2%",  rotate: -6,  size: 1.4 },
        { top: "62%", left: "55%", rotate: 4,   size: 1.1 },
        { top: "15%", left: "58%", rotate: -10,  size: 1.7 },
        { top: "70%", left: "5%",  rotate: 7,   size: 1.0 },
        { top: "38%", left: "35%", rotate: -3,  size: 1.3 },
      ];
      return (all[year] || []).map((text, i) => ({
        text,
        style: {
          top: layouts[i].top,
          left: layouts[i].left,
          transform: `rotate(${layouts[i].rotate}deg)`,
          fontSize: `${layouts[i].size}rem`,
        },
      }));
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
.beige-bg {
  background-color: #f5f0e8 !important;
}

.entry-section {
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

.entry-scan-col,
.entry-scan-col-spacer {
  display: none;
  flex-shrink: 0;
  width: 450px;
  align-self: flex-start;
}

.entry-scan-col {
  position: sticky;
  top: 72px;
}

.scan-matte {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  line-height: 0;
}

.scan-matte--side {
  display: block;
  margin-bottom: 12px;
}

.scan-matte .scan-thumb,
.scan-matte .scan-side-img {
  border-radius: 4px;
  display: block;
}

.scan-side-img {
  width: 100%;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
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
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s;
}

.scan-thumb:hover {
  opacity: 1;
}

@media (min-width: 1200px) {
  .entry-section {
    max-width: 1300px;
  }

  .entry-scan-col,
  .entry-scan-col-spacer {
    display: block;
  }

  .scan-thumbs-row {
    display: none;
  }
}

.content :deep(p) {
  margin-bottom: 0.75em;
  text-indent: 2em;
}

.content :deep(hr) {
  margin: 2em 0;
}

/* shared table base */
.content :deep(table) {
  border-collapse: collapse;
  border: none;
  width: 100%;
  max-width: 380px;
  margin: 1em 0;
  font-family: "Courier Prime", "IBM Plex Mono", monospace;
  font-size: 0.9em;
}

.content :deep(table thead),
.content :deep(table tbody) {
  display: block;
}

.content :deep(table tr) {
  display: flex;
  align-items: baseline;
  border: none;
  background: none;
}

.content :deep(table th),
.content :deep(table td) {
  border: none;
  padding: 2px 0;
  background: none;
  white-space: nowrap;
  font-weight: normal;
  text-align: left;
}

.content :deep(table thead th:first-child) {
  font-weight: bold;
}

.content :deep(table thead th:last-child:not(:first-child)) {
  display: none;
}

.content :deep(table td:first-child) {
  display: flex;
  align-items: baseline;
  flex: 1;
  min-width: 0;
}

.content :deep(table td:last-child) {
  flex-shrink: 0;
  text-align: right;
}

/* table-dashed: dash leaders between columns */
.content :deep(.table-dashed table thead tr) {
  border-bottom: 2px dashed #999;
  padding-bottom: 2px;
  margin-bottom: 2px;
}

.content :deep(.table-dashed table td:first-child)::after {
  content: "";
  flex: 1;
  border-bottom: 2px dashed #999;
  margin: 0 2px;
  min-width: 8px;
  position: relative;
  top: -2px;
}

.content :deep(.table-no-header table thead) {
  display: none;
}

.entry-title {
  text-align: left;
  font-family: "Monomakh", Georgia, serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1.5em;
  margin-right: 0;
}

.year-masthead {
  text-align: left;
  padding: 1.5em 1em 0;
  width: 100%;
}

.masthead-content {
  position: relative;
  overflow: hidden;
}

.masthead-headline {
  position: absolute;
  font-family: "Monomakh", Georgia, serif;
  font-weight: 700;
  line-height: 1.1;
  color: #1b2a4a;
  opacity: 0.06;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.masthead-rule {
  height: 0;
  border: none;
  margin: 0 auto;
}

.masthead-rule--top {
  border-top: 3px double #1b2a4a;
  border-bottom: 1px solid #1b2a4a;
  height: 5px;
  margin-bottom: 0.4em;
}

.masthead-rule--bottom {
  border-top: 1px solid #1b2a4a;
  border-bottom: 3px double #1b2a4a;
  height: 5px;
  margin-top: 0.3em;
}

.year-heading {
  font-family: "Monomakh", Georgia, serif;
  font-weight: 700;
  font-size: 4rem;
  letter-spacing: 0.04em;
  text-align: left;
  margin: 0.4em 0;
  line-height: 1;
  color: #1b2a4a;
}

.app-bar-title {
  font-family: "Monomakh", Georgia, serif;
  font-size: 1.1rem;
  color: #f5f0e8;
}
</style>

<style>
#inspire .v-navigation-drawer .v-list-item-title {
  font-size: 0.8125rem;
  color: #333;
}
#inspire .v-navigation-drawer .v-list-item {
  padding-inline-start: 16px !important;
  padding-inline-end: 8px !important;
  color: #333;
}
#inspire .v-navigation-drawer .v-list-item .v-icon {
  color: #333;
}
#inspire .v-navigation-drawer .v-list-item > .v-list-item__prepend {
  width: 32px !important;
  margin-inline-end: 0 !important;
  padding-inline-end: 0 !important;
  gap: 0 !important;
  flex: none !important;
}
#inspire .v-navigation-drawer .v-list-group__items .v-list-item > .v-list-item__prepend {
  width: 20px !important;
}
#inspire .v-navigation-drawer .v-list-group__items .v-list-item {
  padding-inline-start: 32px !important;
}
#inspire .v-navigation-drawer .v-list-item--active {
  background-color: #1b2a4a !important;
  color: #f5f0e8 !important;
}
#inspire .v-navigation-drawer .v-list-item--active > .v-list-item__overlay {
  opacity: 0 !important;
}
#inspire .v-navigation-drawer .v-list-item--active .v-list-item-title {
  color: #f5f0e8 !important;
}
#inspire .v-navigation-drawer .v-list-item--active .v-icon {
  color: #f5f0e8 !important;
}
.site-footer {
  background-color: #1b2a4a;
  color: #f5f0e8;
  padding: 24px 16px;
  width: 100%;
  text-align: center;
}
</style>
