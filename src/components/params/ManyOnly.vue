<template>
	<div>
		<el-tabs tab-position="top"  @tab-click="tabClick" v-model="activeName" :before-leave="beforeTab"	>
		  <el-tab-pane :label="item":key="index" v-for="(item,index) in tableData" :name="select[index]" >
		  	
		  	<el-button type="primary" v-if="index===0"  :disabled="isShow" @click="addGoods">添加参数</el-button>
		  	<el-button type="primary" v-else :disabled="isShow" @click="addGoods">添加属性</el-button>
		  	<el-table
			    :data="manyOronly"
			    stripe
			    style="width: 100%">
			     <el-table-column  type="expand">
			     	<template slot-scope="scope">
			     		<el-tag  :key="i"  v-for="(tag,i) in scope.row.attr_vals"  closable  :disable-transitions="false"
							  @close="handleClose(row,i)">{{tag}}</el-tag>
							
							<el-input
						  class="input-new-tag"
						  v-if="scope.row.inputVisible"
						  v-model="scope.row.inputValue"
						  ref="saveTagInput"
						  size="small"
						  @keyup.enter.native="handleInputConfirm(scope.row)"
						  @blur="handleInputConfirm(scope.row)"
						>
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
							
		     	</template>
		     </el-table-column>
		    <el-table-column  type="index" label="序号"  ></el-table-column>
				<el-table-column  prop="attr_name"  label="参数名称" v-if="index===0"  ></el-table-column>
				<el-table-column  prop="attr_name"  label="属性名称"  v-else  ></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row)">删除</el-button>
					</template>
				</el-table-column>
		</el-table>
		  </el-tab-pane>
		</el-tabs>
		<!--修改弹框-->
		
		<el-dialog
			  :title="activeName==='many'?'修改商品参数':'修改商品属性'"
			  :visible.sync="editdialogVisible"
			  width="50%">
			  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" >
					  <el-form-item :label="activeName==='many'?'商品参数':'商品属性'" prop="attr_name">
					    <el-input v-model="editForm.attr_name"></el-input>
					  </el-form-item>
					  </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="editdialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addEditData">确 定</el-button>
			  </span>
			</el-dialog>
			
			<!--添加属性或者参数弹框-->
			<el-dialog
			  :title="activeName==='many'?'修改商品参数':'修改商品属性'"
			  :visible.sync="addDialogVisible"
			  width="50%">
			  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
					  <el-form-item :label="activeName==='many'?'商品参数':'商品属性'" prop="attr_name">
					    <el-input v-model="addForm.attr_name"></el-input>
					  </el-form-item>
					  </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="addDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addGoodsData">确 定</el-button>
			  </span>
			</el-dialog>
	</div>
</template>

<script>
	export default{
		props:{
			tableData:{
				type:Array,
			default:[]
			},
			goodscat:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				select:['many','only'],
				activeName:'many',
				manyOronly:[],
				editdialogVisible:false,
				editForm:{},
				editFormRules:{
					attr_name:[
						{ required: true, message: '请输入内容', trigger: 'blur' },
					]
				},
				addDialogVisible:false,
				addForm:{
					attr_name:''
				},
				addFormRules:{
					attr_name:[
						{ required: true, message: '请输入内容', trigger: 'blur' },
					]
				}
			}
		},
		computed:{
			isShow(){
				if(this.goodscat.length===3){
					 this.getTable()
					return false
				}
				return true
			},
			cateId(){
				if(this.goodscat.length===3){
					return this.goodscat[2]
				}
			}
			
		},
		methods:{
			//获取列表信息
			async getTable(){
				const{data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{
            params: { sel: this.activeName }
          })
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				
				 	res.data.forEach(item =>{
						 item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
						 //给每个item增加两个属性，是为了增加唯一
						 item.inputVisible=false,
						item.inputValue=''
					})
				
				this.manyOronly=res.data
			},
			//切换tab时
			tabClick(){
			//当页面发起切换时，调用对应的请求
				this.getTable()
			},
			//即将要切换tab时，
			beforeTab(activeName,oldActiveName){
				if(oldActiveName==='many'){
					this.activeName=activeName
					
				}
			},
			//当删除tag标签时
			handleClose(row,i){
				row.attr_vals.splice(i, 1)
      	this.saveAttrVals(row)
			},
			//点击时显示input框
			  showInput(row) {
        row.inputVisible = true;
      },
			  //当input失去焦点时，
		 handleInputConfirm(row){
			  	if(row.inputValue.trim().length===0){
			  		row.inputVisible = false;
			  		row.inputValue=''
			  		return
			  	}
			  // 如果没有return，则证明输入的内容，需要做后续处理
		      row.attr_vals.push(row.inputValue.trim())
		      row.inputValue = ''
		      row.inputVisible = false
			  	this.saveAttrVals(row)
			  	
			  },
			  // 将对 attr_vals 的操作，保存到数据库
    async saveAttrVals(row) {
      // 需要发起请求，保存这次操作
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('修改参数项失败！')
      }

      this.$message.success('修改参数项成功！')
    },
    //点击修改属性或参数时
    showEditDialog(row){
    	//获取商品分类或这属性的值
    	this.editForm=row
    	
    	this.editdialogVisible=true
    },
    //点击删除属性或者参数时
    async removeParams(row){
    	const confirmString=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmString!=='confirm'){
        	return this.$message.info('已取消删除！')
        }
         // 删除的业务逻辑
      const { data: res } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${row.attr_id}`
      )

      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败！')
      }

      this.$message.success('删除参数成功！')
      this.getTable()
      
    },
    //提交修改属性或者参数时
    addEditData(){
    	//如果验证没有问题提交数据
    this.$refs.editFormRef.validate(async valid=>{
    	if(!valid) return
     const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          { attr_name: this.editForm.attr_name, attr_sel: this.activeName }
        )
    if(res.meta.status!==200){
    	return this.$message.eroor(res.meta.msg)
    }	
    this.$message.success('修改成功')
		this.editdialogVisible=false
    })
    },
    //当点击添加商品按钮时
    addGoods(){
    	this.addDialogVisible=true
    },
    //添加商品
    addGoodsData(){
    	this.$refs.addFormRef.validate(async valid=>{
    		if(!valid)return
				const {data:res}=await this.$http.post(`categories/${this.cateId}/attributes`,{
					attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
				})
    		if(res.meta.status!==200){
    			return this.$message.error(res.meta.msg)
    		}
    		this.$message.success('添加成功')
    		this.getTable()
    		this.addDialogVisible=false
    	})
		}
	}
}
</script>

<style scoped>
	.el-tag{
		margin-right:5px;
	}
	.input-new-tag{
		width:200px;
	}
		
</style>