<template>
	<div>
		<breadcrumb>
			<span slot="item1">商品管理</span>
			<span slot="item2">商品列表</span>
		</breadcrumb>
		<el-card>
			<el-alert title="添加商品信息"   type="info" center show-icon :closable="false">  </el-alert>
  		<el-steps :space="200" :active="activeName-0" finish-status="success" align-center	>
			  <el-step title="基本信息"></el-step>
			  <el-step title="商品参数"></el-step>
			  <el-step title="商品属性"></el-step>
			  <el-step title="商品图片"></el-step>
			  <el-step title="商品内容"></el-step> 
			  <el-step title="完成"></el-step>
			 
			</el-steps>
			<el-form :model="addGoods" :rules="addGoodsRules" ref="addGoodsRef" label-width="100px" >
			<el-tabs tab-position="left" style="height: 100%;" v-model="activeName" :before-leave="beforeTabsClick" @tab-click="tabClick"> 
		    <el-tab-pane label="基本信息" name="0">
						  <el-form-item label="商品名称" prop="goods_name">
						    <el-input v-model="addGoods.goods_name"></el-input>
						  </el-form-item>
						  <el-form-item label="商品价格" prop="goods_price">
						    <el-input v-model="addGoods.goods_price"></el-input>
						  </el-form-item>
						  <el-form-item label="商品数量" prop="goods_number">
						    <el-input v-model="addGoods.goods_number"></el-input>
						  </el-form-item>
						  <el-form-item label="商品重量" prop="goods_weight">
						    <el-input v-model="addGoods.goods_weight"></el-input>
						  </el-form-item>
						  <el-form-item label="商品分类" prop="goods_cat" >
						   		<cascader @changeCategory="changeCategory"></cascader>
						  </el-form-item>
		    
		    </el-tab-pane>
		    <el-tab-pane label="商品参数" name="1">
		    	<div  v-for='item in manyTableData' >
		   					<p>{{item.attr_name}}</p>
		    		 <el-tag type='primary' v-for="(item1,i) in item.attr_vals"v-model="i"  border>{{item1}}</el-tag>
		    	</div>
		    	
		    </el-tab-pane>
		    <el-tab-pane label="商品属性" name="2">
		    	<el-form-item :label="item.attr_name" v-for="item in onlyTableData" label-width="150px">
		    			  <el-input v-model="item.attr_vals"></el-input>
		    	</el-form-item>
		    	
		    </el-tab-pane>
		    <el-tab-pane label="商品图片" name="3">
		    	 <el-upload
					  class="upload-demo"
					  :action="uploadURL"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  list-type="picture"
					  :headers="headerObj"
					  :on-success="handleSuccess">
					  <el-button size="small" type="primary">点击上传</el-button>
		
					</el-upload>
		    	
		    </el-tab-pane>
		    <el-tab-pane label="商品内容" name="4">
		    	<quill-editor v-model="addGoods.goods_introduce"/>
		    	<el-button type="primary" @click="add"> 提交</el-button>
		    </el-tab-pane>
		  </el-tabs>
		</el-form>
		</el-card>
		
		 <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>
	</div>
</template>

