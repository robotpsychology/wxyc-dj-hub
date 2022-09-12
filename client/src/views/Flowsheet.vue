<template>
  <div id="flowsheet">
    <FlowsheetShowForm
      v-if="flowsheetStore && flowsheetStore.flowsheet_session_id === null"
      @createShow="createShow($event)"
    ></FlowsheetShowForm>

    <FlowsheetForm
      v-if="flowsheetStore && flowsheetStore.flowsheet_session_id"
      @createPlaycut="createPlaycut($event)"
    ></FlowsheetForm>

    <FlowsheetTable
      v-if="currentPlaycuts.length > 0 && flowsheetStore.flowsheet_session_id"
      :readOnly="false"
      :playcuts="currentPlaycuts"
      :playcut_db_table="playcut_db_table"
      @getPlaycuts="getCurrentPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>

    <div>---------temp separator---------</div>

    <FlowsheetTable
      :readOnly="true"
      :previousShowInfo="previousShowInfo"
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
      currentPlaycuts: [],
      previousShowPlaycuts: [],
      previousShowInfo: null,
      playcut_db_table: "flowsheet_entries",
      session_db_table: "flowsheet_session",
      flowsheet_session_id: null,
      flowsheetStore: null,
    };
  },
  mounted() {
    this.flowsheetStore = useFlowsheetStore();

    this.getPreviousShowPlaycuts();
  },
  methods: {
    // async getAllPlaycuts() {
    //   await directusService
    //     .getAllItems(this.playcut_db_table)
    //     .then((response) => {
    //       this.playcuts = response.data;
    //     });
    // },
    async getCurrentPlaycuts() {
      await directusService
        .getPlaycutsByID(
          this.playcut_db_table,
          this.flowsheetStore.flowsheet_session_id
        )
        .then((response) => {
          this.currentPlaycuts = response.data;
        });
    },
    async getPreviousShowPlaycuts() {
      let previousSessionID = await directusService
        .getMostRecentItem(this.session_db_table)
        .then((response) => {
          this.flowsheetStore.$state.previousShowInfo = response.data[0];
        });

      this.previousShowInfo = this.flowsheetStore.$state.previousShowInfo;

      await directusService
        .getPlaycutsByID(
          this.playcut_db_table,
          this.flowsheetStore.previousShowInfo.id
        )
        .then((response) => (this.previousShowPlaycuts = response.data));
    },
    async createPlaycut(payload) {
      payload.flowsheet_session_fr = this.flowsheetStore.flowsheet_session_id;
      await directusService
        .createItem(this.playcut_db_table, payload)
        .then((response) => {
          this.getCurrentPlaycuts();
        });
    },
    async createShow(payload) {
      await this.getPreviousShowPlaycuts();

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
