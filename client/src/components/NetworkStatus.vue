<template>
  <div id="wrapper">
    <div id="" class="statusBar online">
      <span class="online" v-if="onLine">Online</span>
    </div>

    <div id="" class="statusBar">
      <span class="offline" v-if="!onLine">Offline</span>
    </div>
  </div>
</template>

<script>
import { useNetworkStatusStore } from "@/store/networkStatus.store.js";

export default {
  name: "NetworkStatus",
  data() {
    return {
      onLine: navigator.onLine,
      showBackOnline: false,
      networkStatusStore: null,
    };
  },
  created() {
    this.networkStatusStore = useNetworkStatusStore();
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";

      // essential update to networkStatus store
      this.networkStatusStore.$state.onLine =
        !this.networkStatusStore.$state.onLine;
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,700,900,400italic,700italic,900italic);

*,
:before,
:after {
  box-sizing: border-box;
}

.statusBar {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.statusBar .offline {
  background-color: #ffcdd2;
  color: #c63737;
}
.statusBar .online {
  background-color: #c8e6c9;
  color: #256029;
}
</style>