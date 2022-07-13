<template>
  <div>
    <h1>Login</h1>

    <input type="email" name="email" v-model="emailInput" placeholder="email" />
    <br />
    <input
      type="password"
      name="password"
      v-model="passwordInput"
      placeholder="password"
    />
    <br />
    <button @click="loginClick">Login</button>
    <p>hi {{ this.emailInput }}</p>
    <p></p>
    <!-- <p>This is a result from Pinia loggedInUser.js: {{ user.nameCount }}</p> -->
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth.store.js";
// import { mapState } from "pinia";

export default {
  data() {
    return {
      emailInput: "",
      passwordInput: "",
      // user: useAuthStore(),
    };
  },
  computed: {
    // ...mapState(useLoggedInUserStore, ["email", "name"]),
  },
  methods: {
    async loginClick() {
      const authStore = useAuthStore();
      return authStore.login(this.emailInput, this.passwordInput);
    },
  },
};
</script>