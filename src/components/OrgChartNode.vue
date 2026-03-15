<template>
  <div class="org-node-wrapper">
    <div class="org-node">
      <slot :nodeData="node">
        <div class="title">{{ node.name }}</div>
      </slot>
    </div>
    <div v-if="node.children && node.children.length" class="org-children">
      <org-chart-node
        v-for="(child, i) in node.children"
        :key="i"
        :node="child"
      >
        <template #default="{ nodeData }">
          <slot :nodeData="nodeData" />
        </template>
      </org-chart-node>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgChartNode",
  props: {
    node: { type: Object, required: true },
  },
};
</script>

<style>
.org-node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.org-node {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 4px 8px;
  background: #fff;
  display: inline-block;
  white-space: nowrap;
  font-size: 13px;
  position: relative;
  margin: 0 4px;
}

.org-children {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  position: relative;
}

/* vertical line from parent down */
.org-children::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 20px;
  background: #aaa;
}

/* horizontal line spanning children */
.org-children > .org-node-wrapper {
  position: relative;
  padding-top: 20px;
}

.org-children > .org-node-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #aaa;
}

/* vertical line from horizontal bar to each child */
.org-children > .org-node-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 20px;
  background: #aaa;
}

/* first child: clip left half of horizontal line */
.org-children > .org-node-wrapper:first-child::before {
  left: 50%;
}

/* last child: clip right half of horizontal line */
.org-children > .org-node-wrapper:last-child::before {
  right: 50%;
}

/* only child: no horizontal line needed */
.org-children > .org-node-wrapper:only-child::before {
  display: none;
}
</style>
