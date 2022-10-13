<template>
  <div>last active show id: {{ activeShow[0].id }}</div>
</template>

<script>
import { getActiveShow } from "../../services/directus.service";

export default {
  name: "FlowsheetActiveShow",
  components: {},
  data() {
    return {
      activeShow: null,
    };
  },
  async created() {
    this.activeShow = await getActiveShow();
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style>
</style>
