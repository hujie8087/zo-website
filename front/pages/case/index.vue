<template>
  <div class="case">
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/case">Case</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="category-navigation">
        <nuxt-link
          v-for="caseType in caseTypeList"
          :key="caseType.id"
          :to="'case?type=' + caseType.id"
        >
          {{ caseType.name }}
        </nuxt-link>
      </div>
      <div class="case-list">
        <el-row :gutter="50">
          <el-col
            v-for="item in caseList"
            :key="item.id"
            :span="8"
            class="item"
          >
            <div style="position: relative">
              <img :src="item.imgUrl" alt="" srcset="" />
              <nuxt-link :to="'/case/' + item.id">
                <div class="main">
                  <div class="title">
                    {{ item.title }}
                  </div>
                  <div class="content">
                    {{ item.content }}
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
      caseTypeList: [
        {
          name: '经典案例',
          id: 100,
        },
        {
          name: '热门案例',
          id: 101,
        },
      ],
      caseList: [],
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
          this.caseList = result.data
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
      .title {
        margin-bottom: 20px;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
      }
      .content {
        line-height: 25px;
        font-size: 14px;
        color: #666;
        height: 75px;
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
