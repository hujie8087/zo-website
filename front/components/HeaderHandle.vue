<template>
  <header class="header" :class="isFixed ? '' : 'isFixed'">
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
            <template v-for="item in menus">
              <template v-if="item.subs">
                <el-submenu :key="item.key" :index="item.path">
                  <template #title>
                    <span>{{ item.title }}</span>
                  </template>
                  <template v-for="subItem in item.subs">
                    <el-submenu
                      v-if="subItem.subs"
                      :key="subItem.key"
                      :index="subItem.path"
                    >
                      <template #title>{{ subItem.title }}</template>
                      <el-menu-item
                        v-for="(threeItem, i) in subItem.subs"
                        :key="i"
                        :index="threeItem.path"
                      >
                        {{ threeItem.title }}</el-menu-item
                      >
                    </el-submenu>
                    <el-menu-item
                      v-else
                      :key="subItem.path"
                      :index="subItem.path"
                      >{{ subItem.title }}
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :key="item.key" :index="item.path">
                  <template #title>{{ item.title }}</template>
                </el-menu-item>
              </template>
            </template>
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
      isFixed: false,
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
          subs: [
            {
              key: 'Company News',
              path: '/news',
              title: 'Company News',
            },
          ],
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    contactHandle() {
      console.log(11)
    },
    handleSelect(val) {
      console.log(val)
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 滚动条偏移量
      const offsetTop = document.querySelector('.header').offsetTop // 要滚动到顶部吸附的元素的偏移量
      this.isFixed = scrollTop > offsetTop
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  transition: 0.3s all;
  .container {
    height: 0;
    overflow: hidden;
    transition: 0.3s height;
  }
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
    background-color: transparent;
    > .el-menu-item,
    > .el-submenu {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 0;
      background-color: transparent !important;
    }
    /deep/ .el-submenu__title {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 0 !important;
      background-color: transparent !important;
    }
  }
}
.isFixed {
  background-color: rgba(255, 255, 255, 0.7);
  .container {
    height: 66px;
  }
}
</style>
