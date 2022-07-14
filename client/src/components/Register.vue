<template>
  <div>
    <h1>register</h1>

    <input type="email" name="email" v-model="email" placeholder="email" />
    <br />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <br />
    <button @click="registerClick">Register</button>
  </div>
</template>

<script>
import { register } from "@/services/AuthenticationService";
export default {
  name: "Register",
  data() {
    return {
      email: "abc",
      password: "123",
    };
  },
  methods: {
    async registerClick() {
      const response = await register({
        email: this.email,
        password: this.password,
      });
      console.log(response);
    },
  },
};
</script>

<style>
</style>