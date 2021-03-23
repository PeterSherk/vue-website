<template>
    <div>
        <section class="hero is-fullheight-with-navbar">
            <!-- Hero content: will be in the middle -->
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-5 is-offset-1">
                            <h1 class="title">
                                Welcome
                            </h1>
                            <h2 class="subtitle">
                                This website showcases my many passions, from coding to cooking to music.
                            </h2>
                        </div>
                        <div class="column is-5 is-narrow-tablet is-narrow-mobile">
                            <div class="tile is-ancestor">
                                <div class="tile is-vertical is-parent">
                                    <router-link custom to="/coding" class="tile is-child">
                                        <div class="box grow__box">
                                            <IconTile tileTitle="Coding" icon="laptop-code"/>
                                        </div>
                                    </router-link>
                                    <router-link custom to="/cooking" class="tile is-child">
                                        <div class=" box grow__box">
                                            <IconTile tileTitle="Cooking" icon="cookie-bite"/>
                                        </div>
                                    </router-link>
                                    <router-link custom to="/music" class="tile is-child">
                                        <div class="box grow__box">
                                            <IconTile tileTitle="Music" icon="compact-disc"/>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import IconTile from '@/components/IconTile.vue'

export default {
  name: 'banner',
  components: {
    IconTile
  }
}
</script>

<style lang="scss">
</style>
