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
              <a :href="'/market/' + market._id" target="_blank">
                <img
                  class="markets-maxImg"
                  :src="'http://www.membzone.com/' + market.min_img"
                />
                <div class="markets-content">
                  <span class="markets-name">
                    {{ market.name }}
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div
            slot="pagination"
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
          class="swiperWrap swiperBox products-swiper"
        >
          <div class="swiper-wrapper">
            <div v-for="item in products" :key="item.src" class="swiper-slide">
              <div class="product-content">
                {{ filterHtml(item.goods_content) }}
              </div>
              <img
                class="product-minImg"
                :src="item.goods_img ? item.goods_img : noImg"
              />
              <nuxt-link :to="'/products/' + item._id" class="product-title">{{
                item.goods_name
              }}</nuxt-link>
            </div>
          </div>
          <div class="prev-button swiper-button swiper-button-prev"></div>
          <div class="next-button swiper-button swiper-button-next"></div>
        </div>
      </div>
    </section>
    <section class="service">
      <div class="container">
        <el-row>
          <el-col :span="8">
            <div class="service-title">Global reach, local focus</div>
            <div class="service-tips">
              Join our family of employees, who make sustainable and positive
              impacts in communities around the world.Since 1970, our
              innovations have helped to improve the quality of life for
              millions of people. Today, 19000 employees across more than 30
              countries work in our four divisions: Polyurethanes, Advanced
              Materials, Performance Products, and Textile Effects.
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
                    <img
                      class="service-minImg"
                      :src="item.page_img ? item.page_img : noImg"
                    />
                  </el-col>
                  <el-col :span="16">
                    <div class="service-name">
                      {{ item.classify_name }}
                    </div>
                    <div class="service-content">
                      {{ filterHtml(item.classify_intro) }}
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
    <section class="classify">
      <div class="container">
        <el-row :gutter="20">
          <el-col v-for="item in classifyList" :key="item.id" :span="6">
            <div class="classify-img">
              <img :src="'http://www.membzone.com/' + item.classify_img" />
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
                <p>(615) 741-2286</p>
                <p>admat_apac@membzone.com</p>
                <p>Americas Anne Bevis</p>
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
          <el-col v-for="item in newsList" :key="item._id" :span="8">
            <div class="news-item">
              <nuxt-link :to="'/news/' + item._id">
                <img
                  :src="item.news_img ? item.news_img : noImg"
                  :alt="item.name"
                />
                <div class="news-wrap">
                  <div class="news-date">
                    <i class="el-icon-time el-icon"></i>{{ item.create_date }}
                  </div>
                  <div class="news-name">
                    {{ item.news_title }}
                  </div>
                  <div class="news-content">
                    {{ filterHtml(item.news_content) }}
                  </div>
                </div></nuxt-link
              >
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
      swiperOption: {},
      productOption: {},
      banners: [],
      marketsList: [],
      products: [],
      initStatus: false,
      services: [],
      caseList: [],
      classifyList: [],
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
      noImg: require('../static/images/no-img.png'),
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
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
      this.swiperOption = {
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
      }
      this.productOption = {
        loop: true,
        slidesPerView: 1, // 一页显示几个
        spaceBetween: 0, // 间隔
        autoplay: {
          // 自动轮播
          delay: 5000,
        },
        navigation: {
          nextEl: '.next-button',
          prevEl: '.prev-button',
        },
      }
      this.initStatus = true // 渲染swiper
    })
  },
  methods: {
    getData() {
      this.$http
        .get('/banner/home')
        .then((result) => {
          this.banners = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/markets/homeList')
        .then((result) => {
          this.marketsList = result.data
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/products/homeList')
        .then((result) => {
          this.products = result.data
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
      // this.$http
      //   .get('/getHomeCase')
      //   .then((result) => {
      //     this.caseList = result.data
      //   })
      //   .catch((err) => {
      //     this.$message.error(err)
      //   })
      this.$http
        .get('/classify/homeList')
        .then((result) => {
          this.classifyList = result.data.classifyList
          this.services = result.data.servicesList
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/news/homeList')
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
          this.$http
            .post('/message/create', this.homeForm)
            .then((result) => {
              if (result.code === 0) {
                this.$message.success(result.message)
                this.$refs[formName].resetFields()
              } else {
                this.$message.error('Failed to leave a message')
              }
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.markets {
  margin: -180px 0 0px;
  position: relative;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 60px 0;
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
    max-height: 140px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    overflow: hidden;
    width: 100%;
  }
  &-minImg {
    border-bottom: 4px solid #fdc900;
    display: inline-block;
    margin-right: 40px;
    width: 70px;
  }
  &-title {
    line-height: 48px;
    color: #fdc900;
    font-size: 18px;
    font-weight: bold;
    vertical-align: top;
    &:hover {
      text-decoration: underline;
    }
  }
  .swiper-button {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: #333333;
    top: auto;
    bottom: 40px;
    &:hover {
      background-color: #fdc900;
    }
    &:after {
      color: #ffffff;
      font-size: 30px;
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
  &-minImg {
    width: 60px;
    height: 60px;
  }
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
.classify {
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
  background-size: 1920px;
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
    &:hover {
      .news-name {
        color: #fdc900;
      }
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
