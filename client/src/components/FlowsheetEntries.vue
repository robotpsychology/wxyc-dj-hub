<template>
  <div id="flowsheet" role="table">
    <div class="columns is-mobile" id="flowsheetHeader" role="rowgroup">
      <div class="column is-1" role="columnheader">Info</div>
      <div class="column is-1" role="columnheader">ID</div>
      <div class="column is-2" role="columnheader">Rotation</div>
      <div class="column is-2" role="columnheader">Request</div>
      <div class="column" role="columnheader">Song</div>
      <div class="column" role="columnheader">Artist</div>
      <div class="column" role="columnheader">Release</div>
      <div class="column" role="columnheader">Label</div>
    </div>

    <div v-if="!playcuts.length" class="m-5">
      <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
    <draggable
      id="flowsheetBody"
      role="rowgroup"
      v-model="playcuts"
      ghost-class="ghost"
      @change=""
      @end="swapChronOrderID"
    >
      <transition-group type="transition" name="flip-list">
        <div
          class="playcut column is-mobile mt-2 mb-2"
          role="row"
          v-for="playcut in playcuts"
          :data-id="playcut.id"
          :key="playcut.chronOrderID"
          @dblclick="editEntry"
        >
          <!-- If playcut -->
          <div
            v-if="playcut.entry_type === 'playcut'"
            class="playcut columns is-mobile"
          >
            <Button
              label="Info"
              class="info-button"
              icon="pi pi-external-link"
              @click="[openModal(), getInfo($event)]"
            />
            <i class="fa fa-align-justify handle"></i>

            <div class="column is-1" role="cell">
              {{ playcut.id }}
            </div>
            <div class="rotation column is-2" role="cell">
              <!-- {{ playcut.playcut.rotation }} -->
              <p v-if="playcut.rotation == 'true'">✓</p>
              <p v-else>𐄂</p>
            </div>
            <div class="request column is-2" role="cell">
              <!-- {{ playcut.playcut.request }} -->
              <p v-if="playcut.request == 'true'">✓</p>
              <p v-else>𐄂</p>
            </div>
            <div class="song column" role="cell">
              {{ playcut.song_title }}
            </div>
            <div class="artist column" role="cell">
              {{ playcut.artist_name }}
            </div>
            <div class="release column" role="cell">
              {{ playcut.release_title }}
            </div>
            <div class="label column" role="cell">
              {{ playcut.label_name }}
            </div>

            <!-- should be EditModal with button inside that file -->
            <Button
              label="Edit"
              class=""
              icon="pi"
              @click="editPlaycut($event)"
            />

            <Button
              label="Delete"
              class=""
              icon="pi"
              @click="deletePlaycut(playcut._id)"
            />
          </div>

          <!-- If talkset -->
          <div
            v-if="playcut.entryType === 'talkset'"
            class="playcut column is-mobile has-text-centered"
          >
            <div class="talkset" role="cell">TALKSET</div>
          </div>

          <!-- If breapoint -->
          <div
            v-if="playcut.entryType === 'breakpoint'"
            class="playcut column is-mobile"
          >
            <div class="breakpoint" role="cell">
              BREAKPOINT -- Hour: {{ playcut.hour }}
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <!-- Maybe need to move modals into its own component but I don't think so. -->

    <Dialog
      :header="currentPlaycutArtist"
      :visible="displayModal"
      :style="{ width: '50vw' }"
      :modal="true"
      :dismissableMask="true"
    >
      <p class="m-0">
        {{ playcutInfo.profile }}
      </p>
      <template #footer>
        <!-- <Button
        label="No"
        icon="pi pi-times"
        @click="closeModal"
        class="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus /> -->
      </template>
    </Dialog>
  </div>
</template>
 
<script>
import { VueDraggableNext } from "vue-draggable-next";

import Dialog from "primevue/dialog";
import Button from "primevue/button";

import playcutInfoService from "../services/playcutInfoService";

export default {
  name: "FlowsheetEntries",
  components: {
    draggable: VueDraggableNext,
    Dialog,
    Button,
  },
  props: ["playcuts"],
  data() {
    return {
      enabled: true,
      // playcuts: [],
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
