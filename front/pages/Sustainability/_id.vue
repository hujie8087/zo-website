<template>
  <transition name="Fade" mode="out-in">
    <div class="solutions-detail">
      <default-banner
        :img-url="bannerOptions.bannerImg"
        :title="bannerOptions.title"
      />
      <div class="container">
        <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/sustainability">Sustainability</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>Impact</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
          {{ detail.t_title }}
        </div>
        <div class="date">
          {{ setCreateDate(detail.date) }}
        </div>
        <div class="content">
          <p v-html="detail.t_detail"></p>
        </div>
        <div></div>
        <div class="prev-next">
          <nuxt-link
            :to="prevNext.prev ? '/sustainability/' + prevNext.prev._id : ''"
          >
            Prev:{{ prevNext.prev ? prevNext.prev.t_title : 'none' }}
          </nuxt-link>
          <nuxt-link
            :to="prevNext.next ? '/sustainability/' + prevNext.next._id : ''"
          >
            Next:{{ prevNext.next ? prevNext.next.t_title : 'none' }}
          </nuxt-link>
        </div>
        <el-button type="primary" @click="goBack">View All Articles</el-button>
        <div class="relevant">
          <div class="relevant-head"><span>Relevant solutions</span></div>
          <el-row class="relevant-list">
            <el-col
              v-for="item in solutionsRelative"
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
                    <nuxt-link :to="'/sustainability/' + item._id">{{
                      item.t_title
                    }}</nuxt-link>
                  </div>
                  <div class="relevant-content">{{ item.t_intro }}</div>
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
      detail: {},
      prevNext: {},
      solutionsRelative: [],
    }
  },
  created() {
    this.$http
      .get('/banner?banner_id=7')
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
      this.$http.get(`/textI/${this.$route.params.id}`).then((result) => {
        this.detail = result.data
      })
      this.$http
        .get(`/textI/prevNext/${this.$route.params.id}`)
        .then((result) => {
          this.prevNext = result.data
        })
      this.$http.get(`/textI/relative/${this.$route.params.id}`).then((res) => {
        this.solutionsRelative = res.data
      })
    },
    setDate(val, year) {
      if (year) {
        return moment(val * 1000).format('yyyy')
      } else {
        return moment(val * 1000).format('MM/DD')
      }
    },
    setCreateDate(val) {
      return moment(val * 1000).format('yyyy-MM-DD')
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-detail {
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
