<template>
  <div id="flowsheet">
    <FlowsheetShowForm @createShow="createShow($event)"></FlowsheetShowForm>

    <FlowsheetForm @createPlaycut="createPlaycut($event)"></FlowsheetForm>

    <!-- 
      v-if="playcuts.length > 0"

 -->
    <FlowsheetTable
      v-if="playcuts.length > 0 && flowsheet_session == true"
      :playcuts="playcuts"
      :playcut_db_table="playcut_db_table"
      @getAllPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>
  </div>
</template>

<script>
import FlowsheetTable from "../components/flowsheet/FlowsheetTable.vue";
import FlowsheetForm from "../components/flowsheet/FlowsheetForm.vue";
import FlowsheetShowForm from "../components/flowsheet/FlowsheetShowForm.vue";

import * as directusService from "../services/directus.service";

export default {
  name: "Flowsheet",
  components: {
    FlowsheetTable,
    FlowsheetForm,
    FlowsheetShowForm,
  },
  data() {
    return {
      playcuts: [],
      playcut_db_table: "flowsheet_entries",
      session_db_table: "flowsheet_session",
      flowsheet_session: null,
    };
  },
  mounted() {
    this.getAllPlaycuts();
  },
  methods: {
    async getAllPlaycuts() {
      await directusService
        .getAllItems(this.playcut_db_table)
        .then((response) => {
          this.playcuts = response.data;
        });
    },
    async createPlaycut(payload) {
      await directusService
        .createItem(this.playcut_db_table, payload)
        .then((response) => {
          console.log(response);
          this.getAllPlaycuts();
        });
    },
    async createShow(payload) {
      await directusService
        .createItem(this.session_db_table, payload)
        .then((response) => {
          console.log(response);
        });

      this.flowsheet_session = true;
    },
  },
};
</script>

<style lang="scss">
#flowsheet {
}
</style>
