<template>
	<el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%"
  :before-close="handleClose">
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
	  <el-form-item label="用户名" prop="username">
	    <el-input v-model="addForm.username"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="password">
	    <el-input v-model="addForm.password"></el-input>
	  </el-form-item>
	  <el-form-item label="邮箱" prop="email">
	    <el-input v-model="addForm.email"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号" prop="mobile">
	    <el-input v-model="addForm.mobile"></el-input>
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
			addDialogVisible:{
				type:Boolean,
				default:false
			}
		},
		data(){
					   // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

			
			return{
				addForm:{
					username:'',
					password:'',
					email:'',
					mobile:''
				},
				addFormRules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					],
					email:[
						{ required: true, message: '请输入用户邮箱', trigger: 'blur' },
         		{ validator: checkEmail, trigger: 'blur' }
					],
					mobile:[
					 { required: true, message: '请输入用户手机', trigger: 'blur' },
          	{ validator: checkMobile, trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			cancelDialogVisible(){
				this.$emit('cancelDialogVisible')
			},
			confirmDialogVisible(){
				this.$emit('confirmDialogVisible',this.addForm,this.$refs.addFormRef)
			},
			handleClose(){
				this.$emit('handleClose')
			}
		}
	}
</script>

<style>
</style>