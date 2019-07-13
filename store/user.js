// 使用store管理数据,并把登录的方法放在store中统一管理
export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
});
// mutations,是一些改变数据方法的集合。同步操作，改变状态，每一个mutation都有一个字符串类型的事件类型(type)和回调函数(handler)，也可以理解为{type:handler()},这和订阅发布有点类似。先注册事件，当触发响应类型的时候调用handker()，调用type的时候需要用到store.commit方法。
export const mutations = {
  // 实现登录setUserInfo,第一个参数是固定的state，第二个参数是传入的参数
// 设置用户信息
  setUserInfo(state, data) {
    // 保存用户信息到state中
    state.userInfo = data;
  },
//   设置用户信息为空,因为是清空用户信息，所有不需要传递第二个参数
clearUserInfo(state){
 state.userInfo={
     token:"",
     user:{}
 }
}
};
// Action 提交的是 mutation，而不是直接变更状态.异步修改仓库数据  actions的第一个参数store对象， 第二个参数是传入的参数
export const actions = {
  //  登录
  login(store, data) {
    return this.$axios({
      url: "accounts/login",
      method: "POST",
      data: data
    }).then(res => {
      // 保存到state
      console.log(res);
    //   更改Vuex中的state的唯一方法是，提交mutation，即store.commit
      store.commit("setUserInfo", res.data);
      return res.data;
    });
  }
};
