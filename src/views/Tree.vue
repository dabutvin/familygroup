<template>
  <div>
    <org-chart :datasource="ds" :pan="true">
      <template #default="{ nodeData }">
        <div class="title" :title="nodeData.years">{{ nodeData.name }}</div>
      </template>
    </org-chart>
  </div>
</template>

<script>
import OrgChart from "../components/OrgChart.vue";
import { data } from "../tree";

export default {
  components: {
    OrgChart,
  },
  data() {
    return {
      ds: data,
    };
  },
};
</script>

<style>
.orgchart-container {
  border: none;
  height: 99vh;
  width: 100%;
}
.org-node .title {
  padding: 0 5px;
}

@media (max-width: 600px) {
  .orgchart-container {
    height: calc(100vh - 48px);
  }
}
</style>
