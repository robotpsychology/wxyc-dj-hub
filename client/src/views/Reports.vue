<template>
  <div>
    <h2>Use this page to report missing CD/Vinyl or broken equipment</h2>

    <SelectButton
      id="reportType"
      v-model="reportType"
      :options="reportOptions"
      @change="reportType = reportType"
    />

    <ReportsForm
      @getAllReports="getAllReports"
      :reportType="reportType"
      :mediaTableName="mediaTableName"
      :equipmentTableName="equipmentTableName"
    ></ReportsForm>

    <br />

    <ReportsTable
      :missingMedia="missingMedia"
      :brokenEquipment="brokenEquipment"
      :mediaTableName="mediaTableName"
      :equipmentTableName="equipmentTableName"
      @getAllReports="getAllReports"
      :reportType="reportType"
    ></ReportsTable>
  </div>
</template>

<script>
import * as directusService from "@/services/directus.service";

import { ReportsForm, ReportsTable } from "@/components";

export default {
  name: "Reports",
  components: { ReportsForm, ReportsTable },
  data() {
    return {
      mediaTableName: "missing_media",
      equipmentTableName: "broken_equipment",

      missingMedia: [],
      brokenEquipment: [],

      reportType: "Media",
      reportOptions: ["Media", "Equipment"],
    };
  },
  mounted() {
    this.getAllReports();
  },
  methods: {
    getAllReports() {
      directusService.getAllItems(this.mediaTableName).then((response) => {
        this.missingMedia = response.data;
      });
      directusService.getAllItems(this.equipmentTableName).then((response) => {
        this.brokenEquipment = response.data;
      });
    },
  },
};
</script>

<style>
</style>
