<template>
	<el-form :model="formInfo" :rules="formInfoRules" ref="formInfoRef" label-width="100px" >
  <el-form-item label="用户名" prop="name">
    <el-input v-model="formInfo.username" disabled></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="formInfo.email"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="formInfo.mobile"></el-input>
  </el-form-item>
 </el-form>
</template>

<script>
	export default{
		props:{
			formInfo:{
				type:Object,
				default(){
					return {}
				}
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

			return {
				formInfoRules:{
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
		}
	}
</script>

<style>
</style>