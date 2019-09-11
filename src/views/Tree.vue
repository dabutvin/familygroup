<template>
  <div>
    <organization-chart :datasource="ds" :pan="true" :zoom="true">
      <template slot-scope="{ nodeData }">
        <div class="title">{{ nodeData.name }}</div>
        <div v-if="nodeData.years" class="content">
          <img v-if="nodeData.img" :src="nodeData.img" />
          <img v-else :src="defaultImg" />
          <span>{{ nodeData.years }}</span>
        </div>
      </template>
    </organization-chart>
  </div>
</template>
</template>

<script>
import Vue from "vue";
import OrganizationChart from "vue-organization-chart";
import "vue-organization-chart/dist/orgchart.css";
import { data } from "../tree";
import defaultImg from "../assets/person.svg";

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      defaultImg: defaultImg,
      ds: data
    };
  }
};
</script>
