<template>
	<div class="booklist">
		<div v-for="m,i of menu">
			<div class="booklist" v-for="item,index of m.menuItem">
				<div class="bookTitle">
					{{item.name}}
				</div>
				<div class="books" v-for="option, op of item.menuOptions">
					<a @click.stop="buyBook(i,index,op,option.id)"><img :src="option.src" /></a>
					<div>{{option.name}} </div>
					<div>￥{{option.price}}<span @click.stop="buyBook(i,index,op,option.id)">详情</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'booklist',
		
		props: {
			menu: {
				type: Array,
				default:[]
			}
		},
		data() {
			return {

			}
		},
		methods: {
			buyBook(index,itemIndex,optionIndex,id) {
				let item = this.menu[index].menuItem[itemIndex].menuOptions[optionIndex];
				console.log(index+' '+itemIndex+' '+optionIndex+' '+id)
				this.$router.push({path:'/details/'+id,query:{item:JSON.stringify(item)}})
			},
		}
	}
</script>

<style scoped="scoped">
	.bookTitle {
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		font-size: 20px;
		background-color: #EFF2F7;
	}
	.books {
		width: 300px;
		display: inline-block;
	}
	.books div {
		font-size: 16px;
		padding: 5px 10px;
		height: 20px;
		line-height: 20px;
	}
	.books div:last-child {
		color: red;
		padding: 10px;
	}
	.books div:last-child span {
		height: 28px;
	    line-height: 28px;
	    background: #ff2832;
	    border-radius: 3px;
	    display: inline-block;
	    color: #fff;
	    text-align: center;
	    font-family: 'Microsoft Yahei';
	    font-size: 14px;
	    padding: 0 10px;
	    margin-left: 80px;
		cursor: pointer;
	}
	.books a {
		cursor: pointer;
	}
</style>