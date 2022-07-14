<template>
  <div id="flowsheet">
    <FlowsheetShowForm></FlowsheetShowForm>
    <FlowsheetForm @createPlaycut="createPlaycut($event)"></FlowsheetForm>
    <FlowsheetTable
      v-if="playcuts.length > 0"
      :playcuts="playcuts"
      :tableName="tableName"
      @getAllPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>
  </div>
</template>

<script>
import { FlowsheetForm, FlowsheetShowForm, FlowsheetTable } from "@/components";
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
      tableName: "flowsheet_entries",
    };
  },
  mounted() {
    this.getAllPlaycuts();
  },
  methods: {
    getAllPlaycuts() {
      directusService.getAllItems(this.tableName).then((response) => {
        // console.log(response);
        this.playcuts = response.data;
      });
    },
    createPlaycut(payload) {
      directusService.createItem(this.tableName, payload).then((response) => {
        console.log(response);
        this.getAllPlaycuts();
      });
    },
  },
};
</script>

<style lang="scss">
#flowsheet {
}
</style>
