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
                <div class="column is-4 is-narrow-tablet is-narrow-mobile">
                    <div class="tile is-ancestor">
                        <div class="tile is-vertical is-parent">
                            <div id="coding" class="tile is-child box">
                                <IconTile tileTitle="Coding" icon="fa-laptop-code" route="/coding"/>
                            </div>
                            <div class="tile is-child box">
                                <IconTile tileTitle="Cooking" icon="fa-cookie-bite" route="/cooking"/>
                            </div>
                            <div class="tile is-child box">
                                <IconTile tileTitle="Music" icon="fa-compact-disc" route="/music"/>
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
    .banner__box-hand {
        cursor: pointer;
    }
    .box {
        transition: all .2s ease-in-out;
    }
    .box:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
</style>
