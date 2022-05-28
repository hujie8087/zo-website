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
      <div class="detail">
        <div class="detail-name">
          {{ detail.goods_name }}
        </div>
        <div class="detail-content">
          <div v-html="detail.goods_content"></div>
        </div>
        <div class="detail-contact">
          <nuxt-link to="/contact">Contact Us</nuxt-link>
        </div>
      </div>
      <div class="prev-next">
        <nuxt-link v-if="prevNext.prev" :to="'/products/' + prevNext.prev._id">
          Prev:{{ prevNext.prev.goods_name }}
        </nuxt-link>
        <span v-else> Prev:none </span>
        <nuxt-link v-if="prevNext.next" :to="'/products/' + prevNext.next._id">
          Next:{{ prevNext.next.goods_name }}
        </nuxt-link>
      </div>
      <div class="relevant">
        <div class="relevant-head"><span>Relevant products</span></div>
        <el-row class="relevant-list">
          <el-col
            v-for="item in productsRelative"
            :key="item.id"
            :span="12"
            class="relevant-item"
          >
            <el-row>
              <el-col :span="18">
                <div class="relevant-name">
                  <nuxt-link :to="'/products/' + item.id">{{
                    item.goods_name
                  }}</nuxt-link>
                </div>
                <div class="relevant-content">
                  {{ filterHtml(item.goods_content) }}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
      bannerOptions: {},
      id: '',
      detail: {},
      prevNext: {},
      productsRelative: [],
    }
  },
  created() {
    this.id = this.$route.params.id
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
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`/products/${this.id}`).then((result) => {
        this.detail = result.data
      })
      this.$http
        .get(`/products/prevNext/${this.id}`, { id: this.$route.params.id })
        .then((result) => {
          this.prevNext = result.data
        })
      this.$http
        .get(`/products/relative/${this.id}`, { id: this.$route.params.id })
        .then((result) => {
          this.productsRelative = result.data
        })
    },
    filterHtml(val) {
      return val ? val.replace(/<.*?>/g, '') : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  margin: 30px 0;
  &-name {
    color: #333333;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  &-content {
    line-height: 25px;
    font-size: 14px;
    color: #666;
    text-align: left;
    margin-bottom: 30px;
  }
  &-contact {
    a {
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
  }
}

.prev-next {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  margin-top: 50px;
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
    margin-top: 20px;
  }
  &-img {
    img {
      width: 100%;
      height: auto;
    }
  }
  &-item {
    border-bottom: 1px dashed #e5e5e5;
    padding: 20px 30px 20px 0;
  }
  &-name {
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
