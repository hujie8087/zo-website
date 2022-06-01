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
    <section v-if="isLoading" class="partnering follow">
      <div class="container">
        <h2>
          {{ solutionList[0].name }}
        </h2>
        <p v-html="solutionList[0].intro"></p>
        <nuxt-link :to="solutionList[0].url">{{
          solutionList[0].sub_name
        }}</nuxt-link>
      </div>
    </section>
    <section class="sustain">
      <div v-if="isLoading" class="container">
        <el-row>
          <el-col :span="8">
            <div class="img-list">
              <img
                v-for="url in solutionList[1].img.split(',')"
                :key="url"
                :src="'http://www.membzone.com/' + url"
                alt="View 2019 Report"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <p v-html="solutionList[1].intro"></p>
            <nuxt-link :to="solutionList[1].url">{{
              solutionList[1].sub_name
            }}</nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
    <section>
      <div v-if="isLoading" class="sustainability-item">
        <div
          class="left-img img"
          :style="
            'background: url(http://www.membzone.com/' +
            solutionList[2].img +
            ') no-repeat;'
          "
        ></div>
        <el-row class="container">
          <el-col :sm="12" :md="10" :offset="14">
            <h2>
              {{ solutionList[2].name }}
            </h2>
            <p v-html="solutionList[2].intro"></p>
          </el-col>
        </el-row>
      </div>
    </section>
    <section v-if="isLoading" class="summaries follow">
      <div class="container">
        <h2>
          {{ solutionList[3].name }}
        </h2>
        <p v-html="solutionList[3].intro"></p>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer"
            >Membzone Product Safety Summary – Bisphenol-A-Based Epoxy Resin –
            Semi-Solid</a
          >
        </p>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer"
            >Membzone Product Safety Summary - Aniline</a
          >
        </p>
      </div>
    </section>
    <section class="follow">
      <div v-if="isLoading" class="container">
        <div class="follow-img">
          <img :src="'http://www.membzone.com/' + solutionList[4].img" alt="" />
        </div>
        <h2>
          {{ solutionList[4].name }}
        </h2>
        <p v-html="solutionList[4].intro"></p>
      </div>
    </section>
    <section class="nations">
      <div v-if="isLoading" class="container">
        <h2>
          {{ solutionList[5].name }}
        </h2>
        <p v-html="solutionList[5].intro"></p>
        <nuxt-link :to="solutionList[5].url">{{
          solutionList[5].sub_name
        }}</nuxt-link>
        <div class="img-list">
          <img
            v-for="url in solutionList[5].img.split(',')"
            :key="url"
            :src="'http://www.membzone.com/' + url"
            alt="View 2019 Report"
          />
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
            (item) => item.sub_name === 'Our Commitments'
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
  padding: 50px 0;
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
  background: #e7e7e6;
  position: relative;
  color: #000;
}
.summaries {
  background-color: #fff;
  color: #000;
  a {
    margin: 0;
    background: none !important;
    color: #000;
    &:hover {
      background: none !important;
      text-decoration: underline;
    }
  }
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
  .img-list {
    margin-top: 30px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    img {
      flex: 1 0 auto;
      margin-top: 30px;
      padding-left: 15px;
      padding-right: 15px;
      flex-grow: 0 !important;
    }
  }
}
</style>
