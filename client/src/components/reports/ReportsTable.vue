<template>
  <div>
    <Toast />
    <!-- <SelectButton
      id="reportType"
      v-model="reportType"
      :options="reportOptions"
    /> -->

    <DataTable
      v-if="reportType == 'Media'"
      :value="missingMedia"
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
      <Column field="genre" header="Genre"></Column>
      <Column field="format" header="Format"></Column>
      <Column field="library_code" header="Library Code"></Column>
      <Column field="artist_name" header="Artist"></Column>
      <Column field="release_title" header="Release"></Column>

      <Column :exportable="false" header="Functions" style="min-width: 4rem">
        <template #body="slotProps">
          <Button
            id="editButton"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editReport(slotProps.data)"
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

    <DataTable
      v-if="reportType == 'Equipment'"
      :value="brokenEquipment"
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
      <Column field="location" header="Location"> </Column>
      <Column field="device_type" header="Device Type"></Column>
      <Column field="brand_name" header="Brand Name"></Column>
      <Column field="model_number" header="Model Number/SKU"></Column>
      <Column field="description" header="Description"></Column>

      <Column :exportable="false" header="Functions" style="min-width: 4rem">
        <template #body="slotProps">
          <Button
            id="editButton"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editReport(slotProps.data)"
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
      :visible="deleteReportDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      @update:visible="deleteReportDialog = false"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="reportToDelete">
          Are you sure you want to delete <b>{{ reportToDelete.id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteReportDialog = false"
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
import * as directusService from "../../services/directus.service";

export default {
  name: "ReportsTable",
  components: {},
  props: {
    reportType: {
      type: String,
    },
    mediaTableName: {
      type: String,
    },
    equipmentTableName: {
      type: String,
    },

    missingMedia: {
      type: Array,
    },
    brokenEquipment: {
      type: Array,
    },
  },
  data() {
    return {
      deleteReportDialog: false,
      reportToDelete: {},
    };
  },
  created() {},
  mounted() {},
  methods: {
    confirmDeleteProduct(report) {
      this.deleteReportDialog = true;
      this.reportToDelete = report;
    },

    async deleteEntry() {
      this.deleteReportDialog = false;

      if (this.reportType == "Media") {
        await directusService.deleteItem(
          this.$props.mediaTableName,
          this.reportToDelete.id
        );
      } else {
        await directusService.deleteItem(
          this.$props.equipmentTableName,
          this.reportToDelete.id
        );
      }

      this.$emit("getAllReports");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Report Deleted",
        life: 3000,
      });

      this.reportToDelete = {};
    },

    editEntry(event) {
      console.log(event.target);
      if (event.target.tagName != "BUTTON") {
        console.log(event);
      }
    },
    editReport(report) {
      directusService
        .editItem(this.$props.mediaTableName, report)
        .then((res) => {
          this.$emit("getAllReports");
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
        this.$emit("getAllReports");
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
.report {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.report {
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
