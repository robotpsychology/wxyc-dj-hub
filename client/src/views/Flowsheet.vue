<template>
  <div id="flowsheet">
    <!-- <AutoComplete
      v-model="selectedArtist"
      :suggestions="filteredArtists"
      @complete="searchArtist($event)"
    ></AutoComplete> -->
    <CreatePlaycut @createPlaycut="playcutCreate($event)"></CreatePlaycut>
    <FlowsheetEntries
      v-if="playcuts.length > 0"
      :playcuts="playcuts"
      @getAllPlaycuts="getAllPlaycuts"
      @editPlaycut="playcutEdit($event)"
      @swapSortID="swapSortID($event)"
    ></FlowsheetEntries>
  </div>
</template>

<script>
// @ is an alias to /src
import FlowsheetEntries from "../components/flowsheet/FlowsheetEntries.vue";
import CreatePlaycut from "../components/flowsheet/CreatePlaycut.vue";

import {
  getAllPlaycuts,
  createPlaycut,
  deletePlaycut,
  editPlaycut,
  swapSortID,
} from "../services/flowsheet.service";

export default {
  name: "Flowsheet",
  components: {
    FlowsheetEntries,
    CreatePlaycut,
  },
  data() {
    return {
      playcuts: [],
    };
  },
  mounted() {
    this.getAllPlaycuts();
  },
  methods: {
    getAllPlaycuts() {
      getAllPlaycuts().then((response) => {
        // console.log(response);
        this.playcuts = response;
      });
    },
    playcutCreate(data) {
      // console.log("data:::", data);
      createPlaycut(data).then((response) => {
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
