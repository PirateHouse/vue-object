<template>
	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
	export default{
		props:{
			total:{
				type:Number,
				default:0
			},
			pagenum:{
				type:Number,
				default:1
			},
			pagesize:{
				type:Number,
				default:2
			}
		},
		methods:{
			handleCurrentChange(newPage){
				this.$emit('handleCurrentChange',newPage)
			},
			handleSizeChange(newSize){
				this.$emit('handleSizeChange',newSize)
			}
		}
	}
</script>

<style>
</style>