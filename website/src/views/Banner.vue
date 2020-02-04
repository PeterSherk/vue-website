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
                        <div class="column is-4 is-narrow-tablet is-narrow-mobile">
                            <div class="tile is-ancestor">
                                <div class="tile is-vertical is-parent">
                                    <router-link to="/coding" tag="div" class="tile is-child box banner__box">
                                        <IconTile tileTitle="Coding" icon="laptop-code"/>
                                    </router-link>
                                    <router-link to="/cooking" tag="div" class="tile is-child box banner__box">
                                        <IconTile tileTitle="Cooking" icon="cookie-bite"/>
                                    </router-link>
                                    <router-link to="/music" tag="div" class="tile is-child box banner__box">
                                        <IconTile tileTitle="Music" icon="compact-disc"/>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Possibly move this to View. Photo with links. -->
        <div class="bio__border"></div>
        <section class="section" style="background-color: #F8F8F8">
            <div class="container">
                <div class="level">
                    <div class="level-item has-text-centered">
                        <img class="head" src="../../public/img/positano.jpeg">
                    </div>
                    <div class="level-item has-text-centered">
                        <div class="content">
                            <p class="title">Peter Sherk</p>
                            <p style="font-size: 1.2em;">
                                Software Engineer out of Raleigh, North Carolina.
                            </p>
                            <div style="justify-content: center" class="buttons">
                                <button class="button is-rounded" @click="openLink('mailto:psherk95@gmail.com')">
                                    <font-awesome-icon :icon="['far', 'envelope']" />
                                </button>
                                <button class="button is-rounded" @click="openLink('https://www.linkedin.com/in/peter-sherk', true)">
                                    <font-awesome-icon :icon="['fab', 'linkedin']" />
                                </button>
                                <button class="button is-rounded" @click="openLink('https://github.com/PeterSherk', true)">
                                    <font-awesome-icon :icon="['fab', 'github']" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="bio__border" style="margin-bottom: 4em;"></div>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import IconTile from '@/components/IconTile.vue'

export default {
  name: 'banner',
  components: {
    IconTile
  },
  methods: {
    openLink: (link: string, newTab: boolean) => {
      window.open(link, newTab ? '_blank' : '_parent')
    }
  }
}
</script>

<style lang="scss">
    .head {
        width:240px;
        height:320px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 10px;
    }
    .banner__box {
        transition: all .2s ease-in-out;
    }
    .banner__box:hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    .bio__border {
        background-color: #35db3a;
        height: 2px;
    }
</style>
