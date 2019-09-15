<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
    <div class="img-container">
      <img
        class="image"
        loading="lazy"
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
        title: "Someone and someone",
        href: require("../photos/05-14-1939.jpg"),
        thumb: require("../photos/thumbs/05-14-1939.jpg")
      },
      {
        title: "Someone and someone",
        href: require("../photos/05-14-1939-2.jpg"),
        thumb: require("../photos/thumbs/05-14-1939-2.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/a.jpg"),
        thumb: require("../photos/thumbs/a.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/b.jpg"),
        thumb: require("../photos/thumbs/b.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/mother-daddy.jpg"),
        thumb: require("../photos/thumbs/mother-daddy.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/isaac-and-celia.jpg"),
        thumb: require("../photos/thumbs/isaac-and-celia.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/irving-and-mabeatty.jpg"),
        thumb: require("../photos/thumbs/irving-and-mabeatty.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/IMG_20151215_185559.jpg"),
        thumb: require("../photos/thumbs/IMG_20151215_185559.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/image-20161113_122224.jpg"),
        thumb: require("../photos/thumbs/image-20161113_122224.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/b.jpg"),
        thumb: require("../photos/thumbs/b.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/c.jpg"),
        thumb: require("../photos/thumbs/c.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/d.jpg"),
        thumb: require("../photos/thumbs/d.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/e.jpg"),
        thumb: require("../photos/thumbs/e.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/f.jpg"),
        thumb: require("../photos/thumbs/f.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/g.jpg"),
        thumb: require("../photos/thumbs/g.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/h.jpg"),
        thumb: require("../photos/thumbs/h.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/i.jpg"),
        thumb: require("../photos/thumbs/i.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/j.jpg"),
        thumb: require("../photos/thumbs/j.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/k.jpg"),
        thumb: require("../photos/thumbs/k.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/l.jpg"),
        thumb: require("../photos/thumbs/l.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/m.jpg"),
        thumb: require("../photos/thumbs/m.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/n.jpg"),
        thumb: require("../photos/thumbs/n.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/o.jpg"),
        thumb: require("../photos/thumbs/o.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/o.jpg"),
        thumb: require("../photos/thumbs/o.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/p.jpg"),
        thumb: require("../photos/thumbs/p.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/q.jpg"),
        thumb: require("../photos/thumbs/q.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/r.jpg"),
        thumb: require("../photos/thumbs/r.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/s.jpg"),
        thumb: require("../photos/thumbs/s.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/t.jpg"),
        thumb: require("../photos/thumbs/t.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/u.jpg"),
        thumb: require("../photos/thumbs/u.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/v.jpg"),
        thumb: require("../photos/thumbs/v.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/w.jpg"),
        thumb: require("../photos/thumbs/w.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/x.jpg"),
        thumb: require("../photos/thumbs/x.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/y.jpg"),
        thumb: require("../photos/thumbs/y.jpg")
      },
      {
        title: "Someone",
        href: require("../photos/z.jpg"),
        thumb: require("../photos/thumbs/z.jpg")
      }
    ],
    index: null
  })
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
}
</style>
