<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="slide">
      <el-carousel indicator-position="outside" :interval="2000">
        <el-carousel-item v-for="(item,index ) in slideList" :key="index">
          <div
            class="slide-image"
            :style="`
          background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
          background-size:contain contain;
          `"
          ></div>
          <!-- background-size 属性规定背景图像的尺寸把图像图像扩展至最大尺寸，contain以使其宽度和高度完全适应内容区域。 -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: currentTab === index }"
            @click="handleChangeTab(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="tabs[currentTab].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideList: [],
      currentTab: 0,
      // tab栏的数据
      tabs: [
        { name: "攻略", placeholder: "搜索城市" },
        { name: "酒店", placeholder: "请输入搜索酒店的城市" },
        { name: "机票", placeholder: "", pageUrl: "/air" }
      ]
    };
  },
  methods: {
    // tab栏切换
    handleChangeTab(index) {
      // 如果是点击的机票，跳转到机票页面
      if (index === 2) {
        this.$router.push("/air");
      }

      // 修改当前高亮
      this.currentTab = index;
    }
  },
  mounted() {
    // 把axios绑定到原型上

    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        console.log(res);
        this.slideList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
  /deep/ .el-carousel__container {
    height: 700px;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 680px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>