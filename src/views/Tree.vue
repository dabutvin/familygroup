<template>
  <div>
    <organization-chart :datasource="ds">
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

import defaultImg from "../assets/person.svg";

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      defaultImg: defaultImg,
      ds: {
        id: "1",
        name: "Family Tree",
        children: [
          { id: "2", name: "Bo Miao", years: "department manager" },
          {
            id: "3",
            name: "Su Miao",
            years: "department manager",
            children: [
              { id: "4", name: "Tie Hua", years: "senior engineer" },
              {
                id: "5",
                name: "Hei Hei",
                years: "senior engineer",
                children: [
                  { id: "6", name: "Pang Pang", years: "engineer" },
                  { id: "7", name: "Xiang Xiang", years: "UE engineer" }
                ]
              }
            ]
          },
          { id: "8", name: "Hong Miao", years: "department manager" },
          { id: "9", name: "Chun Miao", years: "department manager" }
        ]
      }
    };
  }
};
</script>
