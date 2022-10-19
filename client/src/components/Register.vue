<template>
  <div>
    <h1>Register Vjz</h1>

    <Form
      @submit="registerSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">
        <label>First Name: </label>
        <Field
          name="first_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.first_name }"
        />
        <div class="invalid-feedback">{{ errors.first_name }}</div>
      </div>
      <div class="form-group">
        <label>Last Name: </label>
        <Field
          name="last_name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.last_name }"
        />
        <div class="invalid-feedback">{{ errors.last_name }}</div>
      </div>
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
          Register
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
        {{ errors.apiError }}
      </div>
    </Form>

    <div>
      <p v-if="registerSuccess == true">
        Register Successful! Redirecting you to login page.
      </p>
      <p v-else-if="registerSuccess == false">
        Register Failed. Please Try Again.
      </p>
    </div>

    <router-link to="/login">Already registered? Login</router-link>
  </div>
</template>

<script>
import { createUser } from "../services/user.service";

import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "Register",
  data() {
    return {
      registerSuccess: null,
      schema: Yup.object().shape({
        email: Yup.string().required("email is required"),
        password: Yup.string().required("Password is required"),
        first_name: Yup.string().required(
          "First name is required for Federal Communications Commision (FCC) reasons."
        ),
        last_name: Yup.string().required(
          "Last name is required for Federal Communications Commision (FCC) reasons."
        ),
      }),
    };
  },
  components: { Form, Field },
  methods: {
    async registerSubmit(values, { setErrors }) {
      const { email, password, first_name, last_name } = values;
      let createUser = createUser(values);

      if (createUser) {
        this.registerSuccess = true;
      }

      return createUser
        .then(() => new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => this.$router.push(this.$route.query.redirect || "/"))
        .catch((error) => setErrors({ apiError: error }));
    },
  },
};
</script>