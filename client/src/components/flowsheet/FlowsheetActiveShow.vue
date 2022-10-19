<template>
  <div>last active show id: {{ activeShow[0].id }}</div>
</template>

<script>
import { getActiveShow } from "../../services/directus.service";

export default {
  name: "FlowsheetActiveShow",
  components: {},
  async setup() {
    let activeShow = await getActiveShow();

    return { activeShow };
  },
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style>
</style>
