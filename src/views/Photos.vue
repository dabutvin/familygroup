<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div class="img-container">
      <img
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :src="image.thumb"
      />
    </div>
  </div>
</template>
<script>
import VueGallery from "vue-gallery";

export default {
  components: {
    gallery: VueGallery
  },
  methods: {
    onClick(i) {
      this.index = i;
    }
  },
  data: () => ({
    images: [
      {
        title: "First meeting notes",
        href: require("../photos/05-14-1939.jpg"),
        thumb: require("../photos/thumbs/05-14-1939.jpg")
      },
      {
        title: "First meeting notes (2)",
        href: require("../photos/05-14-1939-2.jpg"),
        thumb: require("../photos/thumbs/05-14-1939-2.jpg")
      },
      {
        title: "Isaac Sklar",
        href: require("../photos/isaac-sklar.jpg"),
        thumb: require("../photos/thumbs/isaac-sklar.jpg")
      },
      {
        title: "Beatrice and Irving Pinchuk",
        href: require("../photos/mother-daddy.jpg"),
        thumb: require("../photos/thumbs/mother-daddy.jpg")
      },
      {
        title: "Isaac and Celia Sklar",
        href: require("../photos/isaac-and-celia.jpg"),
        thumb: require("../photos/thumbs/isaac-and-celia.jpg")
      },
      {
        title: "Beatrice and Irving Pinchuk",
        href: require("../photos/irving-and-mabeatty.jpg"),
        thumb: require("../photos/thumbs/irving-and-mabeatty.jpg")
      },
      {
        title: "Jen Butvinik, Kathy Givler, Sophie Romberger",
        href: require("../photos/IMG_20151215_185559.jpg"),
        thumb: require("../photos/thumbs/IMG_20151215_185559.jpg")
      },
      {
        title: "Charlotte Alban and Elizabeth Adams",
        href: require("../photos/charlotte-and-elizabeth.jpg"),
        thumb: require("../photos/thumbs/charlotte-and-elizabeth.jpg")
      },
      {
        title: "Beatrice and Irving Pinchuk",
        href: require("../photos/bea-irving.jpg"),
        thumb: require("../photos/thumbs/bea-irving.jpg")
      },
      {
        title: "Charlotte, baby Scott, Beatrice, and Celia",
        href: require("../photos/charlotte-scott-bea-celia.jpg"),
        thumb: require("../photos/thumbs/charlotte-scott-bea-celia.jpg")
      },
      {
        title: "Marty",
        href: require("../photos/marty.jpg"),
        thumb: require("../photos/thumbs/marty.jpg")
      },
      {
        title: "Marilyn holding Karen",
        href: require("../photos/marilyn-karen.jpg"),
        thumb: require("../photos/thumbs/marilyn-karen.jpg")
      },
      {
        title: "Isaac and Celia Sklar",
        href: require("../photos/isaac-celia-2.jpg"),
        thumb: require("../photos/thumbs/isaac-celia-2.jpg")
      },
      {
        title: "Marty",
        href: require("../photos/marty-2.jpg"),
        thumb: require("../photos/thumbs/marty-2.jpg")
      },
      {
        title: "Warren Butvinik and Jen",
        href: require("../photos/warren-jen.jpg"),
        thumb: require("../photos/thumbs/warren-jen.jpg")
      },
      {
        title: "Marilyn and Fred Butvinik",
        href: require("../photos/marilyn-fred.jpg"),
        thumb: require("../photos/thumbs/marilyn-fred.jpg")
      },
      {
        title: "Cheryl",
        href: require("../photos/cheryl.jpg"),
        thumb: require("../photos/thumbs/cheryl.jpg")
      },
      {
        title: "Marilyn and Fred",
        href: require("../photos/marilyn-fred-2.jpg"),
        thumb: require("../photos/thumbs/marilyn-fred-2.jpg")
      },
      {
        title: "50th Anniversary party for Beatrice and Irving",
        href: require("../photos/50th-anniversary.jpg"),
        thumb: require("../photos/thumbs/50th-anniversary.jpg")
      },
      {
        title: "Marty, Jen, and Dan",
        href: require("../photos/marty-jen-dan.jpg"),
        thumb: require("../photos/thumbs/marty-jen-dan.jpg")
      },
      {
        title: "Warren's Bar Mitzvah",
        href: require("../photos/warren-bar-mitzvah.jpg"),
        thumb: require("../photos/thumbs/warren-bar-mitzvah.jpg")
      },
      {
        title: "Beatrice and Irving Pinchuk",
        href: require("../photos/bea-irving-2.jpg"),
        thumb: require("../photos/thumbs/bea-irving-2.jpg")
      },
      {
        title: "James, Warren, Dan, and Fred",
        href: require("../photos/james-warren-dan-fred.jpg"),
        thumb: require("../photos/thumbs/james-warren-dan-fred.jpg")
      },
      {
        title: "Marilyn and Fred Butvinik",
        href: require("../photos/marilyn-fred-3.jpg"),
        thumb: require("../photos/thumbs/marilyn-fred-3.jpg")
      },
      {
        title: "Warren, Cheryl, Bonnie",
        href: require("../photos/warren-cheryl-bonnie.jpg"),
        thumb: require("../photos/thumbs/warren-cheryl-bonnie.jpg")
      },
      {
        title: "James and Dan",
        href: require("../photos/james-dan.jpg"),
        thumb: require("../photos/thumbs/james-dan.jpg")
      },
      {
        title: "Cheryl",
        href: require("../photos/cheryl-2.jpg"),
        thumb: require("../photos/thumbs/cheryl-2.jpg")
      },
      {
        title: "Cheryl, James, Liz, Jim, Karen, Jen, Dan, and Kim",
        href: require("../photos/cheryl-james-liz-jim-karen-jen-dan-kim.jpg"),
        thumb: require("../photos/thumbs/cheryl-james-liz-jim-karen-jen-dan-kim.jpg")
      },
      {
        title: "Marilyn and Fred Butvinik",
        href: require("../photos/marilyn-fred-4.jpg"),
        thumb: require("../photos/thumbs/marilyn-fred-4.jpg")
      },
      {
        title: "Bonnie",
        href: require("../photos/bonnie.jpg"),
        thumb: require("../photos/thumbs/bonnie.jpg")
      },
      {
        title: "Bonnie",
        href: require("../photos/bonnie-2.jpg"),
        thumb: require("../photos/thumbs/bonnie-2.jpg")
      },
      {
        title: "Cheryl",
        href: require("../photos/cheryl-3.jpg"),
        thumb: require("../photos/thumbs/cheryl-3.jpg")
      },
      {
        title: "Second meeting notes",
        href: require("../photos/06-18-1939.jpg"),
        thumb: require("../photos/thumbs/06-18-1939.jpg")
      },
      {
        title: "Second meeting notes (2)",
        href: require("../photos/06-18-1939-2.jpg"),
        thumb: require("../photos/thumbs/06-18-1939-2.jpg")
      }
    ],
    index: null
  }),
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
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
