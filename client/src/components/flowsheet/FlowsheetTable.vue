<template>
  <div>
    <Toast />

    <DataTable
      id="flowsheetTable"
      v-if="playcuts.length > 0"
      :value="playcuts"
      @row-reorder="onRowReorder"
      responsiveLayout="scroll"
      rowReorderIcon="grab"
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
      <Column field="id" header="id" bodyClass="flowsheetRow"></Column>
      <Column field="rotation" header="Rotation" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <span v-if="slotProps.data.rotation === true">&#10003;</span>
          <span v-else-if="slotProps.data.rotation === false">&#65794;</span>
        </template></Column
      >
      <Column field="request" header="Request" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <span v-if="slotProps.data.request === true">&#10003;</span>
          <span v-else-if="slotProps.data.request === false">&#65794;</span>
        </template>
      </Column>

      <Column
        field="artist_name"
        header="Artist"
        bodyClass="flowsheetRow"
      ></Column>
      <Column
        field="song_title"
        header="Song"
        bodyClass="flowsheetRow"
      ></Column>
      <Column
        field="release_title"
        header="Release"
        bodyClass="flowsheetRow"
      ></Column>
      <Column
        field="label_name"
        header="Label"
        bodyClass="flowsheetRow"
      ></Column>

      <Column
        :exportable="false"
        header="Functions"
        style="min-width: 4rem"
        bodyClass="flowsheetRow"
      >
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
            @click="confirmEditProduct(slotProps.data)"
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

    <!-- Edit Button dialog -->
    <form action="" @submit.prevent="editEntry" method="patch">
      <Dialog
        :visible="editPlaycutDialog"
        :style="{ width: '450px' }"
        header="Playcut Details"
        :modal="true"
        class="p-fluid"
        @update:visible="editPlaycutDialog = false"
      >
        <div class="field">
          <label for="artistName">Artist</label>
          <InputText
            id="artistName"
            :value="playcutToEdit.artist_name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.artist_name }"
          />
        </div>
        <div class="field">
          <label for="songTitle">Song</label>
          <InputText
            id="songTitle"
            :value="playcutToEdit.song_title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.song_title }"
          />
        </div>
        <div class="field">
          <label for="releaseTitle">Release</label>
          <InputText
            id="releaseTitle"
            :value="playcutToEdit.release_title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.release_title }"
          />
        </div>
        <div class="field">
          <label for="labelName">Label</label>
          <InputText
            id="labelName"
            :value="playcutToEdit.label_name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.label_name }"
          />
        </div>

        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <Checkbox
              id="rotation"
              name="rotation"
              v-model="editRotationBool"
              binary
            />
            <label for="rotation">Rotation</label>
          </div>

          <div class="field-radiobutton col-6">
            <Checkbox
              id="request"
              name="request"
              v-model="editRequestBool"
              binary
            />
            <label for="request">Request</label>
          </div>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="cancelEdit"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            type="submit"
            value="submit"
            class="p-button-text"
            @submit="editEntry"
          />
        </template>
      </Dialog>
    </form>
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
  name: "FlowsheetTable",
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
    Toast,
  },
  props: {
    playcuts: { type: Array },
    tableName: { type: String },
  },
  computed: {},
  data() {
    return {
      // playcuts: [], // Not sure why this prop is being passed but not $props.tableName. Because of getAllItems?

      deletePlaycutDialog: false,
      playcutToDelete: {},

      editPlaycutDialog: false,
      playcutToEdit: {},

      editRotationBool: null,
      editRequestBool: null,

      editSubmitted: false,
    };
  },
  songInfoService: null,
  created() {
    this.songInfoService = new songInfoService();
    this.table = this.$props.tableName;
  },
  mounted() {
    this.$emit("getAllPlaycuts");
  },
  methods: {
    getEntryInfo(data) {
      console.log(data);
    },

    confirmEditProduct(playcut) {
      this.editPlaycutDialog = true;
      // this.playcutToEdit = playcut;
      Object.assign(this.playcutToEdit, playcut);

      this.editRotationBool = this.playcutToEdit.rotation;
      this.editRequestBool = this.playcutToEdit.request;
    },

    cancelEdit() {
      this.editPlaycutDialog = false;
      this.editSubmitted = false;
    },

    confirmDeleteProduct(playcut) {
      this.deletePlaycutDialog = true;
      this.playcutToDelete = playcut;
    },

    async deleteEntry() {
      this.deletePlaycutDialog = false;

      await directusService.deleteItem(
        this.$props.tableName,
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

    async editEntry() {
      const payload = {
        rotation: this.rotationSelected,
        request: this.requestSelected,
        song_title: this.songSelected,
        label_name: this.labelSelected,
        artist_name: this.artistSelected,
        release_title: this.releaseSelected,
        entry_type: "playcut",
      };

      await directusService.editItem(
        this.$props.tableName,
        this.playcutToEdit.id,
        this.playcutToEdit
      );

      this.$emit("getAllPlaycuts");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Playcut Edited",
        life: 3000,
      });

      this.playcutToEdit = {};
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
      await directusService.swapItemSortID(this.table, payload).then((res) => {
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

<style lang="scss" scoped>
@import "../../styles/variables.scss";
#flowsheet,
#flowsheetHeader {
  text-align: center;
}

.p-datatable .p-datatable-tbody > tr {
}

// This is how you select child elements in lang="scss" and scoped modes. Scoped should be left on.
// #flowsheetTable :deep(.flowsheetRow)

#flowsheetTable :deep(tr) {
}

#flowsheetTable :deep(.flowsheetRow) {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}
</style>
