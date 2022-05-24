<template>
  <div class="news">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/solution">Solution</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="category-navigation">
        <nuxt-link
          v-for="solutionType in solutionTypeList"
          :key="solutionType.id"
          :to="'solution?type=' + solutionType.id"
        >
          {{ solutionType.name }}
        </nuxt-link>
      </div>
      <el-row class="solution-list" :gutter="50">
        <el-col
          v-for="item in solutionList"
          :key="item.id"
          :span="12"
          class="item"
        >
          <el-row>
            <el-col :span="16">
              <div class="title">
                <nuxt-link :to="'/solutions/' + item.id">
                  {{ item.title }}
                </nuxt-link>
              </div>
              <div class="content">
                {{ item.content }}
              </div>
              <div class="link">
                <nuxt-link :to="'/solutions/' + item.id">MORE ></nuxt-link>
              </div></el-col
            >
            <el-col :span="8">
              <img :src="item.imgUrl" alt="" srcset="" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
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
        title: 'SOLUTION CENTER',
      },
      solutionTypeList: [
        {
          name: '成功方案',
          id: 100,
        },
        {
          name: '解决方案',
          id: 101,
        },
      ],
      solutionList: [],
      pageParams: {
        currentPage: 1,
        pageSize: 6,
      },
      total: 0,
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http
        .get('/getNewsList', { current: this.pageParams.currentPage })
        .then((result) => {
          this.solutionList = result.data
          this.initStatus = true
          this.total = result.total
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
  margin: 40px 0;
  a {
    display: block;
    width: 110px;
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
.solution-list {
  .item {
    .el-row {
      margin-bottom: 30px;
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 30px;
    }
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      a {
        color: #333333;
      }
      a:hover {
        color: #fdc900;
      }
    }
    .content {
      height: 50px;
      line-height: 25px;
      font-size: 14px;
      color: #666;
      max-width: 80%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      overflow: hidden;
      margin-bottom: 10px;
    }
    img {
      width: 100%;
      height: auto;
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
