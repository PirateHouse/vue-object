<template>
	<div>
			<breadcrumb>
				<span slot="item1">权限管理</span>
				<span slot="item2">权限列表</span>
			</breadcrumb>
			<el-card>
					 <el-table
		    :data="rightsTableData"
		    stripe
		    border
		    style="width: 100%">
		    <el-table-column type="index" label="序号"></el-table-column>
		    <el-table-column prop="authName"label="角色名称"></el-table-column>
		    <el-table-column prop="path"label="路径"></el-table-column>
		    <el-table-column prop="level"label="权限等级">
		    	<template slot-scope="scope">
		    		<el-tag type="primary" size="mini" v-if="scope.row.level==='0'">一级</el-tag>
		    		<el-tag type="danger" size="mini" v-else-if="scope.row.level==='1'">二级</el-tag>
		    		<el-tag type="warning" size="mini" v-else>三级</el-tag>
		    	</template>
		    	
		    </el-table-column>
				</el-table>
			</el-card>
	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	
	export default{
		components:{
			Breadcrumb
		},
		data(){
			return{
				rightsTableData:[]
			}
		},
		created(){
			this.getRights()
		},
		methods:{
			async getRights(){
				const {data:res}=await this.$http.get('rights/list')
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.rightsTableData=res.data
				console.log(this.rightsTableData)
			}
		}
	}
</script>

<style>
</style>