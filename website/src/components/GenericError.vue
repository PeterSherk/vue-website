<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img class="error_picture" :src="`${errorPicturePath}`" :alt="altText" />
        <h1 class="title">{{errorMessage}}</h1>
        <router-link v-if="navigationPath && navigationText" :to="navigationPath">
          <button class="button">{{navigationText}}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { prop, Vue } from 'vue-class-component'

class GenericErrorProps {
  errorMessage = prop<string>({ default: 'Error!' })
  errorPicturePath = prop<string>({ default: 'https://api.petersherk.com/img/moose_404.jpeg' })
  altText = prop<string>({ default: 'Error Picture' })
  navigationText = prop<string>({ default: 'Go Home' })
  navigationPath = prop<string>({ default: '/' })
}

export default class GenericError extends Vue.with(GenericErrorProps) {
}
</script>

<style lang="scss">
  .error_picture {
    width:340px;
    height:220px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
  }
</style>
