import Vue from 'vue';
import App from "./pages/App.vue";
import "./style/style.less"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = true

new Vue({
    render: h => h(App)
}).$mount('#app')
