<template>
  <div class="home">
    <!-- <AutoComplete
      v-model="selectedArtist"
      :suggestions="filteredArtists"
      @complete="searchArtist($event)"
    ></AutoComplete> -->
    <CreatePlaycut @createPlaycut="playcutCreate($event)"></CreatePlaycut>
    <FlowsheetEntries
      v-if="playcuts.length > 0"
      :playcuts="playcuts"
      @deletePlaycut="playcutDelete($event)"
      @editPlaycut="playcutEdit($event)"
      @swapChronOrderID="swapChronOrderID($event)"
    ></FlowsheetEntries>
  </div>
</template>

<script>
// @ is an alias to /src
import FlowsheetEntries from "../components/FlowsheetEntries.vue";
import CreatePlaycut from "../components/CreatePlaycut.vue";

import {
  getAllPlaycuts,
  createPlaycut,
  deletePlaycut,
  editPlaycut,
  swapChronOrderID,
} from "../services/PlaycutService";

export default {
  name: "Home",
  components: {
    FlowsheetEntries,
    CreatePlaycut,
  },
  data() {
    return {
      playcuts: [],
    };
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
    playcutDelete(playcutId) {
      deletePlaycut(playcutId).then((response) => {
        // console.log(response);
        this.getAllPlaycuts();
      });
    },
    playcutEdit(playcut) {
      editPlaycut(playcut).then((res) => {
        // console.log(res);
        this.getAllPlaycuts();
      });
    },
    playcutEditMultiple(playcutArr) {
      for (let i = 0; i < playcutArr.length; i++) {
        let playcut = playcutArr[i];
        console.log(playcut);
        editPlaycut(playcut).then((res) => {
          console.log(res, "hi");
        });
      }
      this.getAllPlaycuts();
    },
    swapChronOrderID(data) {
      console.log(data);
      swapChronOrderID(data).then((res) => {
        this.getAllPlaycuts();
      });
    },
  },
  mounted() {
    this.getAllPlaycuts();
  },
};
</script>

<style>
#flowsheet {
  word-break: break-word !important;
}

.column {
  word-break: break-word !important;
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
