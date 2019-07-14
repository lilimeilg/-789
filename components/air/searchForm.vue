<template>
  <div class="search-form">
    <!-- 头部tab栏的切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(item,index)"
        :class="{active: index===currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 出发和到达城市 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
           v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
           v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <!-- 选择出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate"
         v-model="form.departDate"></el-date-picker>
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <!-- 城市切换 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      }
    };
  },
  methods: {
    //   切换tab栏
    handleSearchTab(item,index) {
    //   console.log("tab栏的切换");
    if(index===1){
        this.$message.warning("暂未开通往返机票查询功能y")
    }
    // this.currentTab=index

    },
    // 出发城市下拉选择时触发
    handleDepartSelect() {
      console.log("搜索出发城市");
    },
    // 目标城市下拉选择时触发
    handleDestSelect() {
      console.log("搜索到达城市");
    },
    // 选择出发时间，确认选择日期时触发
    handleDate(value) {
      console.log("选择出发时间");
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
    //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    if(!value.trim()){
        // 如果输入框为空的话则不显示下拉菜单
        cb([])
        return
    }
    // 如果不为空的话就发送请求，请求城市数据
    this.$axios({
        url:"/airs/city",
        params:{
            name:value
        }
    }).then(res=>{
        // console.log(res);
        const {data}=res.data
        const newData=data.map(v=>{
            // 添加一个value属性，把返回的数据去掉 市 字
            return{
                ...v,
                value:v.name.replace("市"," ")
            }
        })
        // console.log(newData);
        // 默认选中第一个城市
        this.form.departCity=newData[0].value
        this.form.destCode=newData[0].sort
        cb(newData)
    })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
    //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    if(!value.trim()){
        // 如果输入框为空的话则不显示下拉菜单
        cb([])
        return
    }
    // 如果不为空的话就发送请求，请求城市数据
    this.$axios({
        url:"/airs/city",
        params:{
            name:value
        }
    }).then(res=>{
        // console.log(res);
        const {data}=res.data
        const newData=data.map(v=>{
            // 添加一个value属性，把返回的数据去掉 市 字
            return{
                ...v,
                value:v.name.replace("市"," ")
            }
        })
        console.log(newData);
        // 默认选中第一个城市
        this.form.destCity=newData[0].value
        this.form.departCode=newData[0].sort
        cb(newData)
    })
    },
    // 机票搜索
    handleSubmit() {
      console.log("机票搜索");
    },
    // 城市切换
    handleReverse() {
      console.log("城市切换");
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>