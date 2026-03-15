<template>
  <div
    class="orgchart-container"
    ref="container"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <div class="orgchart" :style="chartStyle">
      <org-chart-node :node="datasource">
        <template #default="{ nodeData }">
          <slot :nodeData="nodeData" />
        </template>
      </org-chart-node>
    </div>
  </div>
</template>

<script>
import OrgChartNode from "./OrgChartNode.vue";

export default {
  components: { OrgChartNode },
  props: {
    datasource: { type: Object, required: true },
    pan: { type: Boolean, default: false },
  },
  data() {
    return {
      dragging: false,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
    };
  },
  computed: {
    chartStyle() {
      return this.pan ? { cursor: "grab" } : {};
    },
  },
  mounted() {
    const el = this.$refs.container;
    if (el) {
      el.scrollLeft = (el.scrollWidth - el.offsetWidth) / 2;
    }
  },
  methods: {
    onMouseDown(e) {
      if (!this.pan) return;
      this.dragging = true;
      const el = this.$refs.container;
      this.startX = e.pageX - el.offsetLeft;
      this.startY = e.pageY - el.offsetTop;
      this.scrollLeft = el.scrollLeft;
      this.scrollTop = el.scrollTop;
      el.style.cursor = "grabbing";
    },
    onMouseMove(e) {
      if (!this.dragging) return;
      e.preventDefault();
      const el = this.$refs.container;
      const x = e.pageX - el.offsetLeft;
      const y = e.pageY - el.offsetTop;
      el.scrollLeft = this.scrollLeft - (x - this.startX);
      el.scrollTop = this.scrollTop - (y - this.startY);
    },
    onMouseUp() {
      if (!this.dragging) return;
      this.dragging = false;
      if (this.$refs.container) {
        this.$refs.container.style.cursor = "grab";
      }
    },
  },
};
</script>

<style>
.orgchart-container {
  overflow: auto;
  text-align: center;
  user-select: none;
}
.orgchart {
  display: inline-block;
  padding: 20px;
}
</style>
