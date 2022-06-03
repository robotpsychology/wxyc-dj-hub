

<template>
  <div>
    <Toast />

    <DataTable
      :value="playcuts"
      :reorderableColumns="true"
      @columnReorder="onColReorder"
      @row-reorder="onRowReorder"
      responsiveLayout="scroll"
    >
      <Column
        :rowReorder="true"
        headerStyle="width: 3rem"
        :reorderableColumn="false"
      />
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>
  </div>
</template>
 


 
<script>
import { VueDraggableNext } from "vue-draggable-next";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toast from "primevue/toast";

import playcutInfoService from "../services/playcutInfoService";

export default {
  name: "FlowsheetEntries",
  components: {
    draggable: VueDraggableNext,
    Dialog,
    Button,
    DataTable,
    Column,
    Toast,
  },
  props: ["playcuts"],
  data() {
    return {
      enabled: true,
      // playcuts: [],
      columns: null,
      dragging: false,
      oldIndex: null,
      newIndex: null,
      displayModal: false,
      playcutInfo: "hello",
      currentPlaycutArtist: null,
    };
  },
  playcutInfoService: null,
  created() {
    this.playcutInfoService = new playcutInfoService();

    this.columns = [
      { field: "id", header: "id" },
      { field: "rotation", header: "Rotation" },
      { field: "request", header: "Request" },
      { field: "artist_name", header: "Artist" },
      { field: "song_title", header: "Song" },
      { field: "release_title", header: "Release" },
      { field: "label_name", header: "Label" },
    ];
  },
  mounted() {
    // this.getAllPlaycuts();
  },
  methods: {
    swapChronOrderID(event) {
      // This sets the oldChronOrderID in a temp variable.
      // Then it grabs the newChronOrderID from the index it's being moved to.
      // The item being affected is asigned the old ID and
      // The dragged item at its new index is assigned the new ID

      if (event.newIndex !== event.oldIndex) {
        // if newIndex is less than the oldIndex, the ID increases
        // if newIndex is greater than the oldIndex, the ID decreases

        let currentID, newID, difference;
        currentID = parseInt(event.clone.dataset.id);
        console.log("original", currentID);

        if (event.newIndex < event.oldIndex) {
          difference = parseInt(event.oldIndex - event.newIndex);
          console.log(difference, "difference");
          newID = currentID + difference;
          console.log(newID, "new");
        } else {
          difference = parseInt(event.oldIndex - event.newIndex);
          console.log(difference, "difference");
          newID = currentID - Math.abs(difference);
          console.log(newID, "new");
        }
        const payload = { currentID: currentID, newID: newID };
        this.$emit("swapChronOrderID", payload);
      }
    },
    // swapChronOrderID(event) {
    //   console.log(event);
    //   let id = parseInt(event.clone.dataset.id);
    //   console.log(id)
    //   console.log(event.from.childNodes)
    //   this.$emit("swapChronOrderID", id);
    // },
    editEntry(event) {
      console.log(event.target);
      if (event.target.tagName != "BUTTON") {
        console.log(event);
      }
    },
    async openModal() {
      this.displayModal = true;
    },
    async getInfo(event) {
      // TODO: Need to clean this up later to dynamically find artist name if class name is artist. This will be done with a data-id attribute or something similar that uses the ID to lookup the artist through the server
      let artistName = event.target.parentElement.childNodes[5].innerText;
      // let artistName = event.target.parentElement.parentElement
      console.log(event.target);

      this.currentPlaycutArtist = artistName;
      this.playcutInfo = await this.playcutInfoService.getArtistData(
        artistName
      );
      console.log(this.playcutInfo);
    },
    // new stuff
    deletePlaycut(playcutId) {
      this.$emit("deletePlaycut", playcutId);
    },
    editPlaycut(data) {
      this.$emit("editPlaycut", data);
    },
    onColReorder() {
      this.$toast.add({
        severity: "success",
        summary: "Column Reordered",
        life: 3000,
      });
    },
    onRowReorder(event) {
      console.log(event);
      console.log(event.value[event.dragIndex].id);
      console.log(event.value[event.dropIndex].id);

      // let currentID, newID, difference;
      // currentID = parseInt(event.clone.dataset.id);
      // console.log("original", currentID);

      // if (event.newIndex < event.oldIndex) {
      //   difference = parseInt(event.oldIndex - event.newIndex);
      //   console.log(difference, "difference");
      //   newID = currentID + difference;
      //   console.log(newID, "new");
      // } else {
      //   difference = parseInt(event.oldIndex - event.newIndex);
      //   console.log(difference, "difference");
      //   newID = currentID - Math.abs(difference);
      //   console.log(newID, "new");
      // }
      // const payload = { currentID: currentID, newID: newID };
      // this.$emit("swapChronOrderID", payload);
      // this.swapChronOrderID(event);

      this.playcuts = event.value;
      // this.$toast.add({
      //   severity: "success",
      //   summary: "Rows Reordered",
      //   life: 3000,
      // });
    },
  },
};
</script>

<style>
#flowsheet,
#flowsheetHeader {
  text-align: center;
}

.playcut {
  background: #f4f4f4;
  border-radius: 10px;

  /* padding: 1px; */
  cursor: pointer;
  color: #444;
  text-align: center;
}

info-button {
}
</style>
