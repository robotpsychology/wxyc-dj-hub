<template>
  <div>
    <Toast />

    <DataTable
      :value="requests"
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
      <Column field="request_type" header="Request Type"> </Column>
      <Column field="artist_name" header="Artist"></Column>
      <Column field="release_title" header="Release"></Column>
      <Column field="review" header="Review"></Column>

      <Column :exportable="false" header="Functions" style="min-width: 4rem">
        <template #body="slotProps">
          <Button
            id="editButton"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editRequest(slotProps.data)"
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
      :visible="deleteRequestDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      @update:visible="deleteRequestDialog = false"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="requestToDelete">
          Are you sure you want to delete <b>{{ requestToDelete.id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteRequestDialog = false"
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

import * as directusService from "../../services/directus.service";

export default {
  name: "RequestsTable",
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Toast,
  },
  props: ["requests"],
  data() {
    return {
      table_name: "requests",
      deleteRequestDialog: false,
      requestToDelete: {},
    };
  },
  created() {},
  mounted() {},
  methods: {
    confirmDeleteProduct(request) {
      this.deleteRequestDialog = true;
      this.requestToDelete = request;
    },

    async deleteEntry() {
      this.deleteRequestDialog = false;

      await directusService.deleteItem(
        this.table_name,
        this.requestToDelete.id
      );

      this.$emit("getAllRequests");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Request Deleted",
        life: 3000,
      });

      this.requestToDelete = {};
    },

    editEntry(event) {
      console.log(event.target);
      if (event.target.tagName != "BUTTON") {
        console.log(event);
      }
    },
    editRequest(request) {
      directusService.editItem(this.table_name, request).then((res) => {
        // console.log(res);
        this.$emit("getAllRequests");
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
      await swapItemSortID(payload).then((res) => {
        this.$emit("getAllRequests");
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
.request {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.request {
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
