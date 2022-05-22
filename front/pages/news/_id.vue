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
          {{ detail.title }}
        </div>
        <div class="date">
          {{ detail.createDate }}
        </div>
        <div class="content">
          {{ detail.content }}
        </div>
        <div class="prev-next">
          <nuxt-link :to="prevNext.prev ? '/news/' + prevNext.prev.id : ''">
            Prev:{{ prevNext.prev ? prevNext.prev.title : 'none' }}
          </nuxt-link>
          <nuxt-link :to="prevNext.next ? '/news/' + prevNext.next.id : ''">
            Next:{{ prevNext.next ? prevNext.next.title : 'none' }}
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
                  <span> {{ setDate(item.date) }}</span>
                  <span class="relevant-year">
                    {{ setDate(item.date, true) }}</span
                  >
                </el-col>
                <el-col :span="20">
                  <div class="relevant-title">
                    <nuxt-link :to="'/news/' + item.id">{{
                      item.title
                    }}</nuxt-link>
                  </div>
                  <div class="relevant-content">{{ item.content }}</div>
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
    console.log(this.$route.params)
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`/newsDetail`).then((result) => {
        this.detail = result.data
      })
      this.$http
        .get(`/newsPrevNext`, { id: this.$route.params.id })
        .then((result) => {
          this.prevNext = result.data
        })
      this.$http.get('/newsRelative').then((res) => {
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
