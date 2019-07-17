<template>
  <!-- <div>机票头部</div> -->
  <el-row class="flights-title">
    <el-col :span="5">航空信息</el-col>
    <el-col :span="14">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">起飞时间</el-col>
        <el-col :span="12">到达时间</el-col>
      </el-row>
    </el-col>
    <el-col :span="5">价格</el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.flights-title{
 height: 38px;
line-height: 38px;
 background-color: rgb(246, 246, 246);
// background-color: aquamarine;
 border: 1px solid #ccc;
 padding: 0 15px;
 margin-bottom: 10px;
 font-size: 12px;
 >div{
     text-align: center;
 }
}

</style>
