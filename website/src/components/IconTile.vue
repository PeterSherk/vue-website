<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <font-awesome-icon :icon="['fas', icon]" size="3x" />
            </div>
            <div class="level-item">
                <h1 class="title">{{tileTitle}}</h1>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class IconTile extends Vue {
  @Prop({ default: 'Default Title' }) private tileTitle!: string;
  @Prop({ default: 'exclamation-triangle' }) private icon!: string;
}
</script>

<style lang="scss">

</style>
