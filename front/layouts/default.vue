<template>
  <div>
    <header-handle />
    <Nuxt />
    <footer-handle />
  </div>
</template>

<script>
import FooterHandle from '../components/FooterHandle.vue'
import HeaderHandle from '../components/HeaderHandle.vue'
export default {
  components: { HeaderHandle, FooterHandle },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
ul,
li {
  list-style: none;
  padding: 0;
}
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
</style>
