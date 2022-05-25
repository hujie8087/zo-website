import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
      },
      {
        path: "/table",
        name: "basetable",
        meta: {
          title: "表格",
        },
        component: () =>
          import(/* webpackChunkName: "table" */ "../views/BaseTable.vue"),
      },
      {
        path: "/charts",
        name: "basecharts",
        meta: {
          title: "图表",
        },
        component: () =>
          import(/* webpackChunkName: "charts" */ "../views/BaseCharts.vue"),
      },
      {
        path: "/form",
        name: "baseform",
        meta: {
          title: "表单",
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/BaseForm.vue"),
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "tab标签",
        },
        component: () =>
          import(/* webpackChunkName: "tabs" */ "../views/Tabs.vue"),
      },
      {
        path: "/permission",
        name: "permission",
        meta: {
          title: "权限管理",
          permission: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */
            "../views/Permission.vue"
          ),
      },
      {
        path: "/i18n",
        name: "i18n",
        meta: {
          title: "国际化语言",
        },
        component: () =>
          import(/* webpackChunkName: "i18n" */ "../views/I18n.vue"),
      },
      {
        path: "/upload",
        name: "upload",
        meta: {
          title: "上传插件",
        },
        component: () =>
          import(/* webpackChunkName: "upload" */ "../views/Upload.vue"),
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: "自定义图标",
        },
        component: () =>
          import(/* webpackChunkName: "icon" */ "../views/Icon.vue"),
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "找不到页面",
        },
        component: () =>
          import(/* webpackChunkName: "404" */ "../views/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限",
        },
        component: () =>
          import(/* webpackChunkName: "403" */ "../views/403.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User.vue"),
      },
      {
        path: "/editor",
        name: "editor",
        meta: {
          title: "富文本编辑器",
        },
        component: () =>
          import(/* webpackChunkName: "editor" */ "../views/Editor.vue"),
      },
      {
        path: "/products",
        name: "products",
        meta: {
          title: "产品内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/products/products.vue"
          ),
      },
      {
        path: "/productType",
        name: "productType",
        meta: {
          title: "产品类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/products/productType.vue"
          ),
      },
      {
        path: "/news",
        name: "news",
        meta: {
          title: "新闻内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/news/news.vue"
          ),
      },
      {
        path: "/newsType",
        name: "newsType",
        meta: {
          title: "新闻类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/news/newsType.vue"
          ),
      },
      {
        path: "/case",
        name: "case",
        meta: {
          title: "案例内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/case/case.vue"
          ),
      },
      {
        path: "/caseType",
        name: "caseType",
        meta: {
          title: "案例类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/case/caseType.vue"
          ),
      },
      {
        path: "/solution",
        name: "solution",
        meta: {
          title: "解决方案内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/solution/solution.vue"
          ),
      },
      {
        path: "/solutionType",
        name: "solutionType",
        meta: {
          title: "解决方案类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/solution/solutionType.vue"
          ),
      },
      {
        path: "/about",
        name: "about",
        meta: {
          title: "关于我们内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/about/about.vue"
          ),
      },
      {
        path: "/aboutType",
        name: "aboutType",
        meta: {
          title: "关于我们类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/about/aboutType.vue"
          ),
      },
      {
        path: "/contact",
        name: "contact",
        meta: {
          title: "联系我们内容管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/contact/contact.vue"
          ),
      },
      {
        path: "/contactType",
        name: "contactType",
        meta: {
          title: "联系我们类别管理",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/contact/contactType.vue"
          ),
      },
      {
        path: "/homeDataType",
        name: "homeDataType",
        meta: {
          title: "首页类别数据",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/homeData/homeDataType.vue"
          ),
      },
      {
        path: "/homeData",
        name: "homeData",
        meta: {
          title: "首页数据",
        },
        component: () =>
          import(
            /* webpackChunkName: "editor" */
            "../views/homeData/homeData.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    next();
  }
});

export default router;