<script>
	import _ from 'lodash'
	import Breadcrumb from 'components/Breadcrumb'
	import Cascader from 'components/Cascader'
	export default{
		components:{
			Breadcrumb,
			Cascader
		},
		data(){
			return{
				activeName:'0',
				addGoods:{
					goods_name:'',
					goods_price:0,
					goods_number:0,
					goods_weight:0,
					//商品分类的id值
					goods_cat:[],
					//图片的临时路径
					pics:[],
					//商品描述
					goods_introduce:'',
					attrs:[]
				},
				addGoodsRules:{
					goods_name:[
							{ required: true, message: '请输入商品名称', trigger: 'blur' },
            	{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
					],
					goods_price:[
										{ required: true, message: '请输入商品价格', trigger: 'blur' },
									],
					goods_number:[
							{required: true, message: '请输入商品数量', trigger: 'blur' },
								],
					goods_weight:[
								{required: true, message: '请输入商品重量', trigger: 'blur' },
								],
					goods_cat:[
							{required: true, message: '请输入商品分类', trigger: 'blur' },
					]
				},
				
				manyTableData:[],
				onlyTableData:[],
				//上传图片地址
				uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
				// 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath:'',
      previewVisible:false
			}
		},
		methods:{
			//用户选择了商品分类后，将保存分类的返回
			changeCategory(goodscat){
				this.addGoods.goods_cat=goodscat
			},
			//在tag页切换之前判断是否为第一页，并且分类数据有值
			beforeTabsClick(activeName, oldActiveName){
			if(oldActiveName==='0'&&this.addGoods.goods_cat.length!==3){
				this.$message.error('请选择商品分类')
				return false
			}
			},
			
			//当切换tag页面后，获取对应的值
			async tabClick(){
				if(this.activeName==='1'){
					const{data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{
            params: { sel: 'many' }
          })
					if(res.meta.status!==200){
						return this.$message.error(res.meta.msg)
					}
					//因为要把item.attr_vals中以空格分开的字符串 渲染成独立的tag，先转换成数组
					res.data.forEach(item =>{
						item.attr_vals=item.attr_vals.split(' ')
					})
					this.manyTableData=res.data
					console.log(this.manyTableData)
				}else if(this.activeName==='2'){
					const{data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{
            params: { sel: 'only' }
          })
					if(res.meta.status!==200){
						return this.$message.error(res.meta.msg)
					}
					this.onlyTableData=res.data
					console.log(this.onlyTableData)
				}
			},
		//当文件图片上传成功时，返回一个临时路径
		handleSuccess(response){
			//获取临时路径
			const picInfo ={pic:response.data.tmp_path}
			//将临时路径放到数组中
			this.addGoods.pics.push(picInfo)
		},
		//图片预览获取图片的url地址
		handlePreview(file){
			
			this.previewPath=file.response.data.url
			this.previewVisible = true
		},
		//删除预览图片时
		handleRemove(file){
			//获取要删除图片的临时路径
			const temPath=file.response.data.tmp_path
			//从数组中找到这个路径并删除
			const index=this.addGoods.pics.findIndex( item =>{
				item.pic ===temPath
			})
			//从数组中删除这个下标
			this.addGoods.pics.splice(index,1)
		},
		//提交添加商品
		add(){
			this.$refs.addGoodsRef.validate( async valid=>{
				if(!valid) return this.$message.error('请填写必填项')
				const form =_.cloneDeep(this.addGoods)
				//因为提交参数时，goods_cat是字符串，
				form.goods_cat=form.goods_cat.join(',')
				
				//将many类型的数据存放到对象中，push到addGoods中
				this.manyTableData.forEach(item =>{
					const tableData={
						attr_id:item.attr_id,
						attr_value:item.attr_vals.join(' ')
					}
					this.addGoods.attrs.push(tableData)
				})
				//将only类型的数据存放到对象中，push到addGoods中
				this.onlyTableData.forEach(item =>{
					const tableData={
						attr_id:item.attr_id,
						attr_value:item.attr_vals
					}
					this.addGoods.attrs.push(tableData)
				})
				form.attrs=this.addGoods.attrs
				const{data:res} =await this.$http.post('goods', form)
				if(res.meta.status!==201){
					return this.$message.error(res.meta.msg)
				}
				this.$router.push('/goods')
			})
		}
		},
	computed: {
    cateId() {
      if (this.addGoods.goods_cat.length === 3) {
        return this.addGoods.goods_cat[2]
        console.log(this.addGoods.goods_cat[2])
      }
      return null
    }
  }
		
	}
</script>

<style scoped>
	.el-steps{
		margin-top:20px;
	}
	.el-tag {
		margin:5px;
	}
	.previewImg{
		width:100%;
	}

</style>