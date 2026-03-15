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
      <v-card class="mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6" max-width="800px">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="9">
            <h1>{{ active }}</h1>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        :id="`entry_${entry.id}`"
        class="mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6"
        max-width="800px"
        v-for="entry in entriesByYear(active)"
        :key="entry.id"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="9">
            <h2 class="entry-title">
              {{ entry.title }}
            </h2>
            <div class="content" v-html="renderMarkdown(entry.text)"></div>
          </v-col>
        </v-row>
      </v-card>
      <div class="mt-8"></div>
      <v-card class="mx-auto ma-3 ma-sm-6 pa-4 pa-sm-6" max-width="800px">
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
import { entries } from "../entries";

const md = new MarkdownIt();

export default {
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
    };
  },
  methods: {
    renderMarkdown(text) {
      return md.render(text);
    },
    entriesByYear(year) {
      return this.entries.filter((entry) => entry.year === year);
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
.entry-title {
  text-align: right;
  font-style: italic;
  font-weight: normal;
  font-size: 17px;
  margin-bottom: 11px;
  margin-right: 0;
}
@media (min-width: 600px) {
  .entry-title {
    margin-right: -65px;
  }
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
