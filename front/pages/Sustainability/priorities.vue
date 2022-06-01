<template>
  <div class="news">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
      cus-class="height-auto"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/sustainability">Sustainability</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="category-navigation">
        <nuxt-link
          v-for="item in solutionTypeList"
          :key="item.id"
          :to="'/sustainability' + item.url"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
    <section v-if="isLoading" class="summaries follow">
      <div class="container">
        <h2>
          {{ solutionList[0].name }}
        </h2>
        <p v-html="solutionList[0].intro"></p>
      </div>
    </section>
    <section v-if="isLoading" class="governance follow">
      <div class="container">
        <h2>
          {{ solutionList[1].name }}
        </h2>
        <p v-html="solutionList[1].intro"></p>
        <el-row class="img-list" :gutter="30">
          <el-col
            v-for="item in imgList"
            :key="item._id"
            :span="4"
            class="img-item"
          >
            <img :src="'http://www.membzone.com/' + item.img" alt="" />
            <h3>{{ item.name }}</h3>
            <p>{{ item.intro }}</p>
          </el-col>
        </el-row>
      </div>
    </section>
    <section>
      <div v-if="isLoading" class="sustainability-item">
        <div class="container">
          <h2>
            {{ solutionList[2].name }}
          </h2>
          <p v-html="solutionList[2].intro"></p>
          <div class="module-content">
            <div class="flex-row flex-3-col">
              <div
                v-for="(item, index) in targets"
                :key="item._id"
                class="column"
                :class="index === 3 ? 'column3' : ''"
              >
                <div class="target-item">
                  <div class="icon-wrapper">
                    <img :src="'http://www.membzone.com/' + item.img" alt="" />
                  </div>
                  <div class="text" v-html="item.detail"></div>
                </div>
                <div class="source">
                  {{ item.intro }}
                </div>
              </div>
            </div>
          </div>
        </div>
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
        title: 'SOLUTION CENTER',
      },
      typeId: '',
      solutionTypeList: [],
      solutionList: [],
      isLoading: false,
      imgList: [],
      targets: [],
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    getDate() {
      this.$http
        .get('/sustainability/typeList')
        .then((result) => {
          this.solutionTypeList = result.data
          this.typeId = this.solutionTypeList.filter(
            (item) => item.sub_name === 'Our Priorities'
          )[0]._id
          this.bannerOptions = {
            bannerImg:
              'http://www.membzone.com/' + this.solutionTypeList[0].banner,
            title: 'Sustainability',
          }
          this.getListDate()
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    getListDate() {
      this.$http
        .get('/sustainability', { params: { typeId: this.typeId } })
        .then((result) => {
          this.solutionList = result.data
          this.isLoading = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
      this.$http
        .get(`/imgPic`, {
          params: { type_id: this.typeId, _id: '62966653bd842f0cd037022c' },
        })
        .then((result) => {
          this.imgList = result.data.imgList
          this.targets = result.data.targets
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val
      this.getNewsList()
    },
  },
}
</script>

<style lang="scss" scoped>
.category-navigation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin: 10px 0;
  a {
    display: block;
    height: 40px;
    text-align: center;
    float: left;
    padding: 0 10px;
    color: #333333;
    background-color: #fdc900;
    margin-right: 30px;
    border-radius: 5px;
    text-decoration: none;
    &:hover {
      color: #fff;
      background-color: #333333;
    }
  }
  .nuxt-link-exact-active {
    background-color: #333333;
    color: #ffffff;
  }
}
.sustainability-item {
  width: 100%;
  background-color: #00838a;
  position: relative;
  text-align: center;
  color: #ffffff;
  padding: 50px 0;
  p {
    padding: 0 15%;
    font-size: 16px;
  }
  .left-img {
    right: auto;
    left: 0;
  }
  h2 {
    margin-bottom: 20px;
  }
}
.sustain {
  padding: 50px 0;
  .container {
    background-color: #00838a;
    padding: 50px;
    margin-top: -60px;
    color: #fff;
    /deep/ * {
      color: #fff !important;
    }
  }
  h2 {
    margin-bottom: 20px;
  }
  .img-list {
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
.follow {
  background-color: #00838a;
  color: #fff;
  text-align: center;
  padding: 60px 0;
  h2 {
    margin-bottom: 20px;
  }
  > p {
    width: 800px;
    margin: 0 auto;
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
    border-radius: 5px;
    &:hover {
      background-color: #000;
    }
  }
}
.partnering {
  padding: 100px 0;
  background: #e7e7e6;
  position: relative;
  color: #000;
}
.summaries {
  background-color: #fff;
  color: #000;
}
.governance {
  background-color: #fff;
  color: #000;
  padding: 50px 0 0;
}
.nations {
  padding: 50px 0;
  background-color: #e7e7e6;
  .container {
    text-align: center;
    color: #000;
    /deep/ * {
      color: #000 !important;
    }
    & > p {
      max-width: 750px;
      margin: 0 auto;
    }
  }
  h2 {
    margin-bottom: 20px;
  }
}
.img-list {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  .img-item {
    margin-bottom: 20px;
    h3 {
      line-height: 40px;
    }
    p {
      min-height: 120px;
    }
  }
}
.module-content {
  margin-top: 50px;
  .flex-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    .column3 {
      grid-column: 1 / 4;
    }
    .source {
      text-align: left;
      font-size: 12px;
      margin-top: 10px;
    }
    .target-item {
      display: flex;
      background: #006166;
      .icon-wrapper {
        width: 170px;
        height: 177px;
        background: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .text {
        width: calc(100% - 170px);
        padding: 41px 10px 0 30px;
        text-align: left;
      }
    }
  }
}
</style>
