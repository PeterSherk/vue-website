<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img class="error_picture" :src="`${publicPath}${errorPicturePath}`" :alt="altText" />
        <h1 class="title">{{errorMessage}}</h1>
        <router-link v-if="navigationPath && navigationText" :to="navigationPath" tag="button" class="button">{{navigationText}}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GenericError extends Vue {
  @Prop({ default: 'Error!' }) private errorMessage!: string;
  @Prop({ default: 'img/moose_404.jpeg' }) private errorPicturePath!: string;
  @Prop({ default: 'Error Picture' }) private altText!: string;
  @Prop({ default: 'Go Home' }) private navigationText!: string
  @Prop({ default: '/' }) private navigationPath!: string

  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
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
