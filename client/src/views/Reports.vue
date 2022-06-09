<template>
  <div>
    <h2>Use this page to report missing CD/Vinyl or broken equipment</h2>

    <ReportsForm @getAllReports="getAllReports"></ReportsForm>
  </div>
</template>

<script>
import * as directusService from "../services/directus.service";

import ReportsForm from "../components/reports/ReportsForm.vue";

export default {
  name: "Reports",
  components: { ReportsForm },
  data() {
    return {
      media_table_name: "missing_media",
      equipment_table_name: "broken_equipment",

      table_name: "reports",
      reports: [],
      media: [],
      equipment: [],
    };
  },
  mounted() {
    this.getAllReports();
  },
  methods: {
    getAllReports(reportType) {
      if (reportType == "Media") {
        directusService.getAllItems(this.media_table_name).then((response) => {
          this.media = response.data;
        });
      } else {
        directusService
          .getAllItems(this.equipment_table_name)
          .then((response) => {
            this.equipment = response.data;
          });
      }
    },
  },
};
</script>

<style>
</style>
