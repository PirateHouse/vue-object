<template>
	<el-dialog
  :title="title"
  :visible.sync="EditDialogVisible"
  width="50%"
  :before-close="handleClose"
  >
  <slot name="edit"></slot> 
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
		methods:{
			cancelDialogVisible(){
				this.$emit('cancelDialogVisible')
			},
			confirmDialogVisible(){
				this.$emit('confirmDialogVisible')
			},
			handleClose(){
				this.$emit('handleClose')
			}
		}
	}
</script>

<style>
</style>