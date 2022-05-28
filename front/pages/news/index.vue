<template>
  <div class="news">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/news">News</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="category-navigation">
        <el-radio-group v-model="typeId" @change="newsTypeChange">
          <el-radio-button
            v-for="newsType in newsTypeList"
            :key="newsType._id"
            :label="newsType.type_id"
            >{{ newsType.title }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="news-list">
        <div v-for="news in newsList" :key="news._id" class="item">
          <el-row>
            <el-col :span="16">
              <div class="title">
                <nuxt-link :to="'/news/' + news._id">{{
                  news.news_title
                }}</nuxt-link>
              </div>
              <div class="date">
                {{ news.create_date }}
              </div>
              <div class="content">
                {{ filterHtml(news.news_content) }}
              </div>
              <div class="link">
                <nuxt-link :to="'/news/' + news._id">MORE ></nuxt-link>
              </div></el-col
            >
            <el-col :span="8">
              <img :src="news.news_img" alt="" />
            </el-col>
          </el-row>
        </div>
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
import { setFormat } from '../../utils/tools'
import DefaultBanner from '../../components/DefaultBanner.vue'

export default {
  components: { DefaultBanner },
  transition: 'fade',
  data() {
    return {
      bannerOptions: {},
      newsTypeList: [],
      newsList: [],
      typeId: '',
      pageParams: {
        currentPage: 1,
        pageSize: 6,
      },
      total: 0,
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
      .get('/newsType')
      .then((result) => {
        this.newsTypeList = result.data
      })
      .catch((err) => {
        this.$message.error(err)
      })
    this.typeId = this.$route.query.typeId ? this.$route.query.typeId : ''
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http
        .get(
          `/news?pageSize=${this.pageParams.pageSize}&pageIndex=${this.pageParams.currentPage}&typeId=${this.typeId}`
        )
        .then((result) => {
          this.newsList = result.data.list.map((item) => {
            item.date = setFormat(item.date)
            return item
          })
          this.total = result.data.total
          this.initStatus = true
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val
      this.getNewsList()
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
    newsTypeChange(val) {
      this.typeId = val
      this.pageParams.currentPage = 1
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
  margin: 40px 0;
  a {
    display: block;
    width: auto;
    padding: 0 10px;
    height: 40px;
    text-align: center;
    float: left;
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
.news-list {
  .item {
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 30px;
    .title {
      margin-bottom: 20px;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      a {
        color: #333;
        &:hover {
          color: #fdc900;
        }
      }
    }
    .date {
      margin-bottom: 10px;
      width: 160px;
      color: #b7b7b7;
      font-size: 14px;
    }
    .content {
      line-height: 25px;
      font-size: 14px;
      color: #666;
      height: 75px;
      max-width: 700px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .link a {
      font-size: 16px;
      color: #fdc900;
      font-weight: bold;
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
