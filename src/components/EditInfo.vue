<template>
	<div class="editInfo">
		<el-button type="primary" size="mini" icon="el-icon-edit" @click="editInfo"></el-button>
		<edit-dialog 
									:EditDialogVisible="EditDialogVisible"
									@cancelDialogVisible="cancelDialogVisible"
									@confirmDialogVisible="confirmDialogVisible"
									@handleClose="handleClose"
									:title="title">
	
			<edit-form-info :formInfo="row"  ref="formInfoRef" slot="edit"></edit-form-info>
	
		</edit-dialog>
	</div>
</template>

<script>
	import EditDialog	from './EditDialog'
	import EditFormInfo from './EditFormInfo'
	export default{
		props:{
			row:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		components:{
			EditDialog,
			EditFormInfo
		},
		data(){
			return{
				EditDialogVisible:false,
				title:'修改用户信息'
			}
		},
		methods:{
			//取消
			cancelDialogVisible(){
				this.EditDialogVisible=false
			},
			//确认
			 async confirmDialogVisible(){

						const editInfos={email:this.row.email,mobile:this.row.mobile}
						const {data:res} =await this.$http.put(`users/${this.row.id}`,editInfos)
						if(res.meta.status!==200){
							return this.$message.error(res.meta.msg)
						}
						this.$message.success('修改成功')
			
						this.EditDialogVisible=false
				
				
			},
			handleClose(){
				this.EditDialogVisible=false
			},
			editInfo(){
				this.EditDialogVisible=true
				
			},
			
		}
	}
</script>

<style scoped>
	.editInfo{
		display: inline-block;
		margin-right:10px;
	}
</style>