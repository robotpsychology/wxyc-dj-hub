<template>
  <div id="wrapper">
    <div id="profileWrapper">
      <ProfileCard :user="user"></ProfileCard>
    </div>
  </div>
</template>

<script>
import ProfileCard from "../components/profiles/ProfileCard.vue";
export default {
  name: "Account",
  components: { ProfileCard },
  data() {
    return {
      user: {
        name: "John Doe",
        dj_name: "ShimSham",
        show_completed: 5,
        position: "DJ",
        avatar: "logo.png",
      },
    };
  },
  methods: {},
};
</script>

<style>
#wrapper {
  display: flex;
}

#profileWrapper {
  align-self: flex-end;
}
</style>