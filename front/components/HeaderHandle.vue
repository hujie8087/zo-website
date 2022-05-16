<template>
  <header class="header">
    <div class="container">
      <el-row>
        <el-col :span="20" :offset="0">
          <div class="header-address">
            {{ address }}
          </div>
          <div class="header-contact">
            <p style="font-size: 18px">{{ phone }}</p>
            <p>{{ email }}</p>
          </div>
        </el-col>
        <el-col :span="4" class="contact-btn">
          <el-button type="primary" size="default" @click="contactHandle"
            >Contact Us</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="contain">
      <el-row style="width: 1200px; margin: 0 auto">
        <el-col :span="6" :offset="0">
          <div class="logo">
            <nuxt-link to="/"> <img :src="logo" alt="membzone" /></nuxt-link>
          </div>
        </el-col>
        <el-col :span="18" :offset="0">
          <el-menu
            mode="horizontal"
            :default-active="activePath"
            router
            :active-text-color="activeColor"
            class="header-menu"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="item in menus"
              :key="item.key"
              :index="item.path"
            >
              {{ item.title }}
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      phone: '4000-6622-888',
      address: '广东省深圳市宝安区西乡街道航城大道 Baltimore, MD 21228',
      logo: require('../static/logo.png'),
      email: 'xxx@qq.com',
      activePath: '/',
      activeColor: '#fdc900',
      menus: [
        {
          key: 'index',
          path: '/',
          title: '首页',
        },
        {
          key: 'Products',
          path: '/Products',
          title: '产品中心',
        },
        {
          key: 'News',
          path: '/News',
          title: '新闻中心',
        },
        {
          key: 'Case',
          path: '/Case',
          title: '项目案例',
        },
        {
          key: 'Solutions',
          path: '/Solutions',
          title: '解决方案',
        },
        {
          key: 'About',
          path: '/About',
          title: '关于我们',
        },
        {
          key: 'Contact',
          path: '/Contact',
          title: '联系我们',
        },
      ],
    }
  },
  created() {
    this.activePath = this.$route.path
  },
  methods: {
    contactHandle() {
      console.log(11)
    },
    handleSelect(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  &-address {
    padding-left: 50px;
    background: url('../static/images/address.png') no-repeat left center;
    height: 66px;
    line-height: 25px;
    color: #666;
    font-size: 14px;
    width: 340px;
    float: left;
    display: flex;
    align-items: center;
  }
  &-contact {
    padding-left: 50px;
    background: url('../static/images/tel.png') no-repeat left center;
    height: 66px;
    line-height: 25px;
    color: #666;
    font-size: 14px;
    width: 300px;
    float: left;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .contain {
    border-top: 1px solid #b7b7b7;
  }
  .contact-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66px;
  }
  .logo {
    height: 84px;
    padding: 10px 0;
    img {
      height: 100%;
      width: auto;
    }
  }
  &-menu {
    border-bottom: 0;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    float: right;
    > .el-menu-item,
    > .el-submenu {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 0;
    }
    /deep/ .el-submenu__title {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
    }
  }
}
</style>
