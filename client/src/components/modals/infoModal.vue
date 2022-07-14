<template>
  <!-- <div class="modal" id="infoModal"> -->
  <!-- <div
      class="modal-background"
      @click="$emit('update:infoModalActive', false)"
    ></div>
    <div class="modal-content">
      <h2>
        {{ playcutInfo }}
      </h2>
      <p>
        Info from Discogs and other sources here. Images, artist info, release
        info, etc.
      </p>
      <p>
        This could be fetched for every new entry and then pushed to a DB,
        maybe? Could get outdated soon. Would be conditional on DB entry date
        for that info.
      </p>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('update:infoModalActive', false)"
    ></button>

    <h5>Modal</h5>
    <Button label="Show" icon="pi pi-external-link" @click="openModal" /> -->
  <Dialog header="Header" :style="{ width: '50vw' }" :modal="true">
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="closeModal"
        class="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
    </template>
  </Dialog>
  <!-- </div> -->
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import playcutInfoService from "../../service/playcutInfoService";

export default {
  name: "InfoModal",
  data() {
    return {
      //   infoModalActive: infoModalActive,
      playcutInfo: null,
      displayModal: false,
    };
  },
  props: {
    infoModalActive: {
      type: Boolean,
      default: true,
    },
  },
  playcutInfoService: null,
  created() {
    this.playcutInfoService = new playcutInfoService();
  },
  mounted() {
    let globalThis = this;
    this.playcutInfoService.getInfo().then(function (data) {
      globalThis.playcutInfo = data;
      console.log(globalThis.playcutInfo);
    });
  },
  methods: {
    closeModal(event) {
      console.log(event);
      this.infoModalActive = false;
    },
    openModal() {
      this.displayModal = true;
    },
  },
  emits: ["update:infoModalActive"],
};
</script>

<style></style>
