<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-group sub-group v-for="year in years" :key="year" @click="setActiveYear(year)">
          <template v-slot:activator>
            <v-list-item-title>{{ year }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="entry in entriesByYear(year)"
            :key="entry.id"
            @click="setActiveYear(year)"
          >
            <v-list-item-action>
              <v-icon>mdi-file-document</v-icon>
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

    <v-content>
      <v-card raised="true" class="mx-auto ma-5 pa-5" max-width="700px">
        <h1>{{ active }}</h1>
      </v-card>
      <v-card
        raised="true"
        class="mx-auto ma-5 pa-5"
        width="700px"
        v-for="entry in entriesByYear(active)"
        :key="entry.id"
      >
        <v-row>
          <v-col>
            <h2>{{ entry.title }}</h2>
            <vue-markdown class="content" :source="entry.text"></vue-markdown>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
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
    years: [1939, 1940],
    active: 1939,
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
    setActiveYear: function(year) {
      this.active = year;
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
