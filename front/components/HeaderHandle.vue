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
            <p>
              <a
                :href="'mailto:' + email"
                target="_blank"
                rel="noopener noreferrer"
                >{{ email }}</a
              >
            </p>
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
      phone: '(615) 741-2286',
      address: 'Americas Anne Bevis',
      logo: require('../static/logo.png'),
      email: 'admat_apac@membzone.com',
      activePath: '/',
      activeColor: '#fdc900',
      menus: [
        {
          key: 'index',
          path: '/',
          title: 'HOME',
        },
        {
          key: 'Markets',
          path: '/markets',
          title: 'Markets',
        },
        {
          key: 'Products',
          path: '/products',
          title: 'Products',
        },
        {
          key: 'Sustainability',
          path: '/sustainability',
          title: 'Sustainability',
        },
        {
          key: 'News',
          path: '/news',
          title: 'News',
        },
        {
          key: 'About',
          path: '/about',
          title: 'About',
        },
        {
          key: 'Contact',
          path: '/contact',
          title: 'Contact',
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
    a {
      color: #666;
      &:hover {
        color: #fdd433;
      }
    }
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
