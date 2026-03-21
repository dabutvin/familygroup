<template>
  <div class="journal-search d-flex align-center">
    <v-btn
      icon
      color="#f5f0e8"
      aria-label="Search journal"
      title="Search journal (⌘K / Ctrl+K)"
      @click="open"
    >
      <v-icon icon="mdi-magnify" />
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="560"
      scrollable
      @keydown.escape="close"
    >
      <v-card>
        <v-card-title class="text-h6 font-weight-regular">Search journal</v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            ref="searchField"
            v-model="searchInput"
            label="Search entries"
            placeholder="Type words from the journal…"
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
            clearable
            density="comfortable"
            variant="outlined"
            autocomplete="off"
            aria-label="Search journal entries"
          />
          <p
            v-if="!debouncedQuery"
            class="text-body-2 text-medium-emphasis mt-4 mb-0"
          >
            Start typing to search. All words must appear in an entry.
          </p>
          <p
            v-else-if="!searchResults.length"
            class="text-body-2 text-medium-emphasis mt-4 mb-0"
          >
            No matches.
          </p>
          <v-list v-else lines="two" class="mt-2 pa-0">
            <v-list-item
              v-for="r in searchResults"
              :key="r.entry.id"
              :title="r.entry.title"
              :subtitle="r.snippet"
              class="search-result-item px-0"
              @click="selectResult(r.entry)"
            />
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { searchEntries, tokenizeQuery } from "../searchEntries";

export default {
  name: "JournalSearch",
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  emits: ["select"],
  data() {
    return {
      dialog: false,
      searchInput: "",
      debouncedQuery: "",
      _searchDebounce: null,
      _searchKeydown: null,
    };
  },
  computed: {
    searchResults() {
      return searchEntries(this.debouncedQuery, this.entries);
    },
  },
  watch: {
    searchInput: {
      handler() {
        clearTimeout(this._searchDebounce);
        this._searchDebounce = setTimeout(() => {
          this.debouncedQuery = this.searchInput.trim();
        }, 200);
      },
    },
    debouncedQuery(q) {
      const nextQ = q || undefined;
      const cur = this.$route.query.q;
      const curStr = Array.isArray(cur) ? cur[0] : cur;
      if (String(curStr || "") === String(nextQ || "")) return;
      if (this.$route.name !== "home") return;
      const next = { ...this.$route.query };
      if (nextQ) next.q = nextQ;
      else delete next.q;
      this.$router.replace({ query: next }).catch(() => {});
    },
  },
  mounted() {
    const q = this.$route.query.q;
    const qs =
      typeof q === "string"
        ? q.trim()
        : Array.isArray(q)
          ? String(q[0] || "").trim()
          : "";
    if (qs) {
      this.searchInput = qs;
      this.debouncedQuery = qs;
      this.dialog = true;
    }
    this._searchKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.open();
      }
    };
    window.addEventListener("keydown", this._searchKeydown);
  },
  beforeUnmount() {
    if (this._searchKeydown) {
      window.removeEventListener("keydown", this._searchKeydown);
    }
  },
  methods: {
    open() {
      this.dialog = true;
      this.$nextTick(() => {
        const field = this.$refs.searchField;
        if (field?.focus) field.focus();
        else field?.$el?.querySelector?.("input")?.focus();
      });
    },
    close() {
      this.dialog = false;
    },
    selectResult(entry) {
      const tokens = tokenizeQuery(this.debouncedQuery);
      this.dialog = false;
      this.$emit("select", { entry, tokens });
    },
  },
};
</script>

<style scoped>
.search-result-item :deep(.v-list-item-subtitle) {
  white-space: normal;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
