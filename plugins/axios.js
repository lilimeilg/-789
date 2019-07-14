// 添加错误拦截器
import {Message}from "element-ui"
export default ({$axios})=>{
    //拦截axios的错误请求
    $axios.onError(err=>{
        console.log(err.response);
        const {message,statusCode}=err.response.data
        // 只要状态码是400的都弹窗提示
    if(statusCode===400){
        Message.warning(message)
    }
    })
}