<template>
  <div id="flowsheet">
    <FlowsheetForm @createPlaycut="createPlaycut($event)"></FlowsheetForm>
    <FlowsheetTable
      v-if="playcuts.length > 0"
      :playcuts="playcuts"
      @getAllPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetTable>
  </div>
</template>

<script>
import FlowsheetTable from "../components/flowsheet/FlowsheetTable.vue";
import FlowsheetForm from "../components/flowsheet/FlowsheetForm.vue";

import * as directusService from "../services/directus.service";

export default {
  name: "Flowsheet",
  components: {
    FlowsheetTable,
    FlowsheetForm,
  },
  data() {
    return {
      playcuts: [],
      table_name: "flowsheet_entries",
    };
  },
  mounted() {
    this.getAllPlaycuts();
  },
  methods: {
    getAllPlaycuts() {
      directusService.getAllItems(this.table_name).then((response) => {
        // console.log(response);
        this.playcuts = response.data;
      });
    },
    createPlaycut(payload) {
      directusService.createItem(this.table_name, payload).then((response) => {
        console.log(response);
        this.getAllPlaycuts();
      });
    },
  },
};
</script>

<style scoped>
#flowsheet {
}
</style>
