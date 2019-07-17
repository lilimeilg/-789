<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <FlightsFilters :data="cacheFlightsData" @changeDataList="changeDataList" />
        <!-- 航班头部布局 -->
        <FlighsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList " :key="index" :data="item" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlighsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  components: {
    FlighsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      // dataList: []   ,  // 航班列表数据
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      // 系统缓存一份最初的数据，不进行任何改变的
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      }
    };
  },
  methods: {
    handleSizeChange(value) {
      // console.log("切换条数");
      this.pageSize = value;
    },
    handleCurrentChange(value) {
      // console.log("切换页码");
      this.pageIndex = value;
    },
    // 传递给子组件，用于修改dataList
    changeDataList(arr) {
      this.flightsData.flights = arr;
      // 重新给返回的总数据赋值
      this.total = this.flightsData.flights.length;
    }
  },
  mounted() {
    this.$axios({
      url: "airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.cacheFlightsData = { ...res.data };
      // this.dataList = res.data.flights;
      // 总的航班信息
      this.total = this.flightsData.flights.length;
      // 第一页的数据
      // this.dataList = this.flightsData.flights.slice(0, this.pageSize);
      console.log(this.dataList);
    });
  },
  computed: {
    // 当前页面渲染的列表数据
    dataList() {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>