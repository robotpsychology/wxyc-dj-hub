<template>
  <div id="wrapper">
    <div id="container">
      <h1>WXYC</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "WXYCLogo",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,700,900,400italic,700italic,900italic);

*,
:before,
:after {
  box-sizing: border-box;
}

body {
  background-color: #fdf9fd;
  color: #011a32;
  font: 10px/1.25 "Raleway", sans-serif;
  text-align: center;
}

#wrapper {
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* max-width: 80em; */
}

#container {
  /* display: flex; */
  /* flex-direction: column; */
  /* float: left; */
  /* justify-content: center; */
  /* min-height: 100vh; */
  /* padding: 1em; */
  /* width: 100%; */
}

h1 {
  animation: text-shadow 1s ease-in-out 1;
  font-size: 1.5em;
  line-height: 1;
  text-shadow: 2px 2px 0 #7a7a7a;
}

h1:hover {
  /* animation-play-state: paused; */
}

a {
  color: #024794;
}

a:hover {
  text-decoration: none;
}

@keyframes text-shadow {
  0% {
    transform: translateY(0);
    text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
  }

  20% {
    transform: translateY(-1em);
    text-shadow: 0 0.125em 0 #0c2ffb, 0 0.25em 0 #2cfcfd, 0 -0.125em 0 #fb203b,
      0 -0.25em 0 #fefc4b;
  }

  40% {
    transform: translateY(0.5em);
    text-shadow: 0 -0.0625em 0 #0c2ffb, 0 -0.125em 0 #2cfcfd,
      0 0.0625em 0 #fb203b, 0 0.125em 0 #fefc4b;
  }

  60% {
    transform: translateY(-0.25em);
    text-shadow: 0 0.03125em 0 #0c2ffb, 0 0.0625em 0 #2cfcfd,
      0 -0.03125em 0 #fb203b, 0 -0.0625em 0 #fefc4b;
  }

  80% {
    transform: translateY(0);
    text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
  }
  100% {
    text-shadow: 0px 2px 2pc #7a7a7a;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>