<template>
	<div class="main">
		<div class="sideBar">
			<v-menu :menu="menu" @listenOpen="open" ></v-menu>
		</div>
		<div class="content">
			<router-view :menu="menu"></router-view>
		</div>
	</div>
</template>

<script>
	import menu from './menu.vue'
	export default {
		name: 'main',
		data() {
			return {
				menu: [{
						id: 1,
						title: '前端',
						menuItem: [{
								id: 2,
								name: "JavaScript",
								menuOptions: [{
									id: 3,
									name: 'JavaScript高级程序设计',
									price: 94.00,
									src: 'static/javascript1.jpg',
									total: 30
								}, {
									id: 4,
									name: 'JavaScript设计模式',
									price: 40.00,
									src: 'static/script2.jpg',
									total: 60
								}]
							},
							{
								id: 5,
								name: "CSS",
								menuOptions: [{
									id: 6,
									name: 'HTML5与CSS3权威指南',
									price: 120.00,
									src: 'static/HTML5CSS3.jpg',
									total: 52
								}, {
									id: 7,
									name: 'CSS权威指南',
									price: 60.00,
									src: 'static/css.jpg',
									total: 12
								}]
							}
						]
					},
					{
						id: 8,
						title: '后端',
						menuItem: [{
								id: 9,
								name: "Java",
								menuOptions: [{
									id: 10,
									name: 'Java核心技术',
									price: 130.00,
									src: 'static/java1.jpg',
									total: 33
								}, {
									id: 11,
									name: 'Java网络编程',
									price: 50.00,
									src: 'static/java2.jpg',
									total: 22
								}]
							},
							{
								id: 12,
								name: "C++",
								menuOptions: [{
									id: 13,
									name: 'C++入门',
									price: 40.00,
									src: 'static/c++1.jpg',
									total: 21
								}, {
									id: 14,
									name: 'C++高级编程',
									price: 120.00,
									src: 'static/c++2.jpg',
									total: 16
								}]
							}
						]
					}
				],
			}
		},
		components: {
			'v-menu': menu
		},
		methods: {
			
		  	open(val) {
		  		let item = this.menu[val[0]].menuItem[val[1]].menuOptions[val[2]];
				this.$router.push({path:'/details/'+val[3],query:{item:JSON.stringify(item)}})
		  	}
  	
		}
	}
</script>

<style scoped="scoped">
	.main {
		margin-top: 60px;
		width: 100%;
		display: flex;
		flex: 1;
	}
	
	.sideBar {
		background-color: #eef1f6;
		width: 200px;
		overflow: auto;
	}
	
	.content {
		flex: 1;
		overflow: auto;
	}
	
	/*浏览器滚动条开始*/
	.sideBar::-webkit-scrollbar {
		width: 0px;
	}
	
	.content::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	
	.sideBar::-webkit-scrollbar-button,
	.content::-webkit-scrollbar-button {
		height: 0;
		background-color: #f9f9f9;
	}
	
	.sideBar::-webkit-scrollbar-thumb:hover,
	.content::-webkit-scrollbar-thumb:hover {
		background-color: rgb(127, 127, 127);
	}
	
	.sideBar::-webkit-scrollbar-track-piece,
	.content::-webkit-scrollbar-track-piece {
		background-color: #f9f9f9;
	}
	
	.sideBar::-webkit-scrollbar-thumb,
	.content::-webkit-scrollbar-thumb {
		background-color: rgba(216, 216, 216, 0.9);
		border-radius: 4px;
	}
	/*    end    */
	
	
</style>