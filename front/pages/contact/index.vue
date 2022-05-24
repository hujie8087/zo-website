<template>
  <div class="contact">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/contact">Contact</a></el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="contact-info">
        <el-col :span="12">
          <div class="list">
            <p>{{ contactInfo.tel }}</p>
            <p>{{ contactInfo.email }}</p>
            <p>{{ contactInfo.address }}</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="show-img">
            <img :src="contactInfo.addressMap" alt="" />
          </div>
        </el-col>
      </el-row>
      <div class="max-img">
        <img :src="contactInfo.maxImgUrl" alt="" />
        <span>
          {{ contactInfo.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultBanner from '../../components/DefaultBanner.vue'
export default {
  components: { DefaultBanner },
  transition: 'fade',
  data() {
    return {
      bannerOptions: {
        bannerImg: require('../../static/images/banner/news-banner.jpg'),
        title: 'ABOUT US',
      },
      contactInfo: {},
    }
  },
  created() {
    this.getContactInfo()
  },
  methods: {
    getContactInfo() {
      this.$http
        .get('/getContactDetail')
        .then((result) => {
          this.contactInfo = result.data
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
  .list {
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 264px;
    p {
      background: url('../../static/images/tel.png') no-repeat left center;
      padding-left: 50px;
      background-size: 30px;
      &:nth-child(2) {
        background-image: url('../../static/images/email.png');
      }
      &:nth-child(3) {
        background-image: url('../../static/images/address.png');
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
</style>
