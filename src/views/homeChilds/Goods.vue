<template>
	<div>
		<breadcrumb>
			<span slot="item1">商品管理</span>
			<span slot="item2">商品列表</span>
		</breadcrumb>
		<el-card>
			<el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="closeGoods">
			    <el-button slot="append" icon="el-icon-search" @click="getGoodsList" ></el-button>
			</el-input>
			<el-button type="primary" @click="addGoods"> 添加商品</el-button>
					<el-table
		    :data="goodsList"
		    stripe
		    style="width: 100%">
		    <el-table-column type="index"  label="序号" ></el-table-column>
		    <el-table-column  prop="goods_name"  label="商品名称" ></el-table-column>
		    <el-table-column  prop="goods_price"  label="商品价格" width="70px"></el-table-column>
		    <el-table-column  prop="goods_weight"  label="商品重量" width="70px"></el-table-column>
		    <el-table-column  prop="upd_time"  label="更新时间" width="130px"></el-table-column>
		    <el-table-column    label="操作" width="130px">
		    	<template slot-scope="scope">
		    		<el-button type='primary' size="mini" icon="el-icon-edit"></el-button>
		    		<el-button type='danger' size="mini" icon="el-icon-delete"></el-button>
		    	</template>
		    </el-table-column>
		    
		   </el-table>
		   <!--页码-->
		  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
		   
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
			return {
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:100
				},
				goodsList:[],
				total:0
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(){
				const{data:res} =await this.$http.get('goods', {
        params: this.queryInfo
      })
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.goodsList=res.data.goods
				this.total=res.data.total
			
			},
			closeGoods(){
				this.queryInfo.query=''
				this.getGoodsList()
			},
			handleSizeChange(newSize){
				this.queryInfo.pagesize=newSize
				this.getGoodsList()
			},
			handleCurrentChange(newPage){
				this.queryInfo.pagenum=newPage
				this.getGoodsList()
			},
			addGoods(){
				this.$router.push('/goods/add')
			}
		}
	}
</script>

<style>
</style>