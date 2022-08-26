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
import { prop, Vue } from 'vue-class-component'


class IconTitleProps {
  tileTitle = prop<string>({ default: 'Default Title' })
  icon = prop<string>({ default: 'exclamation-triangle' })
}

export default class IconTile extends Vue.with(IconTitleProps) {
}
</script>

<style lang="scss">

</style>
