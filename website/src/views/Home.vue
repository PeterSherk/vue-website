<template>
  <div class="home">
    <Banner/>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/views/Banner.vue'

export default {
  name: 'home',
  components: {
    Banner
  }
}
</script>
