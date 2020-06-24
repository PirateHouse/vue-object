<template>
	<div>
		<!--面包屑导航-->
			<breadcrumb>
			<span slot='item1'>用户管理</span>
				<span slot='item2'>用户列表</span>
			</breadcrumb>
			<!--卡片区域-->
			<el-card>
				<!--搜索框和添加按钮-->
				<el-input placeholder="请输入内容"
									 v-model="queryInfo.query" 
									 class="input-with-select"
									 clearable
									 @clear="allUserInfo">
			    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
			  </el-input>
			  
			  <el-button type="primary" @click="addUsers">添加用户</el-button>
			  <!--表格区域-->
			  <el-table
			    :data="usersList"
			    stripe
			    style="width: 100%">
			    <el-table-column type="index" label="序号"></el-table-column>
			    <el-table-column prop="username"  label="用户名"></el-table-column>
			    <el-table-column prop="email"  label="邮箱"></el-table-column>
			    <el-table-column prop="mobile"  label="电话"></el-table-column>
			    <el-table-column prop="role_name"  label="角色"></el-table-column>
			    <el-table-column prop="mg_state"  label="状态">
			    	<template slot-scope="scope">
			    		<el-switch v-model="scope.row.mg_state" @change="changeMgState(scope.row)"></el-switch>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作"  width="200px">
			    	<template slot-scope="scope">
			    		<edit-info :row="scope.row"></edit-info>
			    		<delete-info  :rows="scope.row" @deleteInfo1="deleteInfo1"></delete-info>
			    		<el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
			    	</template>
			    </el-table-column>
			  </el-table>
			  <!--页码-->
			  <page :total="total"
			  			:pagenum="queryInfo.pagenum"
			  			:pagesize="queryInfo.pagesize"
			  			@handleCurrentChange="handleCurrentChange"
			  			@handleSizeChange="handleSizeChange"></page>
			  
			</el-card>
			<add-form-users :addDialogVisible="addDialogVisible"
											@cancelDialogVisible="cancelDialogVisible"
											@confirmDialogVisible="confirmDialogVisible"
											@handleClose="handleClose"
											></add-form-users>
	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	import Page from 'components/Page'
	import EditInfo from 'components/EditInfo'
	import DeleteInfo from 'components/DeleteInfo'
	import AddFormUsers from 'components/AddFormUsers'
	export default{
		components:{
			Breadcrumb,
			Page,
			EditInfo,
			DeleteInfo,
			AddFormUsers
		},
		data(){
			return{
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:2
				},
				usersList:[],
				total:0,
				addDialogVisible:false
				
			}
		},
		created(){
			this.getUserInfo()
		},
		methods:{
			async getUserInfo(){
				const{data:res}=await this.$http.get('users',{params:this.queryInfo})
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.usersList=res.data.users
				console.log(this.usersList)
				this.total=res.data.total
			},
			//跳转到第几页
			handleCurrentChange(newPage){
				this.queryInfo.pagenum=newPage
				this.getUserInfo()
			},
			//一页显示几条数据
			handleSizeChange(newSize){
				this.queryInfo.pagesize=newSize
				this.getUserInfo()
			},
			//修改状态
			async changeMgState(row){
				const{data:res} =await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
					//如果修改失败的话 ，还把状态设置为原样
					row.mg_state=!row.mg_state
				}
				this.$message.success('状态设置成功')
				
			},
			//删除用户后刷新网页
			async deleteInfo1(){
			
				this.getUserInfo()
			},
			//添加用户
			addUsers(){
				this.addDialogVisible=true
			},
			//取消
			cancelDialogVisible(){
					this.addDialogVisible=false
			},
			//确认
			confirmDialogVisible(addForm,addFormRef){
				addFormRef.validate(async valid=>{
					if(!valid) return
					const{data:res}=await this.$http.post('users',addForm)
					if(res.meta.status!==201){
						this.$message.error(res.meta.msg)
					}
					this.$message.success('添加用户成功')
					this.getUserInfo()
				})
				
					this.addDialogVisible=false
				
			},
			//log叉号
			handleClose(){
					this.addDialogVisible=false
				
			},
			//搜索用户信息
			searchUser(){
				this.getUserInfo()
			},
			//当点击清空搜索框后，获取所有的数据
			allUserInfo(){
				
				this.getUserInfo()
			}
			
		}
	}
</script>

<style scoped>

</style>