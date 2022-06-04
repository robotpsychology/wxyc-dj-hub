<template>
  <Card style="width: 20rem; margin-bottom: 2em">
    <template #header>
      <img
        class="userAvatar"
        :src="require('../assets/' + user.avatar)"
        alt=""
      />
    </template>

    <template #title> {{ user.dj_name }} </template>
    <template #subtitle> {{ user.name }} </template>

    <template #content>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
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
    return {};
  },
  methods: {},
};
</script>

<style>
</style>