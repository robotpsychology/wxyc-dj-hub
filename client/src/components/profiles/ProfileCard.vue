<template>
  <Card style="width: 20rem; margin-bottom: 2em">
    <template #header>
      <img
        v-if="user.avatar"
        class="userAvatar"
        loading="lazy"
        :src="directus_url + user.avatar + '?fit=cover&quality=100'"
        alt=""
      />
      <img
        v-else
        class="userAvatar"
        loading="lazy"
        :src="require('@/assets/wxyc-icon-192x192.png')"
        alt=""
      />
    </template>

    <template #title> {{ user.title }} </template>
    <template #subtitle> {{ user.first_name }} {{ user.last_name }}</template>

    <template #content>
      <p class="userDescription">
        {{ user.description }}
      </p>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";

export default {
  name: "ProfileCard",
  components: { Card },
  props: ["user"],
  data() {
    return {
      directus_url: "http://localhost:8055/assets/",
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.userDescription {
  line-height: 1.5;
  margin: 0;
}
</style>