// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

//在全局域设置字体大小
function calcRem() {
	var http = document.getElementsByTagName("html")[0];
	var w = document.documentElement.clientWidth;
	if(w < 400) {
		http.style.fontSize = "10px";
	} else if(w < 640) {
		http.style.fontSize = w / 40 + "px";
	} else {
		http.style.fontSize = "16px";
	}
}
calcRem();
window.onresize = function() {
	calcRem();
}
Vue.prototype.config = 'http://192.168.1.111:8088/';
