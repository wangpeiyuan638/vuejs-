<template>
	<div class="banner">
		<div id="baiyechuang">
			<div class="tutu">
				<div class="animat-one" v-show="pagenums == 0">
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</div>
				<div class="animat-two" v-show="pagenums == 1">
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</div>
				<div class="animat-three" v-show="pagenums == 2">
					<p></p>
					<p></p>
				</div>
				<div class="zhentu">
					<img src="../../../static/images/banner/0.png" />
				</div>
			</div>
			<!--下一张，上一张-->
			<!--<div class="anniu" v-show="!isbanner">
				<span class="leftbut" @click="teachpage(-1)"></span>
				<span class="rightbut" @click="teachpage(-2)"></span>
			</div>-->
			<!--提示点-->
			<ul class="dianul">
				<li @click="teachpage(0)"></li>
				<li @click="teachpage(1)"></li>
				<li @click="teachpage(2)"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				pagenums: 0,
				pageall: 3,
				oldpagenum: 2,
				isbanner: true,
				islooping:false,
				imglist:[],
				listdata:[],
				rootLink: 'http://119.23.28.239:8080'
			}
		},
		created () {
			var vm = this;
			axios.get(vm.rootLink + '/train/homePage/banner?type=上面')
			  .then(function (data) {
				vm.imglist =  data.data.data
			  })
		},
		methods: {
			//图片切换
			teachpage(page) {
				if(page >= 0) {
					this.pagenums = page
				} else if(page == -2) {
					//下一页
					if(this.pagenums >= this.pageall - 1) {
						//在最后一页回到第一页
						this.pagenums = 0
					} else {
						this.pagenums++;
					}
				} else {
					//上一页
					if(this.pagenums <= 0) {
						//在第一页的时候，回到最后一页
						this.pagenums = this.pageall - 1
					} else {
						this.pagenums--;
					}
				}
				
			},
			//自动轮播
			loop() {
				let vm = this;
				vm.islooping = true;
				setTimeout(function() {
					if(vm.isbanner) {
						vm.teachpage(-2); //自动轮播相当于每5s按一次下一张按钮
						vm.islooping = false;
						vm.loop(); //轮询
					} else {
						vm.islooping = false;
						return;
					}
				}, 5000)
			}
		},
		watch: {
			pagenums: function(newind, oldind) {
				let vm = this;
				$(".dianul>li").removeClass("cur").eq(newind).addClass('cur');
				//加过渡：
				if(newind == 0) {
					anione(0);
				} else if(newind == 1) {
					anitwo(0);
				} else {
					anithree();
				}

				function anione(mm) {
					if(mm == 0) {
						$(".animat-one p").css("transition", "all 1s ease 0s");
						$(".animat-one p").css("background-image", 'url(' + vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath + ')');
//						$(".zhentu img").attr("src", vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath);
					}
					$(".animat-one p").eq(mm).addClass('xian');
					mm++;
					setTimeout(function() {
						if(mm > $(".animat-one p").length - 1) {
							//去掉过渡
							setTimeout(function() {
								$(".animat-one p").css("transition", "none");
								$(".zhentu img").attr("src", vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath);
								setTimeout(function(){
									$(".animat-one p").removeClass('xian');
								},100)
							}, 1000)
						} else {
							anione(mm);
						}
					}, 100)
				}

				function anitwo(mm) {
					if(mm == 0) {
						$(".animat-two p").css("transition", "all 1.2s ease 0s");
						$(".animat-two p").css("background-image", 'url(' + vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath + ')');
						
//						$(".zhentu img").attr("src", vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath);
					}
					$(".animat-two p").eq(mm).addClass('xian');
					mm++;
					setTimeout(function() {
						if(mm > $(".animat-two p").length - 1) {
							//去掉过渡
							setTimeout(function() {
								$(".animat-two p").css("transition", "none");
								$(".zhentu img").attr("src", vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath)
								setTimeout(function(){
									$(".animat-two p").removeClass('xian');
								},100)
							}, 1200)
						} else {
							anitwo(mm);
						}
					}, 100)
				}

				function anithree() {
					$(".animat-three p").css("background-image", 'url(' + vm.rootLink + '/resources/img/' + vm.imglist[oldind].imgPath + ')').css("transition", "all 1s ease 0s");
					setTimeout(function() {
						$(".animat-three").addClass("fei");
						$(".zhentu img").attr("src", vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath);
						setTimeout(function() {
							//去掉过渡
							$(".animat-three p").css("transition", "none");
							$(".animat-three p").css("background-image", 'url(' + vm.rootLink + '/resources/img/' + vm.imglist[newind].imgPath + ')');
							//我们准备下一张图
							setTimeout(function(){
								$(".animat-three").removeClass("fei");
							}, 100);
						}, 1000);
					}, 50)
				}
			},
			//监听是否执行自动轮播
			isbanner:function(newval,oldval){
				let vm = this;
				if(newval == true){
					if (vm.islooping) {
						return;
					} else{
						vm.loop();
					}
				}else{
					return;
				}
			}
		},
		mounted() {
			let vm = this;
			//首页轮播
//			axios.get( vm.rootLink + '/train/homePage/banner?type=上面')
//		        .then(function(res){
//		        	var list = res.data.data;
//		        	
//		        	for(var i = 0;i<list.length;i++){
//		        		// console.log(i);
//		        		vm.listdata.push(list[i]);
//		        	}
//		        	// console.log(vm.listdata);
//		        })
//		      	.catch(function(err){console.log(err)});
			//指示点初始化
			$(".dianul>li").removeClass("cur").eq(vm.pagenums).addClass('cur');
			//启动轮播设置
			vm.loop();
			//监听鼠标
			$(".banner").mouseenter(function(e) {
				e.stopPropagation();
				//鼠标移到轮播图区域，停止自动轮播
				if(vm.isbanner == false) {
					return;
				} else {
					vm.isbanner = false;
				}
			});
			$(".banner").mouseleave(function(e) {
				e.stopPropagation();
				//移除的时候，自动开始轮播
				if(vm.isbanner == true) {
					return;
				} else {
					vm.isbanner = true;
				}
			});
			//初始化动画区域尺寸位置
			$(document).ready(function() {
				$(".animat-one p").each(function() {
					var scrheight = $(".animat-one").height();
					var a = 0;
					var b = $(this).index() / 8 * scrheight;
					$(this).css({
						"left": a,
						"top": b,
						"background-position": (-a) + "px " + (-b) + "px",
						"background-size": '100% 800%'
					});
				});
				$(".animat-two p").each(function() {
					var scrwidth = $(".animat-two").width();
					var a = $(this).index() / 12 * scrwidth;
					var b = 0;
					$(this).css({
						"left": a,
						"top": b,
						"background-position": (-a) + "px " + (-b) + "px",
						"background-size": '1200% 100%'
					});
				});
				$(".animat-three p").each(function() {
					var scrheight = $(".animat-three").height();
					var a = 0;
					var b = $(this).index() / 2 * scrheight;
					$(this).css({
						"left": a,
						"top": b,
						"background-position": (-a) + "px " + (-b) + "px",
						"background-size": '100% 200%'
					});
				});
			});
		}
	}
</script>

<style scoped>
	.banner {
		width: 100vw;
		height: 31vw;
		overflow: hidden;
	}
	/*轮播图区域*/
	
	#baiyechuang {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.zhentu {
		width: 100%;
		height: 100%;
	}
	
	.zhentu img {
		width: 100%;
		height: 100%;
	}
	/*上一张*/
	
	#baiyechuang .anniu .leftbut,
	#baiyechuang .anniu .rightbut {
		position: absolute;
		width: 45px;
		height: 45px;
		top: 45%;
		cursor: pointer;
		z-index: 10;
	}
	
	#baiyechuang .anniu .leftbut {
		left: 20px;
		background: url(../../../static/images/icons.png) no-repeat 0 0;
		cursor: pointer;
	}
	/*下一张*/
	
	#baiyechuang .anniu .rightbut {
		right: 20px;
		background: url(../../../static/images/icons.png) no-repeat 0 -45px;
	}
	/*控制点*/
	
	#baiyechuang .dianul {
		width: 100%;
		list-style: none;
		position: absolute;
		bottom: 12px;
		text-align: center;
		z-index: 10;
	}
	
	#baiyechuang .dianul li {
		display: inline-block;
		width: 67px;
		height: 10px;
		border-radius: 5px;
		margin-right: 8px;
		background-color: #FFFFFF;
		cursor: pointer;
	}
	
	#baiyechuang .dianul li.cur {
		background-color: #E60012;
	}
	/*图片分块数字*/
	
	.tutu {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.animat-one,
	.animat-two,
	.animat-three {
		/*-webkit-perspective: 600px;*/
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		top: 0;
		left: 0;
		/*z-index: 2;*/
	}
	/*动画一*/
	
	#baiyechuang .animat-one {
		perspective: 600px;
		-ms-perspective: 600px;
		-moz-perspective: 600px;
		-webkit-perspective: 600px;
	}
	
	#baiyechuang .animat-one p {
		width: 100%;
		height: 3.875vw;
		position: absolute;
		opacity: 0;
		/*background-image: url(../../../static/images/banner/0.png);*/
		/*background-size: cover;*/
		transform: rotateY(-30deg);
		-webkit-transform: rotateY(-30deg);
		-moz-transform: rotateY(-30deg);
		-ms-transform:rotateY(-30deg);
		-o-transform:rotateY(-30deg); 
	}
	
	#baiyechuang .animat-one p.xian {
		opacity: 1;
		transform: rotateY(0deg);
		-webkit-transform: rotateY(0deg);
		-moz-transform: rotateY(0deg);
		-ms-transform:rotateY(0deg);
		-o-transform:rotateY(0deg);
	}
	/*动画二*/
	
	#baiyechuang .animat-two p {
		position: absolute;
		width: calc(100vw / 12);
		height: 31vw;
		/*opacity: 0;*/
		/*background-image: url(../../../static/images/banner/1.png);*/
		/*background-size: cover;*/
		transform: rotateY(90deg);
		-webkit-transform: rotateY(90deg);
		-moz-transform: rotateY(90deg);
		-ms-transform:rotateY(90deg);
		-o-transform:rotateY(90deg);
		transform-origin: 0 0;
		-ms-transform-origin: 0 0;
		-moz-transform-origin: 0 0;
		-o-transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
	}
	
	#baiyechuang .animat-two p.xian {
		opacity: 1;
		transform: rotateY(0deg);
		-webkit-transform: rotateY(0deg);
		-moz-transform: rotateY(0deg);
		-ms-transform:rotateY(0deg);
		-o-transform:rotateY(0deg);
	}
	/*动画三*/
	
	#baiyechuang .animat-three p {
		position: absolute;
		width: 100%;
		height: 15.5vw;
		/*background-image: url(../../../static/images/banner/1.png);*/
		/*background-size: cover;*/
	}
	
	#baiyechuang .animat-three p:nth-child(1) {
		transform-origin: 100vw 0;
		-ms-transform-origin: 100vw 0;
		-moz-transform-origin: 100vw 0;
		-o-transform-origin: 100vw 0;
		-webkit-transform-origin: 100vw 0;
	}
	
	#baiyechuang .animat-three p:nth-child(2) {
		transform-origin: 0 15.5vw;
		-ms-transform-origin: 0 15.5vw;
		-moz-transform-origin: 0 15.5vw;
		-o-transform-origin: 0 15.5vw;
		-webkit-transform-origin: 0 15.5vw;
	}
	
	#baiyechuang .animat-three.fei p {
		opacity: 0;
	}
	
	#baiyechuang .animat-three.fei p:nth-child(1) {
		transform: translateX(35vw)rotateZ(10deg);
		-moz-transform: translateX(35vw)rotateZ(10deg);
		-ms-transform:translateX(35vw)rotateZ(10deg);
		-o-transform:translateX(35vw)rotateZ(10deg);
		-webkit-transform: translateX(35vw)rotateZ(10deg);
	}
	
	#baiyechuang .animat-three.fei p:nth-child(2) {
		transform: translateX(-35vw)rotateZ(10deg);
		-moz-transform: translateX(-35vw)rotateZ(10deg);
		-ms-transform:translateX(-35vw)rotateZ(10deg);
		-o-transform:translateX(-35vw)rotateZ(10deg);
		-webkit-transform: translateX(-35vw)rotateZ(10deg);
	}
</style>