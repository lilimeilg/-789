import createPersistedState from 'vuex-persistedstate'
// 现在用户已经保存到`store`了，但是还有一个问题，数据是保存在缓存中的，如果页面一刷新，那么数据就会不见了，这样是不合理的。

// 所以我们需要使用`localStorage`把数据保存到本地，但是由于`nuxtjs`是运行在服务器的，不能直接在`store`中使用浏览器的方法，所以我们需要依赖一些判断和插件。
// nuxtjs`中`store`不能直接在浏览器的`lcoalStorage`方法，所以我们需要依赖一个插件`vuex-persistedstate`，该插件会把本地存储的数据读取到`store`。
export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}
