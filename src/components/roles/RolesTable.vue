<template>
	<div>
			<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column type="expand" >
		    	<template slot-scope="scope">
			    		<el-row v-for="(item,i) in scope.row.children"
			    						 :key="item.id" 
			    						 :class="[i === scope.row.children.length-1 ?'':'row-border','vcenter']">
					    		<el-col :span="5">
					    			<el-tag closable @close="removeRight(scope.row,item.id)">{{item.authName}}</el-tag>
					    			<i class="el-icon-caret-right"></i>
					    		</el-col>
					    		<el-col :span="19">
					    			<el-row v-for="(item1,i2) in item.children" :key="item1.id"
					    							 :class="[i2 === item.children.length-1 ?'':'row-border','vcenter']">
					    				<el-col :span="6">
					    					<el-tag  type="success"		closable @close="removeRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
					    					<i class="el-icon-caret-right"></i>
					    				</el-col>
					    				<el-col :span="18" >
					    					<el-tag type="danger" 
					    						v-for="item2 in item1.children" :key="item2.id"
					    						closable @close="removeRight(scope.row,item2.id)">{{item2.authName}}</el-tag>
					    				</el-col>
					    			</el-row>
					    		</el-col>
					    </el-row>
		    	
		    	
		    	</template>
		    </el-table-column>
		    <el-table-column type="index"  label="序号"></el-table-column>
		    <el-table-column  prop="roleName"  label="角色名称"></el-table-column>
		     <el-table-column  prop="roleDesc"  label="角色描述"></el-table-column>
		     <el-table-column lable="操作">
		     	<template slot-scope="scope">
		     		<el-button type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row)"></el-button>
		     		<el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoles(scope.row)"></el-button>
		     		<el-button type="warning" size="mini" icon="el-icon-setting" @click="setRolesTable(scope.row)"></el-button>
		     	</template>
		     </el-table-column>
		    
		     
	</el-table>
	
	 <!--修改权限弹框-->
		     <el-dialog
  title="修改角色"
  :visible.sync="editdialogVisible"
  width="50%"
  >
  	<el-form :model="rolesDialog" :rules="rolesDialogRules" ref="rolesDialogRef" label-width="100px" >
  <el-form-item label="角色ID" prop="id">
    <el-input v-model="rolesDialog.id" disabled></el-input>
  </el-form-item>
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="rolesDialog.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="rolesDialog.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRoles">确 定</el-button>
  </span>
</el-dialog>

	<!--分配权限弹框-->
			<el-dialog
  title="分配权限"
  :visible.sync="setRolesDialogVisible"
  width="50%"
  >
  		<el-tree
  			:data="setRolesTree"
			  :props="setRolesProps"
			  node-key="id"
			  :default-checked-keys="defKeys"
			  show-checkbox
			  default-expand-all	
			  @check-change="handleCheckChange"
			  ref="treeRef">
			</el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRolesDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
	
	</div>
</template>

<script>
	export default{
		props:{
			tableData:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				editdialogVisible:false,
				rolesDialog:{},
				rolesDialogRules:{
					roleName:[
						 { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
					]
				},
				setRolesDialogVisible:false,
				setRolesTree:[],
				setRolesProps:{
					label:'authName',
					children:'children'
				},
				roleId:null,
				defKeys:[]
				
			}
		},
		methods:{
			async removeRight(row,rightId){
				const confirmString=await	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
       if(confirmString!=='confirm'){
       	return this.$message.error('取消删除')
       }
				const {data:res}=await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				this.$message.success('权限取消成功')
				row.children=res.data
				
			},
			//打开dialog弹框
			openDialog(row){
				this.rolesDialog=row
				this.editdialogVisible=true
			},
			//提交修改后的数据
			editRoles(){
				this.$refs.rolesDialogRef.validate(async valid=>{
					if(!valid) return
					const{data:res} =await this.$http.put(`roles/${this.rolesDialog.id}`,{
						roleName:this.rolesDialog.roleName,
						roleDesc:this.rolesDialog.roleDesc
					})
					if(res.meta.status!==200){
						return this.$message.error(res.meta.msg)
					}
					this.$message.success('修改成功')
					this.editdialogVisible=false
				})
				
			},
			//删除角色
			async deleteRoles(row){
				const confirmString= await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmString!=='confirm'){
        	return this.$message.error('已取消删除')
        }
        const {data:res}=await this.$http.delete(`roles/${row.id}`)
        if(res.meta.status!==200){
        	return this.$message.error(res.meta.msg)
        }
        this.$message.success('角色删除成功')
        this.$emit('deleteRolesList')
			},
			//设置权限
			async setRolesTable(role){
				this.roleId=role.id
				const {data:res}=await this.$http.get('rights/tree')
				 if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }

				this.setRolesTree=res.data
				this.forRowRoles(role,this.defKeys)
				this.setRolesDialogVisible=true
			},
			
//			遍历当前元素,获取他们权限id
			forRowRoles(node,arr){
				 // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach(item => this.forRowRoles(item, arr))
			},
			//
			handleCheckChange(){
				console.log(this.setRolesTree)
			},
			    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      const idStr = keys.join(',')

      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }

      this.$message.success('分配权限成功！')
      this.$emit('allotRights1')
      this.setRolesDialogVisible = false
     
    }
		}
	}
</script>

<style scoped>
	.el-tag{
		margin:7px;
		
	}
	.row-border{
		border-bottom: 1px solid #ddd;
	}
	.vcenter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>