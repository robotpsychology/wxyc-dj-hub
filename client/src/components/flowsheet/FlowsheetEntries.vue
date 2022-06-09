<template>
  <div>
    <Toast />

    <DataTable
      v-if="playcuts.length > 0"
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
            @click="editPlaycut(slotProps.data)"
          />
          <Button
            id="deleteButton"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Delete button dialog -->
    <Dialog
      :visible="deletePlaycutDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      @update:visible="deletePlaycutDialog = false"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="playcutToDelete">
          Are you sure you want to delete <b>{{ playcutToDelete.id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deletePlaycutDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteEntry"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>
 

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toast from "primevue/toast";

import songInfoService from "../../services/songInfo.service";

import * as directusService from "../../services/directus.service";

export default {
  name: "FlowsheetEntries",
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Toast,
  },
  props: ["playcuts", "table_name"],
  computed: {},
  data() {
    return {
      // playcuts: [], // Not sure why this prop is being passed but not table_name. Because of getAllItems?
      table_name: "flowsheet_entries",
      deletePlaycutDialog: false,
      playcutToDelete: {},
    };
  },
  songInfoService: null,
  created() {
    this.songInfoService = new songInfoService();
    this.table = this.table_name;
  },
  mounted() {
    this.$emit("getAllPlaycuts");
  },
  methods: {
    getEntryInfo(data) {
      console.log(data);
    },

    confirmDeleteProduct(playcut) {
      this.deletePlaycutDialog = true;
      this.playcutToDelete = playcut;
    },

    async deleteEntry() {
      this.deletePlaycutDialog = false;

      await directusService.deleteItem(
        this.table_name,
        this.playcutToDelete.id
      );

      this.$emit("getAllPlaycuts");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Playcut Deleted",
        life: 3000,
      });

      this.playcutToDelete = {};
    },

    editEntry(event) {
      console.log(event.target);
      if (event.target.tagName != "BUTTON") {
        console.log(event);
      }
    },
    editPlaycut(playcut) {
      directusService.editItem(playcut).then((res) => {
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
      await directusService.swapItemSortID(payload).then((res) => {
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
