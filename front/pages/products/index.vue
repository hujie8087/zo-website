<template>
  <div>
    <default-banner
      :img-url="bannerOptions.bannerImg"
      :title="bannerOptions.title"
    />
    <div class="container">
      <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/products">Products</a></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="category-navigation">
        <nuxt-link
          v-for="productType in productTypeList"
          :key="productType.id"
          :to="'products?type=' + productType.id"
        >
          {{ productType.name }}
        </nuxt-link>
      </div>

      <div class="product">
        <el-row :gutter="50">
          <el-col
            v-for="item in products"
            :key="item.id"
            :span="8"
            class="product-item"
          >
            <nuxt-link :to="'/products/' + item.id">
              <img class="product-maxImg" :src="item.maxImg" />
              <div class="product-content">
                <img class="product-minImg" :src="item.minImg" />
                <span class="product-name">
                  {{ item.name }}
                </span>
              </div>
            </nuxt-link>
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
  data() {
    return {
      bannerOptions: {
        bannerImg: require('../../static/images/banner/news-banner.jpg'),
        title: 'PRODUCTS CENTER',
      },
      typeId: '',
      productTypeList: [
        {
          name: '产品类型1',
          id: 100,
        },
        {
          name: '产品类型2',
          id: 101,
        },
      ],
      products: [],
      pageParams: {
        currentPage: 1,
        pageSize: 6,
      },
      total: 0,
    }
  },
  created() {
    this.typeId = this.$route.query.type ? this.$route.query.type : ''
    this.getDate()
  },
  methods: {
    getDate() {
      this.$http.get('/getProducts').then((result) => {
        this.products = result.data
        this.initStatus = true
        this.total = result.total
      })
    },

    handleCurrentChange(val) {
      this.pageParams.currentPage = val
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
  margin: 60px 0 40px;
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
