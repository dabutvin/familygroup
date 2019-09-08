<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-group
          eager
          sub-group
          prepend-icon="mdi-google-circles-communities"
          v-for="year in years"
          v-model="year.active"
          :key="year.text"
          @click="setActiveYear(year.text)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ year.text }}</v-list-item-title>
          </template>
          <v-list-item
            color="blue"
            v-for="entry in entriesByYear(year.text)"
            :key="entry.id"
            @click="setActiveYear(year.text, entry.id)"
          >
            <v-list-item-action>
              <v-icon
                color="blue"
                v-if="scrolledPost === entry.id"
                size="12"
              >mdi-checkbox-blank-circle</v-icon>
              <v-icon v-else size="12">mdi-checkbox-blank-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ entry.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-subheader class="mt-4 grey--text text--darken-1">Family</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" @click>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item class="mt-4" @click>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Family Tree</v-list-item-title>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-image</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Photos</v-list-item-title>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="grey" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Isaac and Celia Sklar Family Group</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>
    </v-app-bar>

    <v-content v-scroll="scrolled">
      <v-card class="mx-auto ma-6 pa-6" max-width="800px">
        <v-row align="center" justify="center">
          <v-col cols="9">
            <h1>{{ active }}</h1>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        class="mx-auto ma-6 pa-6"
        width="800px"
        v-for="entry in entriesByYear(active)"
        :key="entry.id"
      >
        <v-row align="center" justify="center">
          <v-col cols="9">
            <h2 :id="`entry_${entry.id}`">{{ entry.title }}</h2>
            <vue-markdown class="content" :source="entry.text"></vue-markdown>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mx-auto ma-6 pa-6" max-width="800px">
        <v-row align="center" justify="center">
          <v-col cols="9">
            <v-btn class="float-left" text @click="goPrevious">Previous</v-btn>
            <v-btn class="float-right" text @click="goNext">Next</v-btn>
            <h1>{{ active }}</h1>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
    <v-footer class="py-8">
      <div class="flex-grow-1"></div>
      <div>Hello &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { entries } from "../entries";

export default {
  props: {
    source: String
  },
  components: {
    VueMarkdown
  },
  data: () => ({
    drawer: null,
    entries: entries,
    years: [
      { text: 1939, active: true },
      { text: 1940, active: false },
      { text: 1941, active: false },
      { text: 1942, active: false },
      { text: 1943, active: false },
      { text: 1944, active: false },
      { text: 1945, active: false }
    ],
    active: 1939,
    scrolledPost: undefined,
    items2: [
      { picture: 28, text: "Joseph" },
      { picture: 38, text: "Apple" },
      { picture: 48, text: "Xbox Ahoy" },
      { picture: 58, text: "Nokia" },
      { picture: 78, text: "MKBHD" }
    ]
  }),
  computed: {},
  methods: {
    entriesByYear: function(year) {
      return this.entries.filter(entry => entry.year === year);
    },
    setActiveYear: function(year, id) {
      let duration = 400;
      if (this.active !== year) {
        duration = 0;
        for (let x of this.years) {
          x.active = false;
        }
      }
      this.active = year;
      this.drawer = null;
      if (id != undefined) {
        setTimeout(() => {
          this.$vuetify.goTo(`#entry_${id}`, {
            duration: duration
          });
        }, 10);
      } else {
        window.scrollTo(0, 0);
        this.scrolledPost = undefined;
      }
      setTimeout(() => {
        this.years.find(x => x.text === this.active).active = true;
      }, 0);
    },
    scrolled: function(e) {
      for (let i = this.entries.length - 1; i >= 0; i--) {
        let entry = document.querySelector(`#entry_${i}`);
        if (entry && entry.getBoundingClientRect().top < 50) {
          this.scrolledPost = i;
          break;
        }
      }
    },
    goNext: function() {
      this.setActiveYear(this.active + 1);
      this.years.find(x => x.text === this.active).active = true;
    },
    goPrevious: function() {
      this.setActiveYear(this.active - 1);
      this.years.find(x => x.text === this.active).active = true;
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
