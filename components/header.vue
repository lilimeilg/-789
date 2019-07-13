<template>
  <header>
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <el-row type="flex" class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </el-row>
      <!-- 导航栏 -->
      <el-row type="flex" class="nav">
        <!--当前的路径如果匹配上链接的to属性的值，会默认加上这个class：nuxt-link-exact-active -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 用户中心 -->
      <el-row type="flex" class="user"  >
        <nuxt-link to="/user/login" v-if="!$store.state.user.userInfo.token">登录/注册</nuxt-link>
        <!-- 根据token值判断是否显示页面 -->
        <el-row type="flex" align="middle" v-if="$store.state.user.userInfo.token">
          <el-dropdown>
            <span class="el-dropdown-link">
              <nuxt-link to="#">
                <!-- 拼接图片路径 -->
                <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt />
                {{$store.state.user.userInfo.user.nickname}}
              </nuxt-link>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLoginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {
  
    methods:{
      handleLoginout(){
        this.$store.commit("user/clearUserInfo")
        this.$message({
          type:'warning',
          message:"已成功退出登录"
        })
      }
    }
  
}
</script>


<style lang="less" scoped>
header {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .logo {
    width: 156px;
    padding-top: 8px;

    img {
      display: block;
      width: 100%;
    }
  }
  .nav {
    margin: 0 20px;
    flex: 1;
    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;
      &:hover {
        color: rgb(64, 158, 255);
        border-bottom: 3px solid rgb(64, 158, 255);
      }
    }
    .nuxt-link-exact-active {
      background-color: rgb(64, 158, 255);
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
  }
  .user img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>
