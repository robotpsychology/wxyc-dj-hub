<template>
  <div>
    <h2>Use this page to request media for rotation or the WXYC library</h2>
    <SelectButton
      id="entryType"
      v-model="requestType"
      :options="requestOptions"
    />

    <RequestsForm
      @getAllRequests="getAllRequests"
      :tableName="tableName"
      :requestType="requestType"
    ></RequestsForm>

    <RequestsTable
      v-if="requests.length > 0"
      :requests="requests"
      :requestType="requestType"
      :tableName="tableName"
      @getAllRequests="getAllRequests"
    ></RequestsTable>
  </div>
</template>

<script>
import * as directusService from "@/services/directus.service";

import RequestsTable from "../components/requests/RequestsTable.vue";
import RequestsForm from "../components/requests/RequestsForm.vue";

export default {
  name: "Requests",
  components: { RequestsTable, RequestsForm },
  data() {
    return {
      tableName: "requests",
      requestType: "Rotation",
      requestOptions: ["Rotation", "WXYC Library"],
      requests: [],
    };
  },

  methods: {
    getAllRequests() {
      directusService.getAllItems(this.tableName).then((response) => {
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
