<template>
  <div class="contact">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <el-breadcrumb
      class="container"
      separator="/"
      style="height: 50px; line-height: 50px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/contact">Contact</a></el-breadcrumb-item>
    </el-breadcrumb>
    <section>
      <div
        v-for="(item, index) in contactList"
        :key="item._id"
        class="contact-item"
      >
        <div
          :class="index % 2 ? 'left-img img' : 'img'"
          :style="'background: url(' + item.url + item.img + ') no-repeat;'"
        ></div>
        <el-row class="container">
          <el-col :sm="12" :md="10" :offset="index % 2 ? 14 : 0">
            <h2>
              {{ item.title }}
            </h2>
            <p>
              {{ item.intro }}
            </p>
            <nuxt-link :to="item.url">{{ item.btnText }}</nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="advanced">
      <div class="container">
        <h2>Advanced Materials</h2>
        <el-row>
          <el-col
            v-for="item in classifyList"
            :key="item.id"
            :span="12"
            class="item"
          >
            <h3>
              {{ item.classify_name }}
            </h3>
            <p>
              {{ item.sub_name }}
            </p>
            <nuxt-link :to="item.classify_url">{{
              item.classify_name
            }}</nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import DefaultBanner from '../../components/DefaultBanner.vue'
export default {
  components: { DefaultBanner },
  transition: 'fade',
  data() {
    return {
      bannerOptions: {},
      contactList: [],
      classifyList: [],
    }
  },
  created() {
    this.getContactInfo()
    this.$http
      .get('/banner?banner_id=5')
      .then((result) => {
        this.bannerOptions = {
          bannerImg: result.data.banner_url + result.data.banner_img,
          title: result.data.banner_title,
        }
      })
      .catch((err) => {
        this.$message.error(err)
      })
  },
  methods: {
    getContactInfo() {
      this.$http
        .get('/contact/getBanner')
        .then((result) => {
          const { bannerImg, url, title } = result.data
          console.log(url, bannerImg)
          this.bannerOptions = {
            title,
            bannerImg: url + bannerImg,
          }
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get('/contact/getList')
        .then((result) => {
          const { list, classifyList } = result.data
          this.contactList = list
          this.classifyList = classifyList
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
  .contact-info {
    margin: 30px 0;
  }
  .contact-item {
    width: 100%;
    position: relative;
    padding: 120px 0;
    .img {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: #333;
      background-position: 50% 50%;
    }
    .left-img {
      right: auto;
      left: 0;
    }
    h2 {
      margin-bottom: 20px;
    }
    a {
      color: #fff;
      border: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      display: block;
      background: #fdc900;
      display: inline-block;
      font-size: 14px;
      padding: 15px;
      font-weight: bold;
      margin-top: 30px;
      &:hover {
        background-color: #000;
      }
    }
  }
  .max-img {
    position: relative;
    margin-bottom: 30px;
    span {
      color: #fdc900;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.advanced {
  background-color: #e7e7e6;
  padding: 60px 0;
  h2 {
    margin-bottom: 30px;
  }
  .item {
    height: 160px;
    border-right: 1px solid #fdc900;
    margin-bottom: 60px;
    &:nth-child(2n) {
      border: 0;
      padding-left: 30px;
    }
    h3 {
      margin-bottom: 20px;
    }
    a {
      color: #fff;
      border: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      display: block;
      background: #fdc900;
      display: inline-block;
      font-size: 14px;
      padding: 15px;
      font-weight: bold;
      margin-top: 30px;
      &:hover {
        background-color: #000;
      }
    }
  }
}
</style>
