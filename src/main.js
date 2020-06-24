import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

//导入富文本应用
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)
//导入tree-table
import ZkTable from 'vue-table-with-tree-grid'




// 导入字体图标
import './assets/fonts/iconfont.css'

//设置后端网络地址
axios.defaults.baseURL ='http://127.0.0.1:8888/api/private/v1/'

//axios发起网络请求时，请求头必须含有token值
axios.interceptors.request.use(config=>{
	config.headers.Authorization=window.sessionStorage.getItem('token')
	return config
})
//注册全局
Vue.prototype.$http=axios
Vue.component('tree-table', ZkTable)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
