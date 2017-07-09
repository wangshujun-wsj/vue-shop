<template>
	<div class="login">
		<div class="form-line">
			<span class="form-label">用户名：</span>
			<div class="form-input">
				<input type="text" v-model="usernameModel" placeholder="请输入用户名">
			</div>
			<span class="form-error">{{ userErrors.errorText }}</span>
		</div>
		<div class="form-line">
			<span class="form-label">密码：</span>
			<div class="form-input">
				<input type="password" v-model="passwordModel" placeholder="请输入密码">
			</div>
		</div>
		<div class="form-line">
			<div class="form-btn">
				<a class="button" @click.stop="onLogin">登录</a>
				<a class="button"  @click.stop="onreg">注册</a>
			</div>
		</div>
		<p>{{ errorText }}</p>
	</div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: 'admin',
      passwordModel: '123456',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if (this.usernameModel.trim()==='') {
        status = false
        errorText = '用户名禁止为空'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status) {
        this.errorText = this.userErrors.errorText;
      }
      else {
        this.errorText = '';
        this.$emit('isLogin', this.usernameModel);
      }
    },
    onreg() {
    	this.errorText = '注册功能未开放';
    }
  }
}
</script>

<style scoped>
	
	.form-line {
		padding: 15px 0;
	}
	.form-label {
		width: 100px;
	    font-size: 16px;
	    display: inline-block;
	}
	.form-input {
		display: inline-block;
	}
	.form-error {
	    color: red;
	    padding-left: 15px;
	}
	.form-input input {
	    height: 30px;
	    width: 200px;
	    line-height: 30px;
	    vertical-align: middle;
	    padding: 0 10px;
	    border: 1px solid #ccc;
	    border-radius: 3px;
	}
	
	.button {
	    display: inline-block;
	    padding: 10px 20px;
	    margin: 0 50px;
	    border-radius: 5px;
	    cursor: pointer;
	    background: #4db3ff;
    	border-color: #4db3ff;
    	color: #fff;
	}
</style>