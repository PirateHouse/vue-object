<template>
	<div>	
		<breadcrumb>
			<span slot="item1">商品管理</span>
			<span slot="item2">商品分类</span>
		</breadcrumb>
		<el-card>
			<tree-table
		    :data="categoryList"
		    :columns="columns"
		    :selection-type="false"
		    :expand-type="false"
		    show-index
		    border
		    :show-row-hover="false"
		    style="width: 100%">
     	<template slot="isok" slot-scope="scope">
     		<i class="el-icon-success" v-if="scope.row.cat_deleted=== false" style="color: lightgreen;"></i>
     		<i class="el-icon-error" v-else style="color: red;"></i>
     	</template>
     	<template  slot="order" slot-scope="scope">
					<el-tag type="primary" v-if="scope.row.cat_level===0">一级</el-tag>
					<el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
					<el-tag type="warning" v-else>三级</el-tag>
     	</template>
     	<template slot="opt" slot-scope="scope">
     		<el-button type="primary" icon="el-icon-edit">编辑</el-button>
     		<el-button type="danger" icon="el-icon-delete">删除</el-button>
     	</template>
    </tree-table>
    <page :total='total'
    			:pagenum="queryInfo.pagenum"
    			:pagesize="queryInfo.pagesize"
    			@handleSizeChange="handleSizeChange"
    			@handleCurrentChange="handleCurrentChange"></page>
		</el-card>
		
	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	import Page from'components/Page'
	export default{
		components:{
			Breadcrumb,
			Page
		},
		data(){
			return{
				queryInfo:{
					type:3,
					pagenum:1,
					pagesize:5
				},
				total:0,
				categoryList:[],
				columns:[
				{
					label:'分类名称',
					prop:'cat_name'
				},
				{
					label:'是否有效',
					type:'template',
					template:'isok'
				},
				{
					label:'排序',
					type:'template',
					template:'order'
				},
				{
					label:'操作',
					type:'template',
					template:'opt'
				}
				
				]
			}
		},
		created(){
			this.getCategories()
		},
		methods:{
			async getCategories(){
				const{data:res}=await this.$http.get('categories',{params:this.queryInfo})
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.categoryList=res.data.result
				this.total=res.data.total
				console.log(res)
			},
			handleSizeChange(newSize){
				this.queryInfo.pagesize=newSize
				this.getCategories()
			},
			handleCurrentChange(newPage){
				this.queryInfo.pagenum=newPage
				this.getCategories()
			}
		}
	}
</script>

<style>
</style>