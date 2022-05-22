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
      <el-row>
        <el-col :span="6">
          <div class="category-navigation">
            <nuxt-link
              v-for="productType in productTypeList"
              :key="productType.id"
              :to="'../products?type=' + productType.id"
            >
              {{ productType.name }}
            </nuxt-link>
          </div>
          <div class="contact-wrap">
            <div class="title">联系我们</div>
            <p>4000 662 228</p>
            <p>xxxx@xxxx.com</p>
            <p>广东省深圳市宝安区西乡街道航城大道</p>
          </div>
        </el-col>
        <el-col :span="17" :offset="1">
          <div class="detail">
            <img :src="detail.maxImg" alt="" />
            <div class="detail-name">
              {{ detail.name }}
            </div>
            <div class="detail-content">
              <div v-html="detail.content"></div>
            </div>
            <div class="detail-contact">
              <nuxt-link to="/contact">Contact Us</nuxt-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="prev-next">
        <nuxt-link :to="prevNext.prev ? '/products/' + prevNext.prev.id : ''">
          Prev:{{ prevNext.prev ? prevNext.prev.title : 'none' }}
        </nuxt-link>
        <nuxt-link :to="prevNext.next ? '/products/' + prevNext.next.id : ''">
          Next:{{ prevNext.next ? prevNext.next.title : 'none' }}
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
              <el-col :span="4" class="relevant-img">
                <nuxt-link :to="'/products/' + item.id">
                  <img :src="item.maxImg" alt="" />
                </nuxt-link>
              </el-col>
              <el-col :span="18" :offset="1">
                <div class="relevant-name">
                  <nuxt-link :to="'/products/' + item.id">{{
                    item.name
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
      id: '',
      detail: {},
      prevNext: {},
      productsRelative: [],
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .get(`/getProductDetail`, {
          params: { id: this.id },
        })
        .then((result) => {
          this.detail = result.data
        })

      this.$http
        .get(`/newsPrevNext`, { id: this.$route.params.id })
        .then((result) => {
          this.prevNext = result.data
        })
      this.$http
        .get(`/productsRelative`, { id: this.$route.params.id })
        .then((result) => {
          this.productsRelative = result.data
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.category-navigation {
  width: 100%;
  line-height: 40px;
  font-size: 16px;
  margin: 20px 0 40px;
  a {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    color: #333333;
    background-color: #fdc900;
    margin-right: 30px;
    border-radius: 5px;
    text-decoration: none;
    margin-bottom: 20px;
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
.contact-wrap {
  margin-top: 30px;
  border: 3px solid #e9e9e9;
  padding: 20px;
  font-size: 14px;
  color: #666;
  .title {
    font-size: 18px;
    color: #333;
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p {
    background: url('../../static/images/tel.png') no-repeat left center;
    padding-left: 30px;
    background-size: 20px;
    margin-bottom: 15px;
    &:nth-child(2) {
      background-image: url('../../static/images/email.png');
    }
    &:nth-child(3) {
      background-image: url('../../static/images/address.png');
    }
  }
}
.detail {
  img {
    margin-bottom: 30px;
  }
  &-name {
    color: #333333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
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
