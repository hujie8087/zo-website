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
    <section>
      <div v-if="isLoading" class="sustainability-item">
        <div
          class="img"
          :style="
            'background: url(http://www.membzone.com/' +
            solutionList[0].img +
            ') no-repeat;'
          "
        ></div>
        <el-row class="container">
          <el-col :sm="12" :md="10">
            <h2>
              {{ solutionList[0].name }}
            </h2>
            <p v-html="solutionList[0].intro"></p>
            <nuxt-link :to="solutionList[0].url">{{
              solutionList[0].sub_name
            }}</nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="sustain">
      <div v-if="isLoading" class="container">
        <el-row>
          <el-col :span="12">
            <h2>
              {{ solutionList[1].name }}
            </h2>
            <p v-html="solutionList[1].intro"></p>
            <nuxt-link :to="solutionList[1].url">{{
              solutionList[1].sub_name
            }}</nuxt-link>
          </el-col>
        </el-row>
        <div class="img-list">
          <img
            v-for="url in solutionList[1].img.split(',')"
            :key="url"
            :src="'http://www.membzone.com/' + url"
            alt="View 2019 Report"
          />
        </div>
      </div>
    </section>
    <section class="follow">
      <div v-if="isLoading" class="container">
        <div class="follow-img">
          <img :src="'http://www.membzone.com/' + solutionList[2].img" alt="" />
        </div>
        <h2>
          {{ solutionList[2].name }}
        </h2>
        <p v-html="solutionList[2].intro"></p>
        <nuxt-link :to="solutionList[2].url">{{
          solutionList[2].sub_name
        }}</nuxt-link>
      </div>
    </section>
    <section>
      <div v-if="isLoading" class="sustainability-item">
        <div
          class="left-img img"
          :style="
            'background: url(http://www.membzone.com/' +
            solutionList[3].img +
            ') no-repeat;'
          "
        ></div>
        <el-row class="container">
          <el-col :sm="12" :md="10" :offset="14">
            <h2>
              {{ solutionList[3].name }}
            </h2>
            <p v-html="solutionList[3].intro"></p>
            <nuxt-link :to="solutionList[3].url">{{
              solutionList[3].sub_name
            }}</nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
    <section v-if="isLoading" class="partnering follow">
      <div class="container">
        <h2>
          {{ solutionList[4].name }}
        </h2>
        <p v-html="solutionList[4].intro"></p>
        <nuxt-link :to="solutionList[4].url">{{
          solutionList[4].sub_name
        }}</nuxt-link>
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
          this.typeId = this.solutionTypeList[0]._id
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
      console.log(this.typeId)
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
.sustainability-item {
  width: 100%;
  position: relative;
  padding: 120px 0;
  .img {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: #333;
    background-position: 50% 50%;
  }
  .left-img {
    right: auto;
    left: 0;
  }
  h2 {
    margin-bottom: 20px;
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
.sustain {
  background-color: #e7e7e6;
  padding: 50px 0;
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
  p {
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
  background: url('../../static/images/background/background_image3.jpg')
    no-repeat top center;
  position: relative;
  &:before {
    background-color: rgba(0, 131, 138, 0.7);
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
