<template>
  <div class="about">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-row class="company">
        <el-col :span="12">
          <div class="name">
            <span>{{ aboutInfo.name }}</span>
          </div>
          <div class="content">
            <span v-html="aboutInfo.content"></span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="show-img">
            <img :src="aboutInfo.maxImg" alt="" />
          </div>
        </el-col>
      </el-row>
    </div>
    <section
      :style="
        'background:url(' + aboutInfo.solution.bgImgUrl + ') no-repeat center'
      "
    >
      <div class="solution">
        <div class="title">
          <span>{{ aboutInfo.solution.title1 }}</span>
          <span style="color: #fdc900">{{ aboutInfo.solution.title2 }}</span>
        </div>
        <div class="link">
          <nuxt-link to="/solutions">MORE</nuxt-link>
        </div>
      </div>
    </section>
    <div class="container">
      <el-row class="list">
        <el-col :span="6">
          <div class="head">
            <div class="name">
              {{ aboutInfo.solution.listHead }}
            </div>
            <div>
              {{ aboutInfo.solution.listContent }}
            </div>
          </div>
        </el-col>
        <el-col
          v-for="item in aboutInfo.solution.list"
          :key="item.id"
          :span="6"
        >
          <div class="item">
            <img :src="item.minImg" alt="" />
            <div class="name">
              {{ item.name }}
            </div>
            <div class="content">
              {{ item.content }}
            </div>
            <nuxt-link :to="'/solutions/' + item.id">MORE</nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <section class="honors">
      <div class="container">
        <el-row type="flex" :gutter="30">
          <el-col
            v-for="item in aboutInfo.honors"
            :key="item.id"
            :span="6"
            class="item"
          >
            <img :src="item.maxImg" alt="" />
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
      bannerOptions: {
        bannerImg: require('../../static/images/banner/news-banner.jpg'),
        title: 'ABOUT US',
      },
      aboutInfo: {
        solution: {},
      },
    }
  },
  created() {
    this.getAboutInfo()
  },
  methods: {
    getAboutInfo() {
      this.$http
        .get('/getAboutDetail')
        .then((result) => {
          this.aboutInfo = result.data
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
.company {
  margin: 70px 0;
  .name {
    padding-bottom: 20px;
    width: 140px;
    color: #051829;
    font-size: 26px;
    font-weight: bold;
    line-height: 30px;
    border-bottom: 3px solid #fdc900;
    margin-bottom: 20px;
  }
  .content {
    height: auto;
    line-height: 25px;
    font-size: 14px;
    color: #666;
    padding-right: 40px;
  }
  .show-img {
    border: 2px solid #fdc900;
    width: 466px;
    height: 466px;
    position: relative;
    float: right;
    img {
      position: absolute;
      right: 50px;
      top: 60px;
    }
  }
}
.solution {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 315px;
  .title {
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .link {
    a {
      color: #fff;
      width: 150px;
      height: 40px;
      line-height: 36px;
      text-align: center;
      border: 2px solid #fdc900;
      border-radius: 4px;
      display: block;
      &:hover {
        background-color: #fdc900;
      }
    }
  }
}
.list {
  margin: 100px 0;
  .head {
    border: 2px solid #fdc900;
    padding: 50px;
    line-height: 25px;
    font-size: 14px;
    color: #666;
    .name {
      color: #333333;
      font-size: 30px;
      font-weight: bold;
      line-height: 34px;
      margin-bottom: 20px;
    }
  }
  .item {
    padding: 0 20px;
    img {
      display: block;
      margin: 0 auto 20px;
      width: 60px;
    }
    .name {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
    }
    .content {
      line-height: 25px;
      font-size: 14px;
      color: #666;
      height: 50px;
      margin-bottom: 20px;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      overflow: hidden;
    }
    a {
      display: block;
      color: #fdc900;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
  }
}
.honors {
  background-color: #f6f6f6;
  padding: 50px 0;
  .item {
    img {
      display: block;
      width: 100%;
      height: auto;
      border: 2px solid #b7b7b7;
    }
    &:hover {
      img {
        border-color: #fdc900;
      }
    }
  }
}
</style>
