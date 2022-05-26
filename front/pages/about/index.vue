<template>
  <div class="about">
    <default-banner :img-url="aboutInfo.bannerImg" :title="aboutInfo.title" />
    <div class="container">
      <el-row class="company">
        <el-col :span="12">
          <div class="name">
            <span>{{ aboutInfo.title }}</span>
          </div>
          <div class="content">
            <h2>{{ aboutInfo.subtitle }}</h2>
            <h3>{{ aboutInfo.description }}</h3>
            <div v-html="aboutInfo.content"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="show-img">
            <div
              class="show-box"
              :style="
                'background: url(' +
                aboutInfo.aboutMaxImg +
                ') no-repeat center;'
              "
            ></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <section class="solution-main">
      <div class="solution">
        <div class="title">
          <span>Our one and only priority is the</span>
          <span style="color: #fdc900">customer satisfaction</span>
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
            <div class="name">Our Business Divisions</div>
            <div>
              Membzone is comprised of four divisions, each of which has
              in-depth expertise in specific chemistries and technologies and
              leading positions in the markets they serve.
            </div>
          </div>
        </el-col>
        <el-col v-for="item in classifyList" :key="item._id" :span="6">
          <div class="item">
            <img :src="'http://www.membzone.com/' + item.classify_img" alt="" />
            <div class="name">
              {{ item.classify_name }}
            </div>
            <div class="content">
              {{ filterHtml(item.classify_intro) }}
            </div>
            <nuxt-link to="/">MORE</nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <section class="honors">
      <div class="container">
        <el-row type="flex" :gutter="30">
          <el-col
            v-for="item in classifyList"
            :key="item.id"
            :span="6"
            class="item"
          >
            <img :src="'http://www.membzone.com/' + item.classify_img" alt="" />
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
      aboutInfo: {},
      classifyList: [],
    }
  },
  created() {
    this.getAboutInfo()
  },
  methods: {
    getAboutInfo() {
      this.$http
        .get('/about')
        .then((result) => {
          const { aboutInfo, classifyList } = result.data
          this.aboutInfo = aboutInfo
          this.classifyList = classifyList
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    filterHtml(val) {
      return val.replace(/<.*?>/g, '')
    },
  },
}
</script>

<style lang="scss" scoped>
.company {
  margin: 70px 0;
  .name {
    padding-bottom: 20px;
    color: #051829;
    font-size: 26px;
    font-weight: bold;
    line-height: 30px;
    border-bottom: 3px solid #fdc900;
    margin-bottom: 20px;
    display: inline-block;
  }
  .content {
    height: auto;
    line-height: 25px;
    font-size: 14px;
    color: #666;
    padding-right: 40px;
    h2,
    h3 {
      margin-bottom: 10px;
    }
  }
  .show-img {
    border: 2px solid #fdc900;
    width: 466px;
    height: 466px;
    position: relative;
    float: right;
    .show-box {
      position: absolute;
      right: 50px;
      top: 60px;
      width: 526px;
      height: 350px;
      overflow: hidden;
    }
  }
}
.solution-main {
  background: url(../../static/images/background/about-bg.jpg) no-repeat center;
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
    margin-bottom: 40px;
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
