<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img class="pagenotfound__moose" src="../../public/img/moose_404.jpeg" alt="moose 404" />
        <h1 class="title">Oops! Page Not Found.</h1>
        <router-link to="/" tag="button" class="button">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .pagenotfound__moose {
    width:340px;
    height:220px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
  }
</style>
