<template>
	<div class="roles">
		<breadcrumb>
			<span slot="item1">权限管理</span>
			<span slot='item2'>角色列表</span>
		</breadcrumb>
		
		<el-card>
			<el-button type="primary" @click="addRoles">添加角色</el-button>
			<!--表单-->
			<roles-table :tableData="rolesList"
										@deleteRolesList="deleteRolesList"
										@allotRights1="allotRights1"
										></roles-table>
		</el-card>
		<!--添加表单弹框-->
		<add-roles-form :title="title"
									:EditDialogVisible="EditDialogVisible"
									@handleClose="handleClose"
									@cancelDialogVisible="cancelDialogVisible"
									@confirmDialogVisible="confirmDialogVisible"></add-roles-form>
		
	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	import AddRolesForm from'components/roles/AddRolesForm'
	import RolesTable from'components/roles/RolesTable'
	
	export default{
		components:{
			Breadcrumb,
			AddRolesForm,
			RolesTable
		},
		data(){
			return{
				title:'添加角色',
				EditDialogVisible:false,
				rolesList:[]
			}
		},
		created(){
			this.getRoleList()
		},
		methods:{
			addRoles(){
				this.EditDialogVisible=true
			},
			handleClose(){
				this.EditDialogVisible=false
			},
			//确认
			cancelDialogVisible(){
				this.EditDialogVisible=false
			},
			confirmDialogVisible(rolesInfo,rolesInfoRef){
			rolesInfoRef.validate(async valid=>{
				if(!valid) return
				const{data:res}=await this.$http.post('roles',rolesInfo)
				if(res.meta.status!==201){
					return this.$message.error(res.meta.msg)
				}
				
			})
				
				this.EditDialogVisible=false
			},
			//获取角色列表
			async getRoleList(){
				const{data:res}=await this.$http.get('roles')
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.rolesList=res.data
				
			},
			//角色删除成功后，重新刷新页面
			deleteRolesList(){
				this.getRoleList()
			},
			//设置权限后刷新页面
			allotRights1(){
				this.getRoleList()
			}
		}
		
	}
</script>

<style>
</style>