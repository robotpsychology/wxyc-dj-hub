<template>
  <div>
    <h2>Use this page to request media for rotation or the WXYC library</h2>
    <RequestsForm @getAllRequests="getAllRequests"></RequestsForm>
    <RequestsTable
      v-if="requests.length > 0"
      :requests="requests"
      @getAllRequests="getAllRequests"
    ></RequestsTable>
  </div>
</template>

<script>
import * as directusService from "../services/directus.service";

import RequestsTable from "../components/requests/RequestsTable.vue";
import RequestsForm from "../components/requests/RequestsForm.vue";

export default {
  name: "Requests",
  components: { RequestsTable, RequestsForm },
  data() {
    return {
      table_name: "requests",
      requests: [],
    };
  },

  methods: {
    getAllRequests() {
      directusService.getAllItems(this.table_name).then((response) => {
        this.requests = response.data;
      });
    },
  },
  mounted() {
    this.getAllRequests();
  },
};
</script>

<style scoped>
</style>
