<template>
	 <el-cascader
    v-model="goodscat"
    :options="category"
    :props="{ expandTrigger: 'hover',label:cateProps.label,value:cateProps.value,children:cateProps.children }"
    @change="handleChange"></el-cascader>
</template>

<script>
	export default{
		data(){
		return{
			//所有分类保存
				category:[],
				cateProps:{
					label:'cat_name',
					value:'cat_id',
					children:'children'
			},
			//用户选中的选项id保存在这个数据中
			goodscat:[]
		}
		},
		created(){
			this.getCategories()
		},
		methods:{
			async getCategories(){
				const{data:res}=await this.$http.get('categories')
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.category=res.data
			},
			handleChange(){
				if(this.goodscat.length!==3){
					this.goodscat=[]
				}
				
				this.$emit('changeCategory',this.goodscat)
			}
		}
	}
</script>

<style>
</style>