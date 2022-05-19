<template>
  <div>
    <h1>register</h1>

    <input type="email" name="email" v-model="emailInput" placeholder="email" />
    <br />
    <input
      type="password"
      name="password"
      v-model="passwordInput"
      placeholder="password"
    />
    <br />
    <button @click="loginClick">Register</button>
    <p>hi {{ user.email }}</p>
    <p>{{ user.nameCount }}</p>
  </div>
</template>

<script>
import { directus } from "../services/directus";
import { useLoggedInUserStore } from "@/store/loggedInUser";
import { mapState } from "pinia";
import { login } from "../services/AuthenticationService";

export default {
  data() {
    return {
      emailInput: "",
      passwordInput: "",
      user: useLoggedInUserStore(),
    };
  },
  computed: {
    // ...mapState(useLoggedInUserStore, ["email", "name"]),
  },
  methods: {
    async loginClick() {
      const loginInfo = {
        email: this.emailInput,
        password: this.passwordInput,
      };

      const requestLogin = login(loginInfo);

      if (requestLogin) {
        this.user.loginUser(loginInfo);
      }

      //   const response = await directus.auth.login(loginInfo);
      // .then((response) => {
      //   if (response.access_token) {
      //     localStorage.setItem("user", JSON.stringify(response.data));
      //   }
      // });

      //   const response = await register({
      //     email: this.email,
      //     password: this.password,
      //   });
    },
  },
};
</script>