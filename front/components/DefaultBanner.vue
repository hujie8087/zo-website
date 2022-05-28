<template>
  <div :class="'banner ' + cusClass">
    <nuxt-link :to="url ? url : ''">
      <img :src="imgUrl" />
      <div class="box">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'DefaultBanner',
  props: {
    cusClass: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  img {
    width: 1920px;
    height: 300px;
    min-width: 1920px;
    min-height: 300px;
    left: 50%;
    position: relative;
    margin-left: -960px;
  }
  .box {
    position: absolute;
    height: 100%;
    width: 1200px;
    top: 0;
    left: 50%;
    margin-left: -600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    .title {
      font-size: 50px;
      line-height: 80px;
    }
    .subtitle {
      font-size: 20px;
      line-height: 80px;
    }
  }
}
.height-auto {
  height: auto;
  img {
    height: auto;
    min-height: auto;
  }
}
</style>
