<template>
  <div class="app-home">
    <Banner/>
    <BannerAbout/>
  </div>
</template>

<script>
import Banner from '@/views/home/Banner.vue'
import BannerAbout from '@/views/home/BannerAbout.vue'

export default {
  name: 'app-home',
  components: {
    Banner,
    BannerAbout
  }
}
</script>
