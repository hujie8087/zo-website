<template>
  <div class="case">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/markets">Markets</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="category-navigation">
        <el-radio-group v-model="typeId" @change="marketsTypeChange">
          <el-radio-button label="">All markets</el-radio-button>
          <el-radio-button
            v-for="marketsType in marketsTypeList"
            :key="marketsType._id"
            :label="marketsType.type_id"
            >{{ marketsType.title }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="case-list">
        <el-row :gutter="50">
          <el-col
            v-for="item in marketsList"
            :key="item.id"
            :span="8"
            class="item"
          >
            <div style="position: relative">
              <img
                :src="'http://www.membzone.com/' + item.min_img"
                alt=""
                :onerror="errorImage"
              />
              <div class="name">
                {{ item.name }}
              </div>
              <nuxt-link :to="'/markets/' + item._id">
                <div class="main">
                  <div class="title">
                    {{ item.name }}
                  </div>
                  <div class="content">
                    {{ filterHtml(item.content) }}
                  </div>
                </div>
              </nuxt-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="total,prev, pager, next"
        :current-page.sync="pageParams.currentPage"
        :page-size="pageParams.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
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
        title: 'CASES',
      },
      marketsTypeList: [],
      marketsList: [],
      pageParams: {
        currentPage: 1,
        pageSize: 6,
      },
      typeId: '',
      total: 0,
      errorImage: require('../../static/images/banner/news-banner.jpg'),
    }
  },
  created() {
    this.$http
      .get('/banner?banner_id=3')
      .then((result) => {
        this.bannerOptions = {
          bannerImg: result.data.banner_url + result.data.banner_img,
          title: result.data.banner_title,
        }
      })
      .catch((err) => {
        this.$message.error(err)
      })
    this.$http
      .get('/marketsType')
      .then((result) => {
        this.marketsTypeList = result.data
      })
      .catch((err) => {
        this.$message.error(err)
      })
    this.getMarketsList()
  },
  methods: {
    getMarketsList() {
      this.$http
        .get(
          `/markets?pageSize=${this.pageParams.pageSize}&pageIndex=${this.pageParams.currentPage}&typeId=${this.typeId}`
        )
        .then((result) => {
          this.marketsList = result.data.list
          this.total = result.data.total
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val
      this.getMarketsList()
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
    marketsTypeChange(val) {
      this.typeId = val
      this.pageParams.currentPage = 1
      this.getMarketsList()
    },
  },
}
</script>

<style lang="scss" scoped>
.category-navigation {
  width: 100%;
  font-size: 16px;
  margin: 40px 0;
  overflow: hidden;
  /deep/ .el-radio-button__inner {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    text-align: center;
    float: left;
    color: #333333;
    background-color: #fdc900;
    border: 0;
    margin: 0 20px 20px 0;
    border-radius: 5px;
    text-decoration: none;
    &:hover {
      color: #fff;
      background-color: #333333;
    }
  }
  .is-active /deep/ .el-radio-button__inner {
    color: #fff;
    background-color: #333333;
  }
  .nuxt-link-exact-active {
    background-color: #333333;
    color: #ffffff;
  }
}
.case-list {
  .item {
    margin-bottom: 30px;
    position: relative;
    height: auto;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .name {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
      font-size: 16px;
      color: #000;
      background-color: #fdc900;
    }
    .main {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      opacity: 0;
      display: flex;
      padding: 20px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: 0.3s all;
      background-color: rgba($color: #fdc900, $alpha: 0.8);
      .title {
        margin-bottom: 20px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      .content {
        line-height: 25px;
        font-size: 14px;
        color: #666;
        height: 75px;
        overflow: hidden;
        max-width: 700px;
      }
    }
    &:hover {
      .main {
        opacity: 1;
      }
    }
    a {
      display: block;
    }
  }
}
.pagination {
  text-align: center;
  margin: 50px 0;
  /deep/ button,
  /deep/ span:not([class*='suffix']) {
    font-size: 16px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
  }
  /deep/ .el-pager li {
    width: 40px;
    margin: 0 8px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
}
</style>
