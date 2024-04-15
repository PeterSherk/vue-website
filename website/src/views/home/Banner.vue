<template>
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
                        <div class="fixed-grid has-1-cols">
                            <div class="grid">
                                <div class="cell">
                                    <router-link to="coding">
                                        <div class="box grow__box">
                                            <IconTile tileTitle="Coding" icon="laptop-code"/>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="cell">
                                    <router-link to="cooking">
                                        <div class=" box grow__box">
                                            <IconTile tileTitle="Cooking" icon="cookie-bite"/>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="cell">
                                    <router-link to="music">
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
        </div>
    </section>
</template>

<script lang="ts">
import IconTile from '@/components/IconTile.vue'

export default {
  name: 'app-banner',
  components: {
    IconTile
  }
}
</script>
