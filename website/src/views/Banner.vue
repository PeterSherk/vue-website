<template>
    <section class="hero is-fullheight-with-navbar">
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <h1 class="title">
                        Welcome
                    </h1>
                    <h2 class="subtitle">
                        This website showcases my many passions, from coding to cooking to music.
                    </h2>
                </div>
                <div class="column">
                    <div class="tile is-ancestor">
                        <div class="tile is-6 is-vertical is-parent">
                            <div class="tile is-child box">
                                <IconTile tileTitle="Coding" icon="fa-laptop-code"/>
                            </div>
                            <div class="tile is-child box">
                                <IconTile tileTitle="Cooking" icon="fa-cookie-bite"/>
                            </div>
                            <div class="tile is-child box">
                                <IconTile tileTitle="Music" icon="fa-compact-disc"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>

<script lang="ts">
// @ is an alias to /src
import IconTile from '@/components/IconTile.vue'

export default {
  name: 'banner',
  components: {
    IconTile
  }
}
</script>

<style lang="scss">
    .welcome__label-buffer {
        margin-left: 1rem;
    }
    .welcome-larger {
        font-size: 2rem;
    }
</style>
