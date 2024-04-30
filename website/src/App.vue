<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <router-link to="/"><img src="/favicon.ico" width="28" height="28" alt="Logo"></router-link>
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarDropDown">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarDropDown" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item navbar__underline-remove" to="/">
            Home
          </router-link>
          <router-link class="navbar-item navbar__underline-remove" to="/about">
            About
          </router-link>
          <a class="navbar-item navbar__underline-remove" href="https://api.petersherk.com/docs/resume_peter_sherk.pdf" target="_blank">
            Resume
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Created by Peter Sherk using <a href="https://bulma.io">Bulma</a>,
          <a href="https://vuejs.org/">Vue</a> and
          <a href="https://www.raspberrypi.com/">RaspberryPi</a>. &copy; 2024
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">

.navbar__underline-remove {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script lang="ts">
export default {
  mounted () {
    document.addEventListener('DOMContentLoaded', () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target
            const $target = document.getElementById(target)
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active')
            $target?.classList.toggle('is-active')
          })
        })
      }
    })
  }
}
</script>
