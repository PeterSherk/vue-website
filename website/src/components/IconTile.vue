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
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconTile extends Vue {
  @Prop() private tileTitle!: string;
  @Prop({ default: 'fa-exclamation-triangle' }) private icon!: string;
}
</script>

<style lang="scss">
    .icontile__title-buffer {
        margin-left: 1rem;
    }
</style>
