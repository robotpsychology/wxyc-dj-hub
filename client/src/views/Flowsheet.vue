<template>
  <div id="flowsheet">
    <FlowsheetShowForm
      id="showForm"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo === null"
      @createShow="createShow($event)"
    ></FlowsheetShowForm>

    <FlowsheetActiveShow
      id="activeShow"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo === null"
    ></FlowsheetActiveShow>

    <FlowsheetActionButtons
      id="actionButtons"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo"
      :playcut_db_table="playcut_db_table"
      @createPlaycut="createPlaycut($event)"
    ></FlowsheetActionButtons>

    <br />

    <FlowsheetPlaycutForm
      id="playcutForm"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo"
      @createPlaycut="createPlaycut($event)"
    ></FlowsheetPlaycutForm>

    <br />

    <FlowsheetTable
      id="currentShow"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo"
      :currentShowInfo="currentShowInfo"
      :readOnly="false"
      :playcuts="currentPlaycuts"
      :playcut_db_table="playcut_db_table"
      @getPlaycuts="getCurrentPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>

    <br />

    <FlowsheetTable
      id="previousShow"
      v-if="flowsheetStore && flowsheetStore.currentShowInfo"
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
import FlowsheetPlaycutForm from "../components/flowsheet/FlowsheetPlaycutForm.vue";
import FlowsheetShowForm from "../components/flowsheet/FlowsheetShowForm.vue";

import * as directusService from "../services/directus.service";
import { useFlowsheetStore } from "@/store/flowsheet.store.js";
import FlowsheetActionButtons from "../components/flowsheet/FlowsheetActionButtons.vue";
import FlowsheetActiveShow from "../components/flowsheet/FlowsheetActiveShow.vue";

export default {
  name: "Flowsheet",
  components: {
    FlowsheetTable,
    FlowsheetPlaycutForm,
    FlowsheetShowForm,
    FlowsheetActionButtons,
    FlowsheetActiveShow,
  },
  data() {
    return {
      currentPlaycuts: [],
      previousShowPlaycuts: [],
      currentShowInfo: null,
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
          this.flowsheetStore.currentShowInfo.id
        )
        .then((response) => {
          this.currentPlaycuts = response.data;
        });
    },
    async getPreviousShowPlaycuts() {
      let previousSessionID = await directusService
        .getPreviousShow(this.session_db_table)
        .then((response) => {
          this.flowsheetStore.$state.previousShowInfo = response;
          this.previousShowInfo = this.flowsheetStore.$state.previousShowInfo;
        });

      await directusService
        .getPlaycutsByID(
          this.playcut_db_table,
          this.flowsheetStore.previousShowInfo.id
        )
        .then((response) => (this.previousShowPlaycuts = response.data));
    },
    async createPlaycut(payload) {
      payload.flowsheet_session_fr =
        this.flowsheetStore.$state.currentShowInfo.id;
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
          console.log(response);
          this.flowsheetStore.$state.currentShowInfo = response;
          this.currentShowInfo = this.flowsheetStore.$state.currentShowInfo;

          return response;
        });

      const piniaPayload = {
        flowsheet_session_id: flowsheetShowCreate.id,
      };

      // this.flowsheetStore.createShow(piniaPayload);

      this.flowsheet_session = true;
    },
  },
};
</script>

<style lang="scss">
#flowsheet {
  margin: 2em 0 3em 0;
}
</style>
