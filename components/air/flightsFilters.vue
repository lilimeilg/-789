<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { type: "大", size: "L" },
        { type: "中", size: "M" },
        { type: "小", size: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // console.log("选择机场时候触发");
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      //   console.log(arr);
      this.$emit("changeDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   console.log("选择出发时间触发");
      const [from, to] = value.split(",");
      const arr = this.data.flights.filter(v => {
        //   获取出发时间
        const [start] = v.dep_time.split(":");
        //   字符串转数字后比较，解决0-6点显示所有数据的bug
        return Number(from) <= Number(start) && Number(start) < Number(to);
        //   console.log(start);
      });

      //   console.log(arr);
      this.$emit("changeDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //  console.log("选择航空公司时候触发");
      const arr = this.data.flights.filter(v => {
        return v.airline_name === value;
      });
      this.$emit("changeDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      //   console.log("选择机型时候触发");
      const arr = this.data.flights.filter(v => {
        return v.plane_size === value;
      });
      this.$emit("changeDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      //   console.log("撤销条件候触发");
    //   初始化所有的数据，还原数据列表
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";

      this.$emit("changeDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>