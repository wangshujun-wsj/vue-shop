<template>
	<div class="details">
		<div class="title">
			<h1>JavaScript高级程序设计(第3版)(JavaScript技术名著，html+css+javascript教程精粹，html 实战实例,销量超过8万册)</h1>
			<h2><span>JavaScript技术名著 web开发国内JS一书 销量超过8万册 JavaScript指南</span></h2>
		</div>
		<!-- 图书信息区-->
		<div class="messbox_info">
			<span>作者:[美]NIcholas C. Zakas</span>
			<span>出版社:人民邮电出版社</span>
		</div>
		<!-- 价格区-->
		<div class="price_info">
			<span>当当价</span>
			<span>￥{{item.price}}</span>
		</div>
		<div class="book">
			<img :src="item.src" />
			<div class="book_botton">
				<v-counter :max="item.total"></v-counter>
				<span @click="alert">立即购买</span>
			</div>
		</div>
		<v-dialog :is-show="isShow"  @on-close="closeDialog(isShow)">
    		<div class="buyok">
    			<h1>购买成功</h1>
    		</div>
		</v-dialog>
	</div>
</template>

<script>
	import counter from './counter.vue';
	import dialog from './dialog.vue'
	export default {
		name: 'details',
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			alert() {
				this.isShow =true;
			},
			closeDialog() {
		  		this.isShow=false;
		  	},
		},
		computed: {
			item: function() {
				return JSON.parse(this.$route.query.item)
			}
		},
		components: {
			'v-counter': counter,
			'v-dialog': dialog
		}
	}
</script>

<style scoped="scoped">
	
	.details {
		width: 630px;
		margin: 0 auto;
	}
	
	.title {
		font-family: "Verdana", "Microsoft Yahei";
		font-weight: normal;
		border-bottom: 1px solid #f5f5f5;
		padding: 5px 0px;
	}
	
	.title h1 {
		line-height: 24px;
		max-height: 48px;
		overflow: hidden;
		color: #323232;
		font-size: 18px;
	}
	
	.title h2 {
		padding-top: 6px;
		max-height: 96px;
		overflow: hidden;
		font-size: 16px;
		line-height: 24px;
		color: #323232;
		font-weight: normal;
	}
	.messbox_info {
		padding: 5px 0;
		font-size: 14px;
	}
	.messbox_info span {
		padding-right: 10px;
	}
	
	.price_info {
		background-color: #ebebeb;
    	padding: 0 0 0 10px;
    	line-height: 40px;
		font-size: 18px;
	}
	.price_info span:last-child {
		color: red;
		padding-left: 20px;
	}
	.book_botton {
		user-select: none;
		display: inline-block;  
		vertical-align: middle;
    	padding-left: 50px;
	}
	.book_botton span {
		display: block;
		border: 1px solid #ff2832;
    	color: #ff2832 !important;
    	background-color: #ffedee;
    	text-align: center;
    	cursor: pointer;
	    border-radius: 3px;
	    padding: 10px 0;
	    margin: 20px 0;
	}
	.book_botton span:hover {
        background-color: #ffd7d7;
	}
	
	.buyok {
		text-align: center;
	}
</style>