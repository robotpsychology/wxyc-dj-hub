<template>
  <div>
    <Toast />

    <DataTable
      id="flowsheetTable"
      :value="playcuts"
      @row-reorder="onRowReorder"
      responsiveLayout="scroll"
      rowReorderIcon="grab"
    >
      <template #empty> No flowsheet entries found. </template>
      <template #loading :loading="loading">
        Loading flowsheet entry data. Please wait.
      </template>

      <template #header>
        <div class="flex justify-content-center align-items-center">
          <div v-if="!readOnly">
            <h5 class="m-0">Current Flowsheet</h5>
            <div v-if="currentShowInfo">
              <p>Start Time: {{ currentShowInfo.start_time }}</p>
              <p v-if="currentShowInfo.show_name">
                Show Name: {{ currentShowInfo.show_name }}
              </p>
              <p>DJ: {{ currentShowInfo.dj_handle }}</p>
            </div>
          </div>
          <div v-else>
            <h5 class="m-0">Previous Flowsheet</h5>
            <div v-if="previousShowInfo">
              <p>Start Time: {{ previousShowInfo.start_time }}</p>
              <p v-if="previousShowInfo.show_name">
                Show Name: {{ previousShowInfo.show_name }}
              </p>
              <p>DJ: {{ previousShowInfo.dj_handle }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- This column is the drag and reorder bar -->
      <Column
        v-if="!readOnly"
        :rowReorder="true"
        headerStyle="width: 3rem"
        :reorderableColumn="false"
        :expander="true"
      />

      <Column field="rotation" header="Rotation" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <div v-if="slotProps.data.entry_type === 'playcut'">
            <span v-if="slotProps.data.rotation === true">&#10003;</span>
            <span v-else-if="slotProps.data.rotation === false">&#65794;</span>
          </div>
        </template></Column
      >
      <Column field="request" header="Request" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <div v-if="slotProps.data.entry_type === 'playcut'">
            <span v-if="slotProps.data.request === true">&#10003;</span>
            <span v-else-if="slotProps.data.request === false">&#65794;</span>
          </div>
        </template>
      </Column>

      <Column field="artist_name" header="Artist" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <p v-if="slotProps.data.entry_type == 'playcut'">
            {{ slotProps.data.artist_name }}
          </p>
          <p v-else>
            {{ slotProps.data.entry_type }}
          </p>
        </template>
      </Column>
      <Column field="song_title" header="Song" bodyClass="flowsheetRow">
        <template #body="slotProps">
          <p v-if="slotProps.data.entry_type == 'playcut'">
            {{ slotProps.data.song_title }}
          </p>
          <p v-else>
            {{ slotProps.data.date_created }}
          </p>
        </template></Column
      >
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
            v-if="slotProps.data.entry_type == 'playcut'"
            id="infoButton"
            icon="pi pi-info"
            class="p-button-rounded p-button-info mr-2"
            @click="confirmInfoPlaycut(slotProps.data)"
          />
          <Button
            v-if="!readOnly && slotProps.data.entry_type == 'playcut'"
            id="editButton"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="confirmEditPlaycut(slotProps.data)"
          />
          <Button
            v-if="!readOnly"
            id="deleteButton"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeletePlaycut(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Info button dialog -->
    <Dialog
      :visible="infoPlaycutDialog"
      :style="{ width: '450px' }"
      :modal="true"
      header="Artist Information"
      @update:visible="infoPlaycutDialog = false"
    >
      <div class="confirmation-content">
        <!-- <i class="pi pi-info-circle mr-3" style="font-size: 2rem" />  -->
        <h1>{{ infoPlaycut.song_title }} by {{ infoPlaycut.artist_name }}</h1>
        <h2>Album: {{ infoPlaycut.release_title }}</h2>
        <h2>Label: {{ infoPlaycut.label_name }}</h2>
        <p></p>
      </div>
      <template #footer> </template>
    </Dialog>

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
    <form action="" method="patch">
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
            v-model="playcutToEdit.artist_name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.artist_name }"
          />
        </div>
        <div class="field">
          <label for="songTitle">Song</label>
          <InputText
            id="songTitle"
            v-model="playcutToEdit.song_title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.song_title }"
          />
        </div>
        <div class="field">
          <label for="releaseTitle">Release</label>
          <InputText
            id="releaseTitle"
            v-model="playcutToEdit.release_title"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !playcutToEdit.release_title }"
          />
        </div>
        <div class="field">
          <label for="labelName">Label</label>
          <InputText
            id="labelName"
            v-model="playcutToEdit.label_name"
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
              v-model="playcutToEdit.rotation"
              binary
            />
            <label for="rotation">Rotation</label>
          </div>

          <div class="field-radiobutton col-6">
            <Checkbox
              id="request"
              name="request"
              v-model="playcutToEdit.request"
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
            @click="editEntry"
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
    playcut_db_table: { type: String },
    readOnly: { type: Boolean },
    previousShowInfo: { type: Object },
    currentShowInfo: { type: Object },
  },
  computed: {},
  data() {
    return {
      deletePlaycutDialog: false,
      playcutToDelete: {},

      editPlaycutDialog: false,
      playcutToEdit: {},
      editSubmitted: false,

      infoPlaycutDialog: false,
      infoPlaycut: {},
    };
  },
  songInfoService: null,
  created() {
    this.songInfoService = new songInfoService();
    this.table = this.$props.playcut_db_table;
  },
  mounted() {
    this.$emit("getPlaycuts");
  },
  methods: {
    confirmInfoPlaycut(playcut) {
      this.infoPlaycutDialog = true;
      Object.assign(this.infoPlaycut, playcut);

      this.songInfoService.getArtistData(this.infoPlaycut.artist_name);
    },

    confirmEditPlaycut(playcut) {
      this.editPlaycutDialog = true;
      Object.assign(this.playcutToEdit, playcut);
    },

    cancelEdit() {
      this.editPlaycutDialog = false;
      this.editSubmitted = false;
      this.playcutToEdit = {};
    },

    confirmDeletePlaycut(playcut) {
      this.deletePlaycutDialog = true;
      this.playcutToDelete = playcut;
    },

    async deleteEntry() {
      this.deletePlaycutDialog = false;

      await directusService.deleteItem(
        this.$props.playcut_db_table,
        this.playcutToDelete.id
      );

      this.$emit("getPlaycuts");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Playcut Deleted",
        life: 3000,
      });

      this.playcutToDelete = {};
    },

    async editEntry() {
      this.editPlaycutDialog = false;

      const payload = {
        rotation: this.playcutToEdit.rotation,
        request: this.playcutToEdit.request,
        song_title: this.playcutToEdit.song_title,
        label_name: this.playcutToEdit.label_name,
        artist_name: this.playcutToEdit.artist_name,
        release_title: this.playcutToEdit.release_title,
      };

      await directusService.editItem(
        this.$props.playcut_db_table,
        this.playcutToEdit.id,
        payload
      );

      this.playcutToEdit = {};

      this.$emit("getPlaycuts");

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Playcut Edited",
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
      await directusService
        .swapItemSortID(this.table, payload)
        .then((res) => {});
      this.$emit("getPlaycuts");

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
