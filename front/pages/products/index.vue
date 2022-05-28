<template>
  <div>
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
      cus-class="height-auto"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/products">Products</a></el-breadcrumb-item
        >
      </el-breadcrumb>

      <el-form :inline="true" :model="formInline" class="form-inline">
        <el-form-item label="Product name">
          <el-input
            v-model="formInline.name"
            placeholder="Enter product name and view results below"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Market">
          <el-select v-model="formInline.market">
            <el-option label="All" value=""></el-option>
            <el-option
              v-for="item in marketsTypeList"
              :key="item._id"
              :label="item.title"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Division">
          <el-select v-model="formInline.division">
            <el-option label="All" value=""></el-option>
            <el-option
              v-for="item in divisionList"
              :key="item._id"
              :label="item.name"
              :value="item.division_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Search</el-button>
        </el-form-item>
      </el-form>
      <div class="product">
        <el-table :data="products" style="width: 100%">
          <el-table-column prop="goods_name" label="Products Name">
            <template slot-scope="scope">
              <nuxt-link :to="'/products/' + scope.row._id">
                {{ scope.row.goods_name }}
              </nuxt-link>
            </template>
          </el-table-column>
          <el-table-column prop="classify_id" label="Market(s)">
            <template slot-scope="scope">
              {{ setClassify(scope.row.classify_id) }}
            </template>
          </el-table-column>
          <el-table-column prop="division_id" label="Division">
            <template slot-scope="scope">
              {{ setDivision(scope.row.division_id) }}
            </template>
          </el-table-column>
        </el-table>
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
  data() {
    return {
      bannerOptions: {
        bannerImg: require('../../static/images/banner/news-banner.jpg'),
        title: 'PRODUCTS CENTER',
      },
      products: [],
      pageParams: {
        currentPage: 1,
        pageSize: 15,
      },
      marketsTypeList: [],
      divisionList: [],
      total: 0,
      formInline: {
        name: '',
        market: '',
        division: '',
      },
    }
  },
  created() {
    this.$http
      .get('/banner?banner_id=6')
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
    this.$http
      .get('/division')
      .then((result) => {
        this.divisionList = result.data
      })
      .catch((err) => {
        this.$message.error(err)
      })
    this.getDate()
  },
  methods: {
    getDate() {
      const params = {
        pageSize: this.pageParams.pageSize,
        pageIndex: this.pageParams.currentPage,
        ...this.formInline,
      }
      this.$http.get('/products', { params }).then((result) => {
        this.products = result.data.list
        this.initStatus = true
        this.total = result.data.total
      })
    },
    handleCurrentChange(val) {
      this.pageParams.currentPage = val
      this.getDate()
    },
    onSubmit() {
      this.getDate()
    },
    setClassify(val) {
      const market = this.marketsTypeList.filter((item) => item.type_id === val)
      if (market.length) {
        return market[0].title
      } else {
        return 'Products'
      }
    },
    setDivision(val) {
      const market = this.divisionList.filter(
        (item) => item.division_id === val
      )
      if (market.length) {
        return market[0].name
      } else {
        return ''
      }
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
.product {
  margin: 20px 0 40px;
  &-item {
    position: relative;
    margin-bottom: 30px;
  }
  &-title {
    font-size: 28px;
    font-weight: bold;
    color: #000;
    &:after {
      display: block;
      content: '';
      bottom: 10px;
      position: absolute;
      left: 0;
      width: 50px;
      height: 5px;
      background-color: #fdc900;
    }
  }
  &-tips {
    line-height: 25px;
    font-size: 14px;
    color: #666;
  }
  &-btn {
    float: right;
    width: 168px;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    background-color: #fdc900;
    color: #ffffff;
    text-align: center;
    display: block;
    font-size: 16px;
    border-radius: 5px;
    &:hover {
      background-color: #000;
    }
  }
  &-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 30px;
    line-height: 45px;
  }
  &-minImg {
    margin-right: 20px;
  }
  &-name {
    font-size: 16px;
    color: #fff;
    line-height: 45px;
    vertical-align: top;
    display: inline-block;
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
