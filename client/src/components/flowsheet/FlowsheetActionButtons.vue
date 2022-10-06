<template>
  <div>
    <Button label="Add Talkset" @click="addTalkset"></Button>
    <Button label="Add Breakpoint" @click="addBreakpoint"></Button>
  </div>
</template>

<script>
import * as directusService from "../../services/directus.service";

export default {
  name: "FlowsheetActionButtons",
  components: {},
  props: {
    playcut_db_table: { type: String },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    async addTalkset() {
      const payload = {
        entry_type: "talkset",
      };
      this.$emit("createPlaycut", payload);

      // await directusService.createItem(this.playcut_db_table, payload);
      // this.$emit("getPlaycuts");
    },
    async addBreakpoint() {
      const payload = {
        entry_type: "breakpoint",
      };
      this.$emit("createPlaycut", payload);

      // this.$emit("getPlaycuts");
    },
  },
};
</script>

<style>
</style>
