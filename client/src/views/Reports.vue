<template>
  <div>Reports</div>
  <SelectButton id="entryType" v-model="reportType" :options="reportOptions" />
</template>

<script>
export default {
  name: "Reports",
  components: {},
  data() {
    return {
      reportType: "CD/Vinyl",
      reportOptions: ["CD/Vinyl", "Equipment"],
    };
  },
  methods: {},
};
</script>

<style>
</style>
