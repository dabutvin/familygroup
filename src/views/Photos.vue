<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div
      class="image"
      v-for="(image, imageIndex) in images"
      :key="imageIndex"
      @click="index = imageIndex"
      :style="{ backgroundImage: 'url(' + image.href + ')', width: '300px', height: '200px' }"
    ></div>
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
        title: "Someone and someone",
        href: require("../photos/pages/05-14-1939.jpg")
      },
      {
        title: "Someone and someone",
        href: require("../photos/pages/05-14-1939-2.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/a.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/b.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/mother-daddy.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/isaac-and-celia.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/irving-and-mabeatty.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/IMG_20151215_185559.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/image-20161113_122224.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/b.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/c.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/d.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/e.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/f.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/g.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/h.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/i.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/j.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/k.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/l.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/m.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/n.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/o.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/o.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/p.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/q.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/r.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/s.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/t.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/u.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/v.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/w.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/x.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/y.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/z.jpg")
      }
    ],
    index: null
  })
};
</script>
