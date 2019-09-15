<template>
  <div>
    <organization-chart :datasource="ds" :pan="true" :zoom="false">
      <template slot-scope="{ nodeData }">
        <div class="title" :title="nodeData.years">{{ nodeData.name }}</div>
      </template>
    </organization-chart>
  </div>
</template>

<script>
import OrganizationChart from "vue-organization-chart";
import "vue-organization-chart/dist/orgchart.css";
import { data } from "../tree";
import defaultImg from "../assets/person.svg";

export default {
  components: {
    OrganizationChart
  },
  mounted() {
    var container = document.querySelector(".orgchart-container");
    //container.scrollLeft = container.offsetWidth / 8;
    //container.offsetWidth
    //container.scrollLeft = window.innerWidth - container.offsetWidth / 2;
    container.scrollLeft = (container.scrollWidth - container.offsetWidth) / 2;
  },
  data() {
    return {
      defaultImg: defaultImg,
      ds: data
    };
  }
};
</script>

<style lang="less">
.orgchart-container {
  border: none;
  height: 99vh;
  width: 100%;

  .orgchart {
    //border: none;

    .nodes {
      .node {
        width: 80px;

        .title {
          padding: 0 5px;
        }
      }

      .lines {
        .downLine {
          //height: 15px;
        }
      }
    }
  }
}
</style>
