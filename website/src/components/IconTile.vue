<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <i :class="icon" class="fas fa-3x"></i>
            </div>
            <div class="level-item">
                <h1 class="title">{{tileTitle}}</h1>
            </div>
        </div>
        <div class="level-right">
            <router-link :to="route">
                <button class="button is-medium is-fullwidth">
                    <span class="icon is-medium">
                        <i class="fas fa-long-arrow-alt-right"></i>
                    </span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconTile extends Vue {
  @Prop({ default: 'Default Title' }) private tileTitle!: string;
  @Prop({ default: 'fa-exclamation-triangle' }) private icon!: string;
  @Prop({ default: '/' }) private route!: string;
}
</script>

<style lang="scss">

</style>
