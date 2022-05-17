<template>
  <Menubar :model="items">
    <template #start>
      <router-link to="/">
        <img alt="WXYC Logo" src="./assets/cropped-icon-32x32.png" />
      </router-link>
    </template>

    <template #end>
      <div id="menubar-end">
        <a
          v-for="link in outsideLinks"
          :key="link.href"
          :class="link.icon"
          :href="link.href"
          class="p-menuitem-link"
          target="_blank"
        >
        </a>
        <a></a>
      </div>
    </template>
  </Menubar>
  <router-view />
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  components: { Menubar },
  data() {
    return {
      items: [
        {
          label: "Flowsheet",
          icon: "pi pi-home",
          to: "/",
        },
        {
          label: "Report",
          icon: "pi pi-exclamation-triangle",
          to: "/Reports",
        },
        {
          label: "Love Wall",
          icon: "pi pi-heart",
          to: "/love_wall",
        },
        {
          label: "About",
          icon: "pi pi-question-circle",
          to: "/About",
        },
        {
          label: "User",
          icon: "pi pi-fw pi-user p-submenu-icon",
          // to: "/User",
          items: [
            {
              label: "Account",
              icon: "pi",
              to: "/",
            },
            {
              label: "Help",
              icon: "pi",
              to: "/",
            },
          ],
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
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#menubar-end {
  display: flex;
}

/* #nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
}

#nav img {
  justify-items: left;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
