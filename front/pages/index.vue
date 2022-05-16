<template>
  <div class="home-page">
    <section>
      <swiper-cpt :list="banners" />
    </section>
    <section class="markets">
      <div class="container">
        <el-row class="markets-head">
          <el-col :span="5" :offset="0">
            <div class="markets-title">Markets</div>
          </el-col>
          <el-col :span="14" :offset="0">
            <div class="markets-tips">
              We serve a broad and diverse range of consumer and industrial end
              markets, including: transportation, home life, construction,
              energy and fuels, and clothing and footwear. We develop products
              that address customers’ needs and help provide solutions to some
              of the world’s greatest challenges.
            </div>
          </el-col>
          <el-col :span="5" :offset="0">
            <nuxt-link class="markets-btn" to="/markets">MORE</nuxt-link>
          </el-col>
        </el-row>

        <div
          v-if="marketsList.length > 0"
          v-swiper:mySwiper="swiperOption"
          class="swiperWrap swiperBox markets-swiper"
        >
          <div class="swiper-wrapper">
            <div
              v-for="market in marketsList"
              :key="market.src"
              class="swiper-slide"
            >
              <a :href="'/market/' + market.id" target="_blank">
                <img class="markets-maxImg" :src="market.maxImg" />
                <div class="markets-content">
                  <img class="markets-minImg" :src="market.minImg" />
                  <span class="markets-name">
                    {{ market.name }}
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div
            class="markets-pagination swiper-pagination swiper-pagination-bullets"
          ></div>
        </div>
      </div>
    </section>
    <section class="product">
      <div class="container">
        <div
          v-if="products.length > 0"
          v-swiper:mySwiper="productOption"
          class="swiperWrap swiperBox product-swiper"
        >
          <div class="swiper-wrapper">
            <div v-for="item in products" :key="item.id" class="swiper-slide">
              <div class="product-content">
                {{ item.content }}
              </div>
              <img class="product-minImg" :src="item.minImg" />
              <span class="product-title">
                {{ item.name }}
              </span>
            </div>
          </div>
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
    </section>
    <section class="service">
      <div class="container">
        <el-row>
          <el-col :span="8">
            <div class="service-title">Markets</div>
            <div class="service-tips">
              We serve a broad and diverse range of consumer and industrial end
              markets, including: transportation, home life, construction,
              energy and fuels
            </div>
            <nuxt-link class="service-btn" to="/service">MORE</nuxt-link>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col
                v-for="item in services"
                :key="item.id"
                :span="12"
                style="margin-bottom: 30px"
              >
                <el-row>
                  <el-col :span="5">
                    <img class="service-minImg" :src="item.minImg" />
                  </el-col>
                  <el-col :span="16">
                    <div class="service-name">
                      {{ item.name }}
                    </div>
                    <div class="service-content">
                      {{ item.content }}
                    </div>
                    <nuxt-link class="service-link" :to="'/service/' + item.id"
                      >MORE ></nuxt-link
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="cases">
      <div class="container">
        <div class="cases-title">Cases</div>
        <div class="cases-tips">
          Lorem ipsum dolor sit amet, mel postea mio liore corrumpit ea. Affert
          partiendo vix eu. Ei mea dolore democritum disu artio.
        </div>
        <div
          v-if="caseList.length > 0"
          v-swiper:mySwiper="caseOption"
          class="swiperWrap swiperBox cases-swiper"
        >
          <div class="swiper-wrapper">
            <div v-for="item in caseList" :key="item.src" class="swiper-slide">
              <a :href="'/case/' + item.id" target="_blank">
                <img class="cases-maxImg" :src="item.maxImg" />
              </a>
            </div>
          </div>
          <div
            class="case-pagination swiper-pagination swiper-pagination-bullets"
          ></div>
        </div>
      </div>
    </section>
    <section class="clients">
      <div class="container">
        <el-row :gutter="20">
          <el-col v-for="item in clients" :key="item.id" :span="6">
            <div class="clients-img">
              <img :src="item.imgUrl" />
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="message">
      <div class="container">
        <el-row>
          <el-col :span="10">
            <div class="message-box">
              <div class="message-title">CONTACT</div>
              <div class="message-tips">
                For any kind of query, contact us with the details below.
              </div>
              <div class="message-list">
                <p>4000 662 228</p>
                <p>xxxx@xxxx.com</p>
                <p>广东省深圳市宝安区西乡街道航城大道</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12" :offset="2">
            <div class="message-form">
              <div class="message-title">Online message</div>
              <div class="message-tips">
                For any kind of query, contact us with the details below.
              </div>
              <el-form
                ref="homeForm"
                :model="homeForm"
                :rules="rules"
                class="demo-homeForm"
              >
                <el-form-item prop="name">
                  <el-input
                    v-model="homeForm.name"
                    placeholder="Name"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input
                    v-model="homeForm.email"
                    placeholder="Email"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="content" placeholder="Content">
                  <el-input
                    v-model="homeForm.content"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('homeForm')"
                    >Submit</el-button
                  >
                  <el-button @click="resetForm('homeForm')">Reset</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="news">
      <div class="container">
        <el-row class="markets-head">
          <el-col :span="5" :offset="0">
            <div class="markets-title">News</div>
          </el-col>
          <el-col :span="14" :offset="0">
            <div class="markets-tips">
              We serve a broad and diverse range of consumer and industrial end
              markets, including: transportation, home life, construction,
              energy and fuels, and clothing and footwear. We develop products
              that address customers’ needs and help provide solutions to some
              of the world’s greatest challenges.
            </div>
          </el-col>
          <el-col :span="5" :offset="0">
            <nuxt-link class="markets-btn" to="/news">MORE</nuxt-link>
          </el-col>
        </el-row>
        <el-row class="news-list" :gutter="50">
          <el-col v-for="item in newsList" :key="item.id" :span="8">
            <div class="news-item">
              <img :src="item.imgUrl" :alt="item.name" />
              <div class="news-wrap">
                <div class="news-date">
                  <i class="el-icon-time el-icon"></i>{{ item.createData }}
                </div>
                <div class="news-name">
                  {{ item.name }}
                </div>
                <div class="news-content">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import SwiperCpt from '../components/SwiperCpt.vue'
