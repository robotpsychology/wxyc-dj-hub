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

      <!-- <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column> -->
      <Column field="id" header="id"></Column>
      <Column field="rotation" header="Rotation">
        <template #body="slotProps">
          <span v-if="slotProps.data.rotation === true">&#10003;</span>
          <span v-else-if="slotProps.data.rotation === false">&#65794;</span>
        </template></Column
      >
      <Column field="request" header="Request">
        <template #body="slotProps">
          <span v-if="slotProps.data.request === true">&#10003;</span>
          <span v-else-if="slotProps.data.request === false">&#65794;</span>
        </template>
      </Column>
      <Column field="artist_name" header="Artist"></Column>
      <Column field="song_title" header="Song"></Column>
      <Column field="release_title" header="Release"></Column>
      <Column field="label_name" header="Label"></Column>
      ></Column>

      <Column :exportable="false" header="Functions" style="min-width: 4rem">
        <template #body="slotProps">
          <Button
            id="infoButton"
            icon="pi pi-info"
            class="p-button-rounded p-button-info mr-2"
            @click="getEntryInfo(slotProps.data)"
          />
          <Button
            id="editButton"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editEntry(slotProps.data)"
          />
          <Button
            id="deleteButton"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="deleteEntry(slotProps.data)"
          />
        </template>
      </Column>
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

import songInfoService from "../services/songInfo.service";

import {
  deletePlaycut,
  editPlaycut,
  swapSortID,
} from "../services/flowsheet.service";

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
  songInfoService: null,
  created() {
    this.songInfoService = new songInfoService();
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
    this.$emit("getAllPlaycuts");
  },
  methods: {
    getEntryInfo(data) {
      console.log(data);
    },
    editEntry(data) {
      console.log(data);
    },
    deleteEntry(data) {
      console.log(data);
    },

    editEntry(event) {
      console.log(event.target);
      if (event.target.tagName != "BUTTON") {
        console.log(event);
      }
    },
    deletePlaycut(playcutId) {
      deletePlaycut(playcutId).then((response) => {
        // console.log(response);
        this.$emit("getAllPlaycuts");
      });
    },
    editPlaycut(data) {
      editPlaycut(playcut).then((res) => {
        // console.log(res);
        this.$emit("getAllPlaycuts");
      });
    },
    onColReorder() {
      this.$toast.add({
        severity: "success",
        summary: "Column Reordered",
        life: 3000,
      });
    },
    async onRowReorder(event) {
      let currentID, newID, difference;
      currentID = event.value[event.dropIndex].id;

      // if dragging an item from top down
      if (event.dragIndex < event.dropIndex) {
        newID = event.value[event.dropIndex - 1].id;
      }
      // If dragging an item from bottom up
      else if (event.dragIndex > event.dropIndex) {
        newID = event.value[event.dropIndex + 1].id;
      }

      const payload = { currentID: currentID, newID: newID };
      await swapSortID(payload).then((res) => {
        this.$emit("getAllPlaycuts");
      });

      this.$toast.add({
        severity: "success",
        summary: "Rows Reordered",
        life: 3000,
      });
    },
  },
};
</script>

<style>
#flowsheet,
#flowsheetHeader {
  text-align: center;
}

#flowsheetHeader,
.playcut {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.playcut {
  background: #f4f4f4;
  border-radius: 10px;

  /* padding: 1px; */
  /* cursor: pointer; */
  /* color: #444; */
  /* text-align: center; */
}

i.p-datatable-reorderablerow-handle:hover {
  cursor: grab;
}

i.p-datatable-reorderablerow-handle:active {
  cursor: grabbing;
}
</style>
