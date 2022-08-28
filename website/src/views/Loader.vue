<template>
  <div id="app-loader" class="columns is-mobile is-centered">
    <div class="column is-narrow">
      <div class="loader loader__spinner-larger"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app-loader',
}
</script>

<style lang="scss">
  .loader__spinner-larger {
    height: 4rem;
    width: 4rem;
  }
</style>
