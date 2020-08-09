<template>
  <GenericError errorMessage="Oops! Page Not Found." errorPicturePath="img/moose_404.jpeg"
    altText="moose 404" navigationText="Go Home" navigationPath="/"/>
</template>

<script lang="ts">
import GenericError from '@/components/GenericError.vue'

export default {
  name: 'pageNotFound',
  components: {
    GenericError
  }
}
</script>

<style lang="scss">

</style>
