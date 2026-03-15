<template>
  <div>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="lightboxImgs"
      :index="index"
      @hide="visible = false"
    />
    <div class="img-container">
      <img
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="showImg(imageIndex)"
        :src="image.thumb"
      />
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";

const photoFiles = import.meta.glob("../photos/*.jpg", {
  eager: true,
  import: "default",
});
const thumbFiles = import.meta.glob("../photos/thumbs/*.jpg", {
  eager: true,
  import: "default",
});

function photo(name) {
  return photoFiles[`../photos/${name}`];
}
function thumb(name) {
  return thumbFiles[`../photos/thumbs/${name}`];
}

export default {
  components: {
    VueEasyLightbox,
  },
  data: () => ({
    visible: false,
    index: 0,
    images: [
      { title: "First meeting notes", file: "05-14-1939.jpg" },
      { title: "First meeting notes (2)", file: "05-14-1939-2.jpg" },
      { title: "Isaac Sklar", file: "isaac-sklar.jpg" },
      { title: "Beatrice and Irving Pinchuk", file: "mother-daddy.jpg" },
      { title: "Isaac and Celia Sklar", file: "isaac-and-celia.jpg" },
      {
        title: "Beatrice and Irving Pinchuk",
        file: "irving-and-mabeatty.jpg",
      },
      {
        title: "Jen Butvinik, Kathy Givler, Sophie Romberger",
        file: "IMG_20151215_185559.jpg",
      },
      {
        title: "Charlotte Alban and Elizabeth Adams",
        file: "charlotte-and-elizabeth.jpg",
      },
      { title: "Beatrice and Irving Pinchuk", file: "bea-irving.jpg" },
      {
        title: "Charlotte, baby Scott, Beatrice, and Celia",
        file: "charlotte-scott-bea-celia.jpg",
      },
      { title: "Marty", file: "marty.jpg" },
      { title: "Marilyn holding Karen", file: "marilyn-karen.jpg" },
      { title: "Isaac and Celia Sklar", file: "isaac-celia-2.jpg" },
      { title: "Marty", file: "marty-2.jpg" },
      { title: "Warren Butvinik and Jen", file: "warren-jen.jpg" },
      { title: "Marilyn and Fred Butvinik", file: "marilyn-fred.jpg" },
      { title: "Cheryl", file: "cheryl.jpg" },
      { title: "Marilyn and Fred", file: "marilyn-fred-2.jpg" },
      {
        title: "50th Anniversary party for Beatrice and Irving",
        file: "50th-anniversary.jpg",
      },
      { title: "Marty, Jen, and Dan", file: "marty-jen-dan.jpg" },
      { title: "Warren's Bar Mitzvah", file: "warren-bar-mitzvah.jpg" },
      { title: "Beatrice and Irving Pinchuk", file: "bea-irving-2.jpg" },
      {
        title: "James, Warren, Dan, and Fred",
        file: "james-warren-dan-fred.jpg",
      },
      { title: "Marilyn and Fred Butvinik", file: "marilyn-fred-3.jpg" },
      { title: "Warren, Cheryl, Bonnie", file: "warren-cheryl-bonnie.jpg" },
      { title: "James and Dan", file: "james-dan.jpg" },
      { title: "Cheryl", file: "cheryl-2.jpg" },
      {
        title: "Cheryl, James, Liz, Jim, Karen, Jen, Dan, and Kim",
        file: "cheryl-james-liz-jim-karen-jen-dan-kim.jpg",
      },
      { title: "Marilyn and Fred Butvinik", file: "marilyn-fred-4.jpg" },
      { title: "Bonnie", file: "bonnie.jpg" },
      { title: "Bonnie", file: "bonnie-2.jpg" },
      { title: "Cheryl", file: "cheryl-3.jpg" },
      { title: "Second meeting notes", file: "06-18-1939.jpg" },
      { title: "Second meeting notes (2)", file: "06-18-1939-2.jpg" },
    ].map((img) => ({
      ...img,
      href: photo(img.file),
      thumb: thumb(img.file),
    })),
  }),
  computed: {
    lightboxImgs() {
      return this.images.map((img) => ({
        src: img.href,
        title: img.title,
      }));
    },
  },
  methods: {
    showImg(imageIndex) {
      this.index = imageIndex;
      this.visible = true;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.img-container {
  columns: 6 150px;
  column-gap: 1rem;
}

.image {
  margin: 0 1rem 1rem 0;
  display: inline-block;
  width: 100%;
  cursor: pointer;
}
</style>
