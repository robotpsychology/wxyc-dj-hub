<template>
  <div id="loginPage">
    <h1>Login</h1>

    <Form
      @submit="loginSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label>Email: </label>
        <Field
          name="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label>Password: </label>
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

    <span>Need an account? </span>
    <router-link to="/register">Register Here</router-link>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth.store.js";
// import { mapState } from "pinia";

import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "Login",
  data() {
    return {
      schema: Yup.object().shape({
        email: Yup.string().required("email is required"),
        password: Yup.string().required("Password is required"),
      }),
    };
  },
  components: { Form, Field },
  computed: {
    // ...mapState(useLoggedInUserStore, ["email", "name"]),
  },
  methods: {
    async loginSubmit(values, { setErrors }) {
      const authStore = await useAuthStore();
      const { email, password } = values;
      return authStore
        .login(email, password)
        .catch((error) => setErrors({ apiError: error }));
    },
  },
};
</script>

<style lang="scss" scoped>
#loginPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  color: blue;
}

.form-group {
  margin: 1.5em;
}

form input {
  display: flex;
  flex-direction: column;
}
</style>