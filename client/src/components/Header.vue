<template>
  <Menubar :model="items">
    <template #start>
      <router-link to="/" id="WXYCLogo">
        <WXYCLogoVue></WXYCLogoVue>
        <!-- <img alt="WXYC Logo" src="../assets/cropped-icon-32x32.png" /> -->
      </router-link>
    </template>

    <template #end>
      <div id="menubar-end">
        <LogoutButton />
        <NetworkStatus />

        <a
          v-for="link in outsideLinks"
          :key="link.href"
          :class="link.icon"
          :href="link.href"
          class="p-menuitem-link"
          target="_blank"
        >
        </a>
      </div>
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import WXYCLogoVue from "../components/WXYCLogo.vue";
import NetworkStatus from "./NetworkStatus.vue";
import LogoutButton from "./LogoutButton.vue";

export default {
  name: "Header",
  components: { Menubar, WXYCLogoVue, NetworkStatus, LogoutButton },
  data() {
    return {
      userActive: null,
      items: [
        {
          label: "Flowsheet",
          icon: "pi pi-home",
          to: "/",
        },
        {
          label: "Reports",
          icon: "pi pi-exclamation-triangle",
          to: "/Reports",
        },
        {
          label: "Requests",
          icon: "pi pi-check-circle",
          to: "/requests",
        },
        {
          label: "Resources",
          icon: "pi pi-folder",
          to: "/Resources",
        },
        {
          label: "Profiles",
          icon: "pi pi-users",
          to: "/profiles",
        },
        {
          label: "About",
          icon: "pi pi-question-circle",
          to: "/About",
        },
        {
          label: "Account",
          icon: "pi pi-user",
          to: "/account",
        },
      ],
      outsideLinks: [
        {
          href: "https://wxyc.slack.com/",
          icon: "pi pi-slack",
        },
        {
          href: "https://twitter.com/wxycrequests",
          icon: "pi pi-twitter",
        },
        {
          href: "https://wxyc.org/",
          icon: "pi pi-globe",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
#WXYCLogo {
  text-decoration: none;
  color: inherit;
}
</style>
