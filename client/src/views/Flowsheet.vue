<template>
  <div id="flowsheet">
    <FlowsheetShowForm @createShow="createShow($event)"></FlowsheetShowForm>

    <FlowsheetForm
      v-if="flowsheet_session_id"
      @createPlaycut="createPlaycut($event)"
    ></FlowsheetForm>

    <FlowsheetTable
      v-if="playcuts.length > 0 && flowsheet_session == true"
      :playcuts="playcuts"
      :playcut_db_table="playcut_db_table"
      @getPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>

    <FlowsheetTable
      v-if="previousShowPlaycuts.length > 0"
      :playcuts="previousShowPlaycuts"
      :playcut_db_table="playcut_db_table"
      @getPlaycuts="getPreviousShowPlaycuts"
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
import { useFlowsheetStore } from "@/store/flowsheet.store.js";

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
      previousShowPlaycuts: [],
      playcut_db_table: "flowsheet_entries",
      session_db_table: "flowsheet_session",
      flowsheet_session_id: null,
      flowsheetStore: null,
    };
  },
  mounted() {
    this.flowsheetStore = useFlowsheetStore();

    this.getLastShowPlaycuts();
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
    async getLastShowPlaycuts() {
      let previousSessionID = await directusService
        .getLastItem(this.session_db_table)
        .then((response) => {
          // this.playcuts = response.data;
          // console.log("yup", response.data[0].id);
          return response.data[0].id;
        });

      await directusService
        .getPlaycutsByID(this.playcut_db_table, previousSessionID)
        .then((response) => console.log("hiiii", response));
    },
    async createPlaycut(payload) {
      payload.flowsheet_session_fr = this.flowsheetStore.flowsheet_session_id;
      await directusService
        .createItem(this.playcut_db_table, payload)
        .then((response) => {
          // console.log(response);
          this.getAllPlaycuts();
        });
    },
    async createShow(payload) {
      let flowsheetShowCreate = await directusService
        .createItem(this.session_db_table, payload)
        .then((response) => {
          // console.log(response);
          return response;
        });

      const piniaPayload = {
        flowsheet_session_id: flowsheetShowCreate.id,
      };

      this.flowsheetStore.createShow(piniaPayload);
      this.flowsheet_session_id = this.flowsheetStore.flowsheet_session_id;

      this.flowsheet_session = true;
    },
  },
};
</script>

<style lang="scss">
#flowsheet {
}
</style>
