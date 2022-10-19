<template>
  <Button
    v-if="authStore.userActive"
    label="Sign Out"
    icon="pi pi-check"
    @click="logoutClick()"
  ></Button>
</template>

<script>
import { useAuthStore } from "@/store/auth.store.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const authStore = useAuthStore();
    // this subscription will be kept even after the component is unmounted
    let userActive = authStore.$subscribe((mutation, state) => {
      console.log("hi", mutation, state);
      return state.userActive;
    });
    return { authStore, userActive };
  },
  data() {},
  async mounted() {
    // const authStore = useAuthStore();
    // const { store } = await storeToRefs(authStore);
    // this.userActive = store.userActive;
    // let authStore = useAuthStore();
    // if (authStore.$state.userInfo == null) {
    //   this.userActive = false;
    // } else {
    //   this.userActive = true;
    // }
  },
  methods: {
    async logoutClick() {
      const authStore = useAuthStore();
      await authStore.logout();
    },
  },
};
</script>