<template>
  <transition name="Fade" mode="out-in">
    <div class="case-detail">
      <default-banner
        :img-url="'http://www.membzone.com/' + detail.max_img"
        :title="detail.name"
        cus-class="height-auto"
      />
      <div class="container">
        <el-breadcrumb separator="/" style="height: 50px; line-height: 50px">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/markets">Markets</a></el-breadcrumb-item
          >
        </el-breadcrumb>
        <div class="title">
          {{ detail.name }}
        </div>
        <div class="date">
          {{ detail.create_date ? detail.create_date : setFormat(detail.date) }}
        </div>
        <div class="content">
          <div v-html="detail.content"></div>
        </div>
        <div class="prev-next">
          <nuxt-link v-if="prevNext.prev" :to="'/markets/' + prevNext.prev._id">
            Prev:{{ prevNext.prev.name }}
          </nuxt-link>
          <span v-else> Prev:none </span>
          <nuxt-link v-if="prevNext.next" :to="'/markets/' + prevNext.next._id">
            Next:{{ prevNext.next.name }}
          </nuxt-link>
        </div>
        <div class="relevant">
          <div class="relevant-head"><span>Relevant Case</span></div>
          <el-row class="relevant-list">
            <el-col
              v-for="item in marketsRelative"
              :key="item._id"
              :span="12"
              class="relevant-item"
            >
              <el-row>
                <el-col :span="4" class="relevant-date">
                  <span> {{ setDate(item.date * 1000) }}</span>
                  <span class="relevant-year">
                    {{ setDate(item.date * 1000, true) }}</span
                  >
                </el-col>
                <el-col :span="20">
                  <div class="relevant-title">
                    <nuxt-link :to="'/markets/' + item._id">{{
                      item.name
                    }}</nuxt-link>
                  </div>
                  <div class="relevant-content">
                    {{ filterHtml(item.content) }}
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
      bannerOptions: {},
      id: '',
      detail: {
        title: '',
        createDate: '',
        content: '',
      },
      prevNext: {},
      marketsRelative: [],
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`/markets/${this.id}`).then((result) => {
        this.detail = result.data
      })
      this.$http.get(`/markets/prevNext/${this.id}`).then((result) => {
        this.prevNext = result.data
      })
      this.$http.get(`/markets/relative/${this.id}`).then((res) => {
        this.marketsRelative = res.data
      })
    },
    setDate(val, year) {
      if (year) {
        return moment(val).format('yyyy')
      } else {
        return moment(val).format('MM/DD')
      }
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
    setFormat(val) {
      return moment(val * 1000).format('yyyy-MM-DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
.case-detail {
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
    /deep/ * {
      color: #333 !important;
    }
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
    padding: 30px 50px 30px 0;
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
