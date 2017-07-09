<template>
  <div class="header">
  	<div>
	    <div class="logo" @click="home">
	    	<img src="../assets/logo.png"/>
	    </div>
	    <div class="nav">
	    	<ul>
	    		<li @click.stop="dialogShow(1)" :class="{login:islogin}">{{loginName}}</li>
	    		<li @click.stop="dialogShow(2)">关于</li>
	    	</ul>
	    </div>
   </div>
    <v-dialog :is-show="dialog===1"  @on-close="closeDialog(dialog===1)" >
    	<v-login @isLogin="login"></v-login>
    </v-dialog>
    <v-dialog :is-show="dialog===2"  @on-close="closeDialog(dialog===2)">
    	【当当】全球知名的综合性网上购物商城，百万种商品，品质保证，涵盖图书、童书、服装、百货、电子书等品类，全场2.9折起！提供货到付款和多种线上支付方式，上门退货、当面退款。
    </v-dialog>
  </div>
</template>

<script>
	import dialog from './dialog.vue'
	import login from './login.vue'
export default {
  name: 'header',
  data () {
    return {
      dialog: -1, // 点击的是关于还是登录
      loginName: '登录',
      islogin: false // 是否登录
    }
  },
  methods: {
  	dialogShow(id) {
  		// 已登录
  		if(id===1&&this.islogin) {
  			return;
  		}
  		this.dialog=id;
  	},
  	closeDialog() {
  		this.dialog=-1;
  	},
  	login(data) {
  		this.dialog=-1;
  		this.loginName = '['+data+']';
  		this.islogin =true;
  	},
  	home() {
  		this.$router.push({path:'/'})
  	}
  },
  components: {
  	'v-dialog': dialog,
  	'v-login': login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header {
		width: 100%;
		line-height: 60px;
		background-color: #D3DCE6;
		position: fixed;
		top: 0;
		z-index: 2;
	}
	.logo {
		float: left;
		padding-left: 20px;
		cursor: pointer;
	}
	.logo img {
		height: 50px;
		transition: all .5s;
	}
	.logo img:hover {
		transform: rotate(360deg);
	}
	.nav {
		float: right;
		vertical-align: middle;
	}
	.nav ul {
		    overflow: hidden;
	}
	.nav li {
		float: left;
		cursor: pointer;
		padding-right: 20px;
	}
	.nav li.login {
		color: red;
		cursor: default;
	}
</style>
