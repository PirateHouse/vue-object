<template>
	<div>
		<breadcrumb>
			<span slot="item1">商品管理</span>
			<span slot="item2">分类参数</span>
			
		</breadcrumb>
		<el-card>
		<el-alert title="注意：只允许为第三级分类设置相关参数！"  type="warning"  show-icon :closable="false"></el-alert>
  	<el-row>
  		<el-col>选择商品分类：<cascader @changeCategory="changeCategory"></cascader></el-col>
  	</el-row>
		<many-only :tableData="tableData" :goodscat="goodscat"></many-only>
		
		</el-card>
	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	import Cascader from'components/Cascader'
	import ManyOnly from 'components/params/ManyOnly'
	export default{
		components:{
			Breadcrumb,
			Cascader,
			ManyOnly
		},
		data(){
			return{
				tableData:['动态参数','静态属性'],
				activeName:'many',
				goodscat:[]
			}
		},
		methods:{
			changeCategory(goodscat){
				this.goodscat=goodscat
			}
		}
	}
</script>

<style scoped>
	.el-row{
		margin-top:10px;
	}
</style>