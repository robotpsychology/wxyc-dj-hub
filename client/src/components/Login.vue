<template>
  <div>
    <!-- <h1>Login</h1>

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
    <p>This is a result from Pinia loggedInUser.js: {{ user.nameCount }}</p> -->

    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label>Username</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Login
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
        {{ errors.apiError }}
      </div>
    </Form>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth.store.js";
// import { mapState } from "pinia";

import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  data() {
    return {
      emailInput: "",
      passwordInput: "",
      // user: useAuthStore(),
      schema: Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
      }),
    };
  },
  components: { Form, Field },
  computed: {
    // ...mapState(useLoggedInUserStore, ["email", "name"]),
  },
  methods: {
    async loginClick() {
      const authStore = useAuthStore();
      return authStore.login(this.emailInput, this.passwordInput);
    },

    onSubmit(values, { setErrors }) {
      const authStore = useAuthStore();
      const { username, password } = values;
      return authStore
        .login(username, password)
        .catch((error) => setErrors({ apiError: error }));
    },
  },
};
</script>