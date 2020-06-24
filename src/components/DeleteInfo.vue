<template>
	<div class="delete-info">
		<el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteInfo"></el-button>
		
		
	</div>
</template>

<script>
	export default{
			props:{
			rows:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		methods:{
			async deleteInfo(){
			const confirmString=await	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
       if(confirmString!=='confirm'){
       	return this.$message.error('取消删除')
       }
       const {data:res}=await this.$http.delete(`users/${this.rows.id}`)
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.$message.success('删除成功')
				this.$emit('deleteInfo1')
			}
		}
	}
</script>

<style scoped>
	.delete-info{
		display: inline-block;
		margin-right:10px;
	}
</style>