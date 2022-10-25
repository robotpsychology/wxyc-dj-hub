<template>
  <div id="about">
    <h1>About the WXYC DJ Hub</h1>
    <header>
      <h2>Who?</h2>

      <h4>You (and also me)!</h4>
    </header>

    <section>
      <h3>
        The WXYC DJ Hub was primarily developed
        <br />
        by Ali Alrabeah [DJ Appa]
      </h3>
      <br />

      <h3>
        You can work on this project too!
        <br />
        Just visit the Github page below <i class="pi pi-arrow-down"></i>
      </h3>
      <a href="https://github.com/robotpsychology/wxyc-dj-hub">
        <i class="pi pi-github"></i> WXYC DJ Hub GitHub Repo</a
      >
    </section>

    <br />

    <hr />

    <header></header>
    <section></section>
  </div>
</template>

<style>
#about {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 1em;
}
i.pi-github {
  font-size: 5rem;
}

a {
  text-decoration: none;
  color: rgb(210, 75, 75);
}

h2 {
  text-decoration: dashed;
}

hr {
  background: linear-gradient(to right, red, yellow);
  height: 0.2em;
  width: 55%;

  margin: auto;
}
</style>
