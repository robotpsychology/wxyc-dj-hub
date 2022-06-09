<template>
  <div id="flowsheet">
    <!-- <AutoComplete
      v-model="selectedArtist"
      :suggestions="filteredArtists"
      @complete="searchArtist($event)"
    ></AutoComplete> -->
    <CreatePlaycut @createPlaycut="createPlaycut($event)"></CreatePlaycut>
    <FlowsheetEntries
      v-if="playcuts.length > 0"
      :playcuts="playcuts"
      @getAllPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapItemSortID="swapItemSortID($event)"
    ></FlowsheetEntries>
  </div>
</template>

<script>
// @ is an alias to /src
import FlowsheetEntries from "../components/flowsheet/FlowsheetEntries.vue";
import CreatePlaycut from "../components/flowsheet/CreatePlaycut.vue";

import * as directusService from "../services/directus.service";

export default {
  name: "Flowsheet",
  components: {
    FlowsheetEntries,
    CreatePlaycut,
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

<style>
#flowsheet {
}

#flowsheet div {
  /* border: 1px solid black; */
}

#flowsheetHeader {
}

#flowsheetBody {
}

#flowsheetBody,
#flowsheetHeader {
  /* Make sure to change margin here so both header and body entries can be aligned */
  margin: 2rem;
}
</style>
