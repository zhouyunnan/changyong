export default {
  navs: [
    {
      name: "首页",
      link: "home",
      icon: "iconfont icon-jurassic_home"
    },
    {
      name: "店铺管理",
      icon: "iconfont icon-dianpu",
      isopen: false,
      height: 0,
      second: [
        {
          name: "店铺概览",
          link: "shopindex"
        },
        {
          name: "上新店铺",
          link: "shopindex2"
        },
        {
          name: "商品管理",
          link: "spgl"
        },
        {
          name: "臻选排行榜",
          link: "phb"
        },
        {
          name: "每日新品",
          link: "mrxp"
        }
      ]
    },

    {
      name: "商品管理",
      icon: "iconfont icon-jifenshangcheng-shangpinfenlei",
      isopen: false,
      height: 0,
      second: [
        {
          name: "商品概览",
          link: "Admin_list"
        },
        {
          name: "上传商品",
          link: "Admin_add"
        },
      ]
    },
    {
      name: "分类管理",
      link: "category",
      icon: "iconfont icon-bianqian"
    },
    {
      name: "商户管理",
      icon: "iconfont icon-laoban",
      isopen: false,
      height: 0,
      second: [
        {
          name: "商户概览",
          link: "shanghu"
        },
        {
          name: "添加商户",
          link: "addshanghu"
        },
      ]
    },
    {
      name: "分销管理",
      icon: "iconfont icon-fenxiao",
      isopen: false,
      height: 0,
      second: [
        {
          name: "添加分销员",
          link: "fenxiao_list"
        },
        {
          name: "分销员管理",
          link: "fenxiao"
        },
      ]
    },
    {
      name: "用户查看",
      link: "userinfo",
      icon: "iconfont icon-weibiaoti-_fuzhi"
    },
    {
      name: "小程序公告",
      link: "notice",
      icon: "iconfont icon-gonggao"
    }, {
      name: "卡券订单",
      icon: "iconfont icon-icon--copy",
      isopen: false,
      height: 0,
      second: [
        {
          name: "新的订单",
          link: "d1"
        },
        {
          name: "已消费订单",
          link: "d2"
        },
        {
          name: "已取消订单",
          link: "d3"
        },
      ]
    },
  ],
}