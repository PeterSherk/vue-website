<template>
  <div class="home">
    <Banner/>
    <HelloWorld msg="Welcome to my website"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/views/Banner.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Banner
  }
}
</script>
