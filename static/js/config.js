//初始化配置文件
(function() {
	// 配置
	var envir = 'test';
	var configMap = {
		test: {
			url: '/vue'
		},
		online: {
			url: 'http://api15.boshangquan.com'
		}
	};
	window.CONFIG = configMap[envir];
}())