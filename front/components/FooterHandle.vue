<template>
  <footer class="foot">
    <section class="foot-top">
      <div class="container">
        <el-row>
          <el-col :span="6" :offset="0">
            <div class="logo">
              <nuxt-link to="/">
                <img :src="logo" alt="" />
              </nuxt-link>
            </div>
          </el-col>
          <el-col :span="18" :offset="0">
            <el-menu
              class="foot-menu"
              mode="horizontal"
              background-color="transparent"
              text-color="#ffffff"
            >
              <el-menu-item
                v-for="item in menus"
                :key="item.key"
                :index="item.path"
              >
                <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
              </el-menu-item>
            </el-menu>
            <div class="foot-tips">
              <ul>
                <li>
                  <img src="../static/images/tel.png" alt="" />
                  <span>{{ phone }}</span>
                </li>
                <li>
                  <img src="../static/images/email.png" alt="" />
                  <span>{{ email }}</span>
                </li>
                <li>
                  <img src="../static/images/address.png" alt="" />
                  <span>{{ address }}</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="foot-bottom">
      <div class="container">
        <div>
          {{ CopyRight }}
          <nuxt-link to="/">SiteMap</nuxt-link>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      phone: '4000-6622-888',
      address: '广东省深圳市宝安区西乡街道航城大道 Baltimore, MD 21228',
      logo: require('../static/logo.png'),
      email: 'xxx@qq.com',
      menus: [
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
      CopyRight: 'Copyright © 2022 membzone All Rights Reserved ',
    }
  },
}
</script>

<style lang="scss" scoped>
.foot {
  &-top {
    background-color: #051829;
    padding: 40px;
    .logo {
      width: 180px;
      height: auto;
      img {
        width: 100%;
      }
    }
    .el-menu {
      border-bottom: 0;
      float: right;
      .el-menu-item {
        font-size: 16px;
        font-weight: bold;
        border-bottom: 0;
        &:hover {
          background-color: transparent !important;
          color: #fdc900 !important;
        }
        &.is-active {
          color: #ffffff !important;
        }
        a {
          text-decoration: none;
          display: block;
        }
      }
    }
    .foot-tips {
      width: 100%;
      overflow: hidden;
      ul {
        display: flex;
        justify-content: right;
        li {
          margin-left: 30px;
          color: #ffffff;
          line-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  &-bottom {
    background-color: #000204;
    line-height: 50px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    a {
      color: #fff;
      text-decoration: none;
      margin-left: 30px;
      &:hover {
        color: #fdc900;
      }
    }
  }
}
</style>
