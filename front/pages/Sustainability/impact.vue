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
          ><a href="/sustainability">sustainability</a></el-breadcrumb-item
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
    <section class="impact">
      <div class="container">
        <div class="select">
          <label for="">Find By:</label>
          <el-select v-model="textTypeId" @change="selectHandle">
            <el-option label="All Categories" value=""> </el-option>
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="item.text_type_id"
            >
            </el-option>
          </el-select>
        </div>
        <div v-loading="isLoading" class="list">
          <el-row :gutter="30">
            <el-col
              v-for="item in solutionList"
              :key="item._id"
              :span="8"
              class="item"
            >
              <div class="post-item">
                <div class="text">
                  <h5>
                    {{ setType(item.text_type_id) }}
                  </h5>
                  <h2>
                    {{ item.t_title }}
                  </h2>
                  <p>
                    {{ item.t_intro }}
                  </p>
                </div>
                <nuxt-link :to="'/sustainability/' + item._id"
                  >View Article</nuxt-link
                >
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
      textTypeId: '',
      solutionTypeList: [],
      solutionList: [],
      options: [],
      isLoading: true,
      pageParams: {
        currentPage: 1,
        pageSize: 9,
      },
      total: 0,
    }
  },
  created() {
    this.$http
      .get('/textType')
      .then((result) => {
        this.options = result.data
      })
      .catch((err) => {
        this.$message.error(err)
      })
    this.getDate()
  },
  methods: {
    getDate() {
      this.$http
        .get('/sustainability/typeList')
        .then((result) => {
          this.solutionTypeList = result.data
          const partnerships = this.solutionTypeList.filter(
            (item) => item.name === 'Our Impact'
          )[0]
          this.sub_name = partnerships.sub_name
          this.typeId = partnerships._id
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
        .get('/textI', {
          params: { typeId: this.textTypeId, ...this.pageParams },
        })
        .then((result) => {
          this.solutionList = result.data.list
          this.total = result.data.total
          this.isLoading = false
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    setType(val) {
      return this.options.filter((item) => item.text_type_id === val)[0].name
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val
      this.getListDate()
    },
    selectHandle(val) {
      this.textTypeId = val
      this.getDate()
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
.impact {
  margin: 50px 0;
  .select {
    margin-bottom: 30px;
    font-size: 18px;
  }
  .post-item {
    display: block;
    background: #fff;
    box-shadow: 0 24px 32px 0 rgba(102, 102, 102, 0.1);
    padding: 39px 40px 26px;
    margin-bottom: 30px;
    -moz-transition: background 0.2s ease-in-out;
    -o-transition: background 0.2s ease-in-out;
    -webkit-transition: background 0.2s ease-in-out;
    transition: background 0.2s ease-in-out;
    &:hover {
      text-decoration: none;
      background: #00838a;
      * {
        color: #fff;
      }
    }
    .text {
      margin-bottom: 50px;
      min-height: 300px;
    }
    h5 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0;
      margin-bottom: 20px;
      transition: color 0.2s ease-in-out;
      color: #00838a;
    }
    h2 {
      color: #000;
      font-size: 24px;
      font-weight: 700;
      text-transform: none;
      transition: color 0.2s ease-in-out;
      margin-bottom: 31px;
    }
    p {
      color: #000;
      transition: color 0.2s ease-in-out;
    }
    a {
      font-size: 14px;
      font-weight: 500;
      color: #910028;
      transition: color 0.2s ease-in-out;
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
