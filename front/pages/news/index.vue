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
        <nuxt-link
          v-for="newsType in newsTypeList"
          :key="newsType.id"
          :to="'news?type=' + newsType.id"
        >
          {{ newsType.name }}
        </nuxt-link>
      </div>
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
        title: 'NEWS CENTER',
      },
      newsTypeList: [
        {
          name: '公司新闻',
          id: 100,
        },
        {
          name: '行业新闻',
          id: 101,
        },
      ],
      newsList: [],
    }
  },
  methods: {
    getNewsList() {},
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
}
</style>
