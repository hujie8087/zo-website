<template>
  <div>
    <div
      v-if="initStatus"
      v-swiper:mySwiper="swiperOption"
      :class="cusClass + ' swiperWrap swiperBox ' + swpName"
    >
      <div class="swiper-wrapper">
        <div v-for="banner in list" :key="banner._id" class="swiper-slide">
          <a v-if="banner.banner_url" :href="banner.banner_url" target="_blank">
            <img :src="banner.banner_url + banner.banner_img" />
          </a>
          <img v-else :src="banner.banner_url + banner.banner_img" />
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <div class="swiper-button swiper-button-prev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
      <div class="swiper-button swiper-button-next">
        <i class="el-icon-arrow-right"></i>
      </div>
      <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      // banner数组
      type: Array,
      default: () => {
        return []
      },
    },
    cusClass: {
      // 自定义类名
      type: String,
      default: '',
    },
    loop: {
      // 是否循环
      type: Boolean,
      default: true,
    },
    delay: {
      // 间隔时间
      type: Number,
      default: 3000,
    },
    spaceBetween: {
      // 两个轮播的间隔
      type: Number,
      default: 0,
    },
    slidesPerView: {
      // 一页显示几个
      type: Number,
      default: 1,
    },
    paginationType: {
      // 导航点类型
      // 'bullets'  圆点（默认）
      // 'fraction'  分式
      // 'progressbar'  进度条
      // 'custom' 自定义
      type: String,
      default: '',
    },
  },
  data() {
    return {
      initStatus: false, // 初始化状态
      swpName: this.roundString(), // swiper的类名
      swiperOption: {}, // swiper参数
    }
  },
  mounted() {
    const self = this

    this.$nextTick(() => {
      this.swiperOption = {
        loop: self.loop,
        centeredSlides: true,
        slidesPerView: self.slidesPerView, // 一页显示几个
        spaceBetween: self.spaceBetween, // 间隔
        autoplay: {
          // 自动轮播
          delay: self.delay,
          disableOnInteraction: false, // 操作swiper后 自动轮播不会停止
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: self.paginationType ? self.paginationType : 'bullets',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this)
          },
          tap() {
            // console.log('onTap', this)
          },
        },
      }
      this.initStatus = true // 渲染swiper
    })
  },
  methods: {
    roundString() {
      // 生成随机字符串
      let str = ''
      const chars = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ]
      chars.forEach(() => {
        str += chars[Math.ceil(Math.random() * 25)]
      })
      return str
    },
  },
}
</script>
<style lang="scss" scoped>
.swiperWrap {
  .swiper-slide {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-button {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: #333333;
    i {
      display: block;
      line-height: 65px;
      text-align: center;
      color: #ffffff;
      font-size: 30px;
    }
    &:hover {
      background-color: #fdc900;
    }
  }
  .swiper-button-prev {
    left: 30px;
  }
  .swiper-button-next {
    right: 30px;
  }
  .swiper-pagination {
    bottom: 30px;
    /deep/ .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: #ffffff;
      opacity: 0.25;
      margin: 0 10px;
    }
    /deep/ .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
}
</style>
