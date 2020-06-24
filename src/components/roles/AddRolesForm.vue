<template>
		<el-dialog
  :title="title"
  :visible.sync="EditDialogVisible"
  width="50%"
  :before-close="handleClose"
  >
 	<el-form :model="rolesInfo" :rules="rolesInfoRules" ref="rolesInfoRef" label-width="100px" >
		  <el-form-item label="角色名称" prop="roleName">
		    <el-input v-model="rolesInfo.roleName" ></el-input>
		  </el-form-item>
		   <el-form-item label="角色描述" prop="roleDesc">
		    <el-input v-model="rolesInfo.roleDesc"></el-input>
		  </el-form-item>
 </el-form>
 	
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialogVisible">取 消</el-button>
    <el-button type="primary" @click="confirmDialogVisible">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
		export default{
		props:{
			EditDialogVisible:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			}
			
		},
		data(){
			return{
				rolesInfo:{
					roleName:'',
					roleDesc:''
				},
				rolesInfoRules:{
					roleName:[
							 { required: true, message: '请输入角色名称', trigger: 'blur' },
            		{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
					],
				}
			}
		},
		methods:{
			cancelDialogVisible(){
				this.$emit('cancelDialogVisible')
			},
			confirmDialogVisible(){
				this.$emit('confirmDialogVisible',this.rolesInfo,this.$refs.rolesInfoRef)
			},
			handleClose(){
				this.$emit('handleClose')
			}
		}
	}
</script>

<style>
</style>


	