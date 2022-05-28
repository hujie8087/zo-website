<template>
  <transition name="Fade" mode="out-in">
    <div class="news-detail">
      <default-banner
        :img-url="bannerOptions.bannerImg"
        :title="bannerOptions.title"
      />
      <div class="container">
        <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/news">News</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
          {{ detail.news_title }}
        </div>
        <div class="date">
          {{ detail.create_date ? detail.create_date : setFormat(detail.date) }}
        </div>
        <div class="content">
          <div v-html="detail.news_content"></div>
        </div>
        <div class="prev-next">
          <nuxt-link v-if="prevNext.prev" :to="'/news/' + prevNext.prev._id">
            Prev:{{ prevNext.prev.news_title }}
          </nuxt-link>
          <span v-else> Prev:none </span>
          <nuxt-link v-if="prevNext.next" :to="'/news/' + prevNext.next._id">
            Next:{{ prevNext.next.news_title }}
          </nuxt-link>
        </div>
        <div class="relevant">
          <div class="relevant-head"><span>Relevant news</span></div>
          <el-row class="relevant-list">
            <el-col
              v-for="item in newsRelative"
              :key="item.id"
              :span="12"
              class="relevant-item"
            >
              <el-row>
                <el-col :span="4" class="relevant-date">
                  <span> {{ setDate(item.create_date) }}</span>
                  <span class="relevant-year">
                    {{ setDate(item.create_date, true) }}</span
                  >
                </el-col>
                <el-col :span="20">
                  <div class="relevant-title">
                    <nuxt-link :to="'/news/' + item._id">{{
                      item.news_title
                    }}</nuxt-link>
                  </div>
                  <div class="relevant-content">
                    {{ filterHtml(item.news_content) }}
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'

export default {
  transition: 'fade',
  data() {
    return {
      bannerOptions: {
        bannerImg: require('../../static/images/banner/news-banner.jpg'),
        title: 'NEWS CENTER',
      },
      id: '',
      detail: {
        title: '',
        createDate: '',
        content: '',
      },
      prevNext: {},
      newsRelative: [],
    }
  },
  created() {
    this.id = this.$route.params.id
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
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`/news/${this.id}`).then((result) => {
        this.detail = result.data
      })
      this.$http.get(`/news/prevNext/${this.id}`).then((result) => {
        this.prevNext = result.data
      })
      this.$http.get(`/news/relative/${this.id}`).then((res) => {
        this.newsRelative = res.data
      })
    },
    setDate(val, year) {
      if (year) {
        return moment(val).format('yyyy')
      } else {
        return moment(val).format('MM/DD')
      }
    },
    setFormat(val) {
      return moment(val * 1000).format('yyyy-MM-DD HH:mm:ss')
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.news-detail {
  .title {
    text-align: center;
    font-size: 16px;
    color: #333333;
    line-height: 50px;
    font-weight: bold;
  }
  .date {
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    color: #666;
  }
  .content {
    line-height: 25px;
    font-size: 14px;
    color: #666;
    margin: 30px 0;
  }
  .prev-next {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    span {
      margin-right: 30px;
    }
    a {
      color: #333;
      margin-right: 30px;
      &:hover {
        color: #fdc900;
      }
    }
  }
}
.relevant {
  margin: 30px 0;
  &-head {
    border-bottom: 1px solid #e9e9e9;
    span {
      width: auto;
      display: inline-block;
      line-height: 40px;
      border-bottom: 1px solid #333;
      color: #333;
      font-size: 16px;
    }
  }
  &-list {
    margin-top: 30px;
  }
  &-item {
    border-bottom: 1px dashed #e5e5e5;
    padding: 30px 30px 30px 0;
  }
  &-date {
    color: #333333;
    font-size: 22px;
    line-height: 25px;
    span {
      display: block;
    }
  }
  &-year {
    font-size: 14px;
    color: #666;
  }
  &-title {
    color: #333333;
    font-size: 18px;
    line-height: 30px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: #333333;
      &:hover {
        color: #fdc900;
      }
    }
  }
  &-content {
    color: #7b7676;
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
