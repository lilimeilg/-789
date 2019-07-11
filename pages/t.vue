<template>
    <div>
        <div class="nav">
            <span v-for="(item,index) in ['什么鬼','不知道','哈哈哈']" :key="index"
            @click="handleClick(index)"
            :class="{active: current==index}">{{item}}
                
            </span>
         
        </div>
        <div v-if="current==0">
            <ul>
                <li>11111111</li>
                <li>11111111</li>
                <li>11111111</li>
                <li>11111111</li>
            </ul>
        </div>
        <div v-if="current==1">
            <ul>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
            </ul>
        </div>
        <div v-if="current==2">
            <ul>
                <li>44444444444444</li>
                <li>44444444444444</li>
                <li>44444444444444</li>
                <li>44444444444444</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
data(){
    return{
        current:0
    }
},
methods:{
handleClick(index){
    console.log(123);
    this.current=index
}
}
}
</script>

<style>
.nav span{
padding: 10px;
cursor: pointer;
}
.active{
    color:brown
}
</style>
