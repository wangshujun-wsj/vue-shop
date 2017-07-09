<template>
	<div class="mainNavs">
		<ul class="menu">
			<li class="subMenu" @click.stop="subMenuOpen(index)" v-for="option, index in menu">
				<div class="subMenuTitle title">
					<span :class="{'active':subActive===index}">{{option.title}}</span>
					<i class="el-icon-arrow-down" :class="{icon_deg:subMenu===index}"></i>
				</div>
				<ul v-show="subMenu===index" class="menu">
					<li @click.stop="menuItemOpen(itemIndex)" v-for="item, itemIndex in option.menuItem">
						<div class="menuItemTitle title">
							<span :class="{'active':subActive===index&itemActive===itemIndex}">{{item.name}}</span>
							<i class="el-icon-plus add" v-if="isAdd" @click.stop="add(itemIndex)"></i>
							<i class="el-icon-arrow-down" :class="{icon_deg:menuItem===itemIndex}"></i>
						</div>
						<div @keyup.enter="addMenuItem(index, itemIndex)" @click.stop v-show="addItem===itemIndex" class="menuItem addItem">
							<input  v-focus="addItem===itemIndex" @click.stop type="text" v-model="addText" class="addInput"/>
							<span @click.stop="addMenuItem(index, itemIndex)" class="addSpan">确定</span>
						</div>
						<ul v-show="menuItem===itemIndex" class="menu">
							
							<li @click.stop="open(index,itemIndex,optionIndex,option.id)" :class="{'active':id===option.id&active===optionIndex}" class="menuItem" v-for="option, optionIndex in item.menuOptions">
								<div class="menuOptionsTitle title">
									<i @click.stop="del(index,itemIndex,optionIndex,option.id)" class="el-icon-minus del"></i>
									<span>{{option.name}}</span>
								</div>
							</li>
							
						</ul>
					</li>
				</ul>
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		props: {
			menu: {
				type: Array,
				default:[]
			},
			isAdd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 控制中间层展开
				subMenu: -1,
				// 控制最内层展开
				menuItem:-1,
				// 控制最内层当前选中的字体颜色
				active: -1,
				id: -1,
				// 控制当前选中的最内层的上一层字体颜色(和itemActive组合)
				subActive: -1,
				// 控制当前选中的最内层的最外层字体颜色
				itemActive: -1,
				addItem: -1,
				
				addText:''
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
		methods: {
			menuState(val,index) {
				if(val ===index) {
					return -1;
				}else {
					return index;
				}
			},
			/**
			 * 中间层的展开和折叠
			 */
			subMenuOpen(index) {
				this.subMenu = this.menuState(this.subMenu, index);
				this.menuItem = -1;
				this.addItem = -1;
			},
			/**
			 * 最内层的展开和折叠
			 */
			menuItemOpen(index) {
				
				let addItem = this.addItem;
				if(addItem===index&this.menuItem===index) {
					this.addItem = -1;
					this.addText = '';
				}
				if(addItem!=index) {
					this.addItem = -1;
				}
				this.menuItem = this.menuState(this.menuItem, index);
				
			},
			open(index,itemIndex,optionIndex,id) {
				this.active = optionIndex;
				this.id = id;
				this.subActive = index;
				this.itemActive = itemIndex;
				let itemArray = [index,itemIndex,optionIndex,id]
				this.$emit("listenOpen",itemArray);
			},
			del(index,itemIndex,optionIndex,id) {
				let indexArray = [index,itemIndex,optionIndex,id];
//				this.menu[index].menuItem[itemIndex].menuOptions.splice(optionIndex,1);
				this.$emit("listenDel",indexArray);
			},
			add(index) {
				this.addItem = this.menuState(this.addItem, index);
				this.addText = '';
			},
			addMenuItem(index,itemIndex) {
				let itemArray = [index,itemIndex,this.addText]
				this.$emit('addMenu', itemArray);
			}
		}
	}
</script>

<style scoped="scoped">
	.mainNavs {
		width: 100%;
		border: 1px solid #d1dbe5;
		box-sizing: border-box;
	}
	.mainNavs:hover {
		box-shadow: 0 0 8px 0 rgba(232,237,250,0.6),
		 0 2px 4px 0 rgba(232,237,250,0.5);
	}
	
	.mainNavs .menu {
		border-radius: 2px;
		list-style: none;
		position: relative;
		margin: 0;
		padding-left: 0;
		background-color: #eef1f6;
	}
	
	.subMenu .menu {
		background-color: #e4e8f1;
	}
	
	.mainNavs .title:hover {
		background-color: #C0CCDA;
	}
	
	.title {
		position: relative;
		padding-left: 15px;
		height: 50px;
		line-height: 50px;
		transition: background-color 0.5s;
	}
	
	.menuItem {
		font-size: 14px;
		color: #48576a;
		background-color: #d1dbe5;
		position: relative;
		transition: border-color .3s, background-color .3s, color .3s;
		box-sizing: border-box;
		white-space: nowrap;
	}
	
	.subMenuTitle {
		padding-left: 10px;
	}
	
	.title i:last-child {
		position: absolute;
		top: 50%;
		right: 20px;
		margin-top: -7px;
		transition: transform .3s;
		font-size: 12px;
	}
	
	.title i.add {
		position: absolute;
		top: 50%;
		right: 40px;
		height: 30px;
		width: 20px;
		margin-top: -24px;
		padding-top: 18px;
		padding-left: 15px;
		transition: -webkit-transform .3s;
		transition: transform .3s;
		transition: transform .3s, -webkit-transform .3s;
		font-size: 12px;
		cursor: pointer;
	}
	
	.title i.del {
		margin-right: 10px;
		font-size: 12px;
		cursor: pointer;
	}
	.icon_deg {
		transform: rotateZ(180deg);
		transition: transform .3s;
	}
	.active {
		color: #20a0ff;
	}
	
	.addItem {
		height: 30px;
		line-height: 30px;
	}
	.addInput {
		vertical-align: top;
		width: calc(100% - 40px);
	    height: 30px;
	    line-height: 30px;
	    border: none;
	    padding-left: 5px;
	    outline: none;
	}
	.addSpan {
		width: 40px;
		height: 30px;
   		line-height: 30px;
	}
</style>