/**
 * 可输入可选择下拉框
 */

<template>
	<div id="combobox" ref="combobox" class="combobox">
		<div class="combobox_head" @click.stop="handleClick(1)" @keyup.enter="selectOption">
			<input type="text" @change="change" v-focus="focusChange"
				@click.stop="handleClick(1)"
				@keyup.up="navigateOptions('prev')"
				@keyup.down="navigateOptions('next')" 
				@keyup.esc="visible=false" :readonly="readonly"
				v-model="combobox_text" class="combobox_input" :placeholder="placeholder" />
			<i class="combobox_icon el-icon-caret-top" @click.stop="handleClick(2)" :class="{icon_deg:!visible}">
			</i>
		</div>
		<div class="combobox_body" ref="comBody" v-show="visible">
			<div class="combobox_option" @mouseenter="hoverItem(index)" 
				@click.stop="handleOptionSelect(item.name,index)"
				:class="{combobox_select:selected===index,hover:hoverIndex===index}"
				v-for="item,index of options" v-text="item.name">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"combobox",
		props: {
	      	placeholder: {
		        type: String,
		        default: '请选择'
	      	},
	      	options: {
	      		type:Array,
	      		default: []
	      	},
	      	text: {
	      		type: String,
	      		default: ''
	      	}
	    },
		data() {
			return {
				combobox_text: this.text,
				disabled: false,
				visible: false,
				readonly: false,
				inputVisible: true,
				hoverIndex: -1,
				focusChange: true,
				/*options: [
					{id:1,name:'电气1'},
					{id:2,name:'电气2'},
					{id:3,name:'电气3'},
					{id:4,name:'电气4'}
				]*/
			}
		},
		directives: {
			// 自定义指令
			focus:{
				update:function(el,{value}) {
					if(value) {
						el.focus();
					}
				}
			},
		},
		mounted () {
			let _this = this;
			// 点击空白隐藏下拉框
			let visibleHide = function(e) {
				if (!_this.$el.contains(e.target)&& _this.visible) {
       				_this.visible = false;
       			}
			}
			document.removeEventListener('mouseup',visibleHide,false);
			document.addEventListener('mouseup',visibleHide,false);
   			
		},
		computed: {
			selected() {
				let options = this.options;
				for(let i=0;i<options.length;i++) {
					if(this.combobox_text==options[i].name) {
						return i;
					}
				}
				return -1;
			}
		},
		methods: {
			change(val, oldVal) {
				if(typeof val != 'string') {
					this.inputVisible = false;
					val = val.target.value;
				}
				this.$emit('change',val);
			},
			handleClick(num) {
				if(num==2) {
					this.focusChange = !this.focusChange;
				}
				
//				判断下拉框显示位置
				
				// 当前元素到顶部距离
				let top = this.$refs.combobox.offsetTop;
				// 当前元素高度
				let height = this.$refs.combobox.clientHeight;
				// 当前所能看见的屏幕高度
				let screenHeight = document.documentElement.clientHeight;
				// 滚动条滚动的距离
				let scrollTop = document.body.scrollTop;
				// 当前元素到底部距离(要减去当前元素高度)
				let bottom = screenHeight - (top-scrollTop+height);
				let sumHeight = this.options.length*height;
				if(sumHeight+10>bottom) {
					this.$refs.comBody.style.top = (sumHeight+5)*-1+"px";
				}
				
				
				this.visible=!this.visible;
				this.hoverIndex = this.selected;
			},
			handleOptionSelect(text, index) {
				this.inputVisible= true;
				if(this.combobox_text!=text) {
					this.change(text,this.combobox_text);
				}
				this.selected = index;
				this.visible=!this.visible;
				this.combobox_text = text;
			},
			hoverItem(index) {
				this.focusChange = false;
				this.hoverIndex = index;
			},
			selectOption(){
				if(this.options[this.hoverIndex]&& this.inputVisible&& this.visible) {
					this.handleOptionSelect(this.options[this.hoverIndex].name,this.hoverIndex);
				}
				this.visible = false;
			},
			navigateOptions(direction) {
				if(!this.visible) {
					this.visible = true;
					return;
				}
				if(direction==="next") {
					this.hoverIndex++;
					if(this.hoverIndex === this.options.length) {
						this.hoverIndex = 0;
					}
				}else if(direction==="prev") {
					this.hoverIndex--;
					if(this.hoverIndex < 0) {
						this.hoverIndex = this.options.length - 1;
					}
				}
				this.focusChange = false;
			}
		}
		
	}
</script>

<style>
	.combobox {
		position: relative;
		width: 100%;
		cursor: pointer;
		-webkit-user-select: none;
	}
	.combobox_head {
		width:100%;
		height: 36px;
		border:1px solid #a9a9a9;
    	border-radius: 4px;
    	box-sizing: border-box;
	}
	
	.combobox_input {
		height: 100%;
		width: calc(100% - 40px);
		border: none;
		outline: none;
		background: #fff;
		padding: 0 5px;
		cursor: pointer;
    	box-sizing: border-box;
	}
	.combobox_icon {
		text-align: center;
		color: #bfcbd9;
		width: 30px;
		transition: transform .3s;
	}
	.combobox_body {
		z-index: 5;
    	box-sizing: border-box;
		position: absolute;
    	top: 45px;
    	width: 100%;
		border: 1px solid #d1dbe5;
		border-top:0;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
	}
	.combobox_option {
		font-size: 14px;
		padding: 8px 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #48576a;
		height: 36px;
		line-height: 1.5;
		box-sizing: border-box;
		background-color: #F9FAFC; 
	}
	.combobox_select {
		background-color: #20a0ff; 
		color:#fff;
	}
	.combobox_select.hover {
		background-color: #1c8de0;
	}
	.hover{
		background-color: #e4e8f1;
	}
	.icon_deg {
		transform: rotateZ(180deg);
		transition: transform .3s;
	}
</style>