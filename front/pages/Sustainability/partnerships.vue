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
    <section v-if="isLoading" class="partnerships">
      <div class="container">
        <h2>
          {{ sub_name }}
        </h2>
        <div class="list">
          <div v-for="item in solutionList" :key="item._id" class="item">
            <el-row gutter="30">
              <el-col :span="6">
                <img :src="'http://www.membzone.com/' + item.img" alt="" />
              </el-col>
              <el-col :span="18">
                <div class="text">
                  <h3>
                    {{ item.name }}
                  </h3>
                  <div v-html="item.intro"></div>
                </div>
              </el-col>
            </el-row>
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
      sub_name: '',
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
          const partnerships = this.solutionTypeList.filter(
            (item) => item.name === 'Our Partnerships'
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
        .get('/sustainability', { params: { typeId: this.typeId } })
        .then((result) => {
          this.solutionList = result.data
          this.isLoading = true
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
.partnerships {
  margin: 100px 0;
  .container {
    width: 770px;
    margin: 0 auto;
    h2 {
      font-weight: normal;
      margin-bottom: 60px;
    }
    img {
      width: 100%;
      height: auto;
    }
    .list .item + .item {
      margin-top: 35px;
      padding-top: 35px;
      border-top: 1px solid #00838a;
    }
    .text {
      h3 {
        font-size: 24px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