export default {
  components: { SwiperCpt },
  data() {
    return {
      swiperOption: {
        loop: true,
        centeredSlides: true,
        slidesPerView: 3, // 一页显示几个
        spaceBetween: 20, // 间隔
        slidesPerGroup: 3,
        autoplay: {
          // 自动轮播
          delay: 3000,
          disableOnInteraction: true, // 操作swiper后 自动轮播不会停止
        },
        pagination: {
          el: '.markets-pagination',
          clickable: true,
          type: 'bullets',
        },
      },
      productOption: {},
      banners: [
        {
          src: require('../static/images/banner/banner.jpg'),
          link: '/',
        },
        {
          src: require('../static/images/banner/banner1.jpg'),
          link: '/',
        },
      ],
      marketsList: [],
      products: [],
      initStatus: false,
      services: [],
      caseList: [],
      clients: [],
      newsList: [],
      homeForm: {
        name: '',
        content: '',
        email: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Please enter your email',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  created() {
    this.getData()
    this.$nextTick(() => {
      this.productOption = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 1, // 一页显示几个
        spaceBetween: 0, // 间隔
        slidesPerGroup: 1,
        autoplay: {
          // 自动轮播
          delay: 3000,
          disableOnInteraction: true, // 操作swiper后 自动轮播不会停止
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
      this.caseOption = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 4, // 一页显示几个
        spaceBetween: 0, // 间隔
        slidesPerGroup: 4,
        autoplay: {
          // 自动轮播
          delay: 3000,
          disableOnInteraction: true, // 操作swiper后 自动轮播不会停止
        },
        pagination: {
          el: '.case-pagination',
          clickable: true,
          type: 'bullets',
        },
      }
      this.initStatus = true // 渲染swiper
    })
  },
  methods: {
    getData() {
      this.$http
        .get('/getHomeMarkets')
        .then((result) => {
          this.marketsList = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/getHomeProducts')
        .then((result) => {
          this.products = result.data
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/getHomeServices')
        .then((result) => {
          this.services = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/getHomeCase')
        .then((result) => {
          this.caseList = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/getHomeClitents')
        .then((result) => {
          this.clients = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/getHomeNews')
        .then((result) => {
          this.newsList = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.markets {
  margin: 60px 0 40px;
  &-title {
    font-size: 28px;
    font-weight: bold;
    color: #000;
    &:after {
      display: block;
      content: '';
      bottom: 10px;
      position: absolute;
      left: 0;
      width: 50px;
      height: 5px;
      background-color: #fdc900;
    }
  }
  &-tips {
    line-height: 25px;
    font-size: 14px;
    color: #666;
  }
  &-btn {
    float: right;
    width: 168px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    background-color: #fdc900;
    color: #ffffff;
    text-align: center;
    display: block;
    font-size: 16px;
    border-radius: 5px;
    &:hover {
      background-color: #000;
    }
  }
  &-swiper {
    margin-top: 40px;
    padding-bottom: 40px;
  }
  &-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 30px;
    line-height: 45px;
  }
  &-minImg {
    margin-right: 20px;
  }
  &-name {
    font-size: 16px;
    color: #fff;
    line-height: 45px;
    vertical-align: top;
    display: inline-block;
  }
  .swiper-pagination {
    text-align: left;
    bottom: 0px;
    /deep/ .swiper-pagination-bullet {
      background-color: #fdc900;
      height: 10px;
      width: 10px;
    }
  }
}
.product {
  width: 100%;
  background: url('../static/images/home-smart-bg.jpg') no-repeat center;
  background-size: cover;
  height: 420px;
  &-swiper {
    height: 420px;
  }
  .swiper-slide {
    padding: 70px 160px 0;
    background: url('../static/images/home-douhao.png') no-repeat 40px 40px;
  }
  &-content {
    color: #fff;
    margin-bottom: 70px;
    font-size: 16px;
    line-height: 35px;
    width: 100%;
  }
  &-minImg {
    border-bottom: 4px solid #fdc900;
    display: inline-block;
    margin-right: 40px;
  }
  &-title {
    line-height: 48px;
    color: #fdc900;
    font-size: 18px;
    font-weight: bold;
    vertical-align: top;
  }
  .swiper-button {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: #333333;
    top: auto;
    bottom: 40px;
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
    right: 120px;
    left: auto;
  }
  .swiper-button-next {
    right: 30px;
  }
}
.service {
  padding: 40px 0;
  &-title {
    font-size: 20px;
    font-weight: bold;
    position: relative;
    line-height: 50px;
    &:after {
      display: block;
      content: '';
      bottom: 0px;
      position: absolute;
      left: 0;
      width: 50px;
      height: 5px;
      background-color: #fdc900;
    }
  }
  &-tips {
    margin: 30px 0;
    line-height: 25px;
    font-size: 14px;
    color: #666;
    width: 80%;
  }
  &-btn {
    width: 168px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    background-color: #fdc900;
    color: #ffffff;
    text-align: center;
    display: block;
    font-size: 16px;
    border-radius: 5px;
    &:hover {
      background-color: #000;
    }
  }
  &-name {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-content {
    font-size: 14px;
    color: #666;
    line-height: 25px;
    height: 75px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  &-link {
    font-weight: bold;
    line-height: 25px;
    font-size: 16px;
    text-decoration: none;
    color: #fdc900;
  }
}
.cases {
  background-color: #051829;
  padding: 50px 0;
  &-title {
    font-size: 28px;
    font-weight: bold;
    position: relative;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    &:after {
      display: block;
      content: '';
      width: 50px;
      height: 5px;
      margin: 0 auto;
      background-color: #fdc900;
    }
  }
  &-tips {
    margin: 30px 0;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
.clients {
  padding: 40px 0;
  &-img {
    border: 3px solid #b7b7b7;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    &:hover {
      border-color: #fdc900;
    }
  }
}
.message {
  background: url('../static/images/home-message-bg.jpg') no-repeat center;
  background-size: contain;
  height: 670px;
  padding: 40px 0;
  &-box {
    width: 358px;
    height: 352px;
    margin: 65px 0 0 100px;
    color: #fff;
    padding: 40px;
  }
  &-title {
    font-size: 28px;
    font-weight: bold;
    position: relative;
    line-height: 50px;
    margin-bottom: 40px;
    &:after {
      display: block;
      content: '';
      bottom: -20px;
      position: absolute;
      left: 0;
      width: 70px;
      height: 5px;
      background-color: #fdc900;
    }
  }
  &-tips {
    line-height: 25px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  &-list {
    line-height: 40px;
    font-size: 14px;
    p {
      background: url('../static/images/tel.png') no-repeat left center;
      padding-left: 40px;
      background-size: 20px;
      &:nth-child(2) {
        background-image: url('../static/images/email.png');
      }
      &:nth-child(3) {
        background-image: url('../static/images/address.png');
      }
    }
  }
  &-form {
    margin-top: 65px;
    color: #ffffff;
    width: 450px;
    /deep/ .el-form-item__label {
      color: #fff;
      font-size: 16px;
    }
  }
}
.news {
  padding: 60px 0;
  &-list {
    margin-top: 40px;
  }
  &-item {
    border: 1px solid #cdcdcd;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  &-wrap {
    padding: 20px 30px;
  }
  &-date {
    color: #8a8a8a;
    line-height: 25px;

    i {
      color: #fdc900;
    }
  }
  &-name {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  &-content {
    line-height: 25px;
    font-size: 14px;
    color: #666;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    height: 50px;
    overflow: hidden;
  }
}
</style>
