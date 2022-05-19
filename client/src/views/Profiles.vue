<template>
  <div>Profiles</div>

  <div id="wrapper" v-for="user in userSample">
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
export default {
  name: "Profiles",
  components: { Card },
  data() {
    return {
      // avatar: require("../assets/logo.png"),

      userSample: [
        {
          name: "John Doe",
          dj_name: "ShimSham",
          show_completed: 5,
          position: "DJ",
          avatar: "logo.png",
        },
        {
          name: "Jane Doe",
          dj_name: "tincan",
          show_completed: 10,
          position: "Station Manager",
          avatar: "logo.png",
        },
        {
          name: "Tommy Dang",
          dj_name: "appa",
          show_completed: 2,
          position: "sweeper",
          avatar: "logo.png",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
#wrapper {
  display: inline-block;
  margin: 2em;
}

.userAvatar {
  width: 10em;
}

p {
  line-height: 1.5;
  margin: 0;
}
</style>
