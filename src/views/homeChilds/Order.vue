<template>
	<div>
		<breadcrumb>
			<span slot="item1">订单管理</span>
			<span slot="item2">订单列表</span>
		</breadcrumb>
		<el-card>
			<el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" >
            <el-button slot="append" icon="el-icon-search"  ></el-button>
          </el-input>
        </el-col>
      </el-row>
			
			
			<el-table
    :data="orderList"
	    stripe
	    border
	    style="width: 100%">
    		<el-table-column type="index"  label="序号" ></el-table-column>
    		<el-table-column prop="order_number"  label="订单编号"  ></el-table-column>
    		<el-table-column prop="order_price"  label="订单价格" width="100px" ></el-table-column>
    		<el-table-column prop="pay_status"  label="是否付款"  width="100px" >
    			<template slot-scope="scope">
    				<el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
    				<el-tag type="danger" v-else>未付款</el-tag>
    			</template>
    		</el-table-column>
    		<el-table-column prop="is_send"  label="是否发货"  width="100px" ></el-table-column>
    		<el-table-column prop="create_time"  label="下单时间"  ></el-table-column>
    		<el-table-column  label="操作"  >
    			<template slot-scope="scope">
    				<el-button type="primary" size="mini" icon="el-icon-edit" @click="editOrderList"></el-button>
    				<el-button type="success" size="mini" icon="el-icon-location" @click="showProgressBox"></el-button>
    			</template>
    		</el-table-column>
    </el-table>
    <page :total='total'
    			:pagenum="queryInfo.pagenum"
    			:pagesize="queryInfo.pagesize"
    			@handleSizeChange="handleSizeChange"
    			@handleCurrentChange="handleCurrentChange"></page>
	
		</el-card>
		
		<!--修改地址弹框-->
		<el-dialog
  title="修改地址"
  :visible.sync="editOrderDialogVisible"
  width="50%"
  @close="addressDialogClosed"
  >
  <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
  <el-form-item label="省市区/县" prop="address1">
   	 <el-cascader v-model="addressForm.address1"  :options="cityData"></el-cascader>
  </el-form-item>
  <el-form-item label="详细地址" prop="address2">
    <el-input v-model="addressForm.address2"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editOrderDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editOrderDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>

	</div>
</template>

<script>
	import Breadcrumb from 'components/Breadcrumb'
	import Page from 'components/Page'
	import cityData from './citydata'
	export default{
		components:{
			Breadcrumb,
			Page
		},
		data(){
			return{
				orderList:[],
				queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
				},
				 total:0,
				 editOrderDialogVisible:false,
				 cityData,
				 addressForm:{
				 	address1:[],
				 	address2:''
				 },
				addressFormRules :{
					address1:[
						  { required: true, message: '请输入省市区/县', trigger: 'blur' },
					],
					address2:[
					{ required: true, message: '请输入详细地址', trigger: 'blur' },]
				},
				progressVisible:false,
				progressInfo:[]
    
			}
		},
		created(){
			this.getOrderList()
		},
		methods:{
			async getOrderList(){
			const{data:res}=await this.$http.get('orders', {
        params: this.queryInfo
      })
			if(res.meta.status!==200){
				return this.$message.error(res.meta.msg)
			}
			
			this.orderList=res.data.goods
			this.total=res.data.total
			},
			handleSizeChange(newSize){
				this.queryInfo.pagesize=newSize
				this.getOrderList()
			},
			handleCurrentChange(newPage){
				this.queryInfo.pagenum=newPage
				this.getOrderList()
			},
			editOrderList(){
				this.editOrderDialogVisible=true
			},
		addressDialogClosed(){
			this.$refs.addressFormRef.resetFields()
		},
		 async showProgressBox(){
			 const { data: res } = await this.$http.get('/kuaidi/1106975712662')

      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败！')
      }

      this.progressInfo = res.data

      this.progressVisible = true
		},
		
		}
	}
</script>

<style>
</style>