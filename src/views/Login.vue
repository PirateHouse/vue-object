<template>
	<div class="login">
		<div class="login-item">
			<!--logo图标-->
			<img src="~assets/logo.png" alt="" />
			<!--用户信息-->
			<el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="item-form">
			  <el-form-item l prop="username">
			  	
			    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
			  </el-form-item>
			  <el-form-item l prop="password">
			  	
			    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-s-goods"></el-input>
			  </el-form-item>
			  <el-form-item class="login-btn">
			  <el-button type="info" size="mini" @click="userInfoResetField">重置</el-button>
			  <el-button type="primary" size="mini" @click="login">确认</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				loginForm:{
					username:'admin',
					password:'123456'
				},
				loginFormRules:{
					username:[
							 { required: true, message: '请输入用户名', trigger: 'blur' },
           		 { min: 3, max: 12, message: '长度在 3 到12个字符', trigger: 'blur' }
					],
					password:[
						 { required: true, message: '请输入密码', trigger: 'blur' },
           	 { min: 6, max: 15, message: '长度在 6到15 个字符', trigger: 'blur' }
					]
				},
				
			}
		},
		methods:{
			//表单信息重置
			userInfoResetField(){
				this.$refs.loginFormRef.resetFields()
				
			},
			//点击登录
			async login(){
				const {data:res}=await this.$http.post('login',this.loginForm)
				if(res.meta.status!==200){
					return this.$message.error(res.meta.msg)
				}
				window.sessionStorage.setItem('token',res.data.token)
				this.$message.success('登录成功')
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped>
	.login{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2b4b6b;
		height:100%;
	}
	.login-item{
		width:450px;
		height:300px;
		background-color: #fff;
		border-radius:7px;
		position: relative;
	}
	
	.login-item img{
		width:130px;
		height:130px;
		position:absolute;
		left:50%;
		transform: translate(-50%,-50%);
		border:10px solid #fff;
		border-radius: 50%;
		background-color: #eee;
		box-shadow: 0 0 10px #ddd;
		
	}
	.item-form{
		position:absolute;
		bottom:0;
		width:100%;
		padding:0 20px;
		box-sizing: border-box;
	}

	.login-btn{
		display: flex;
		justify-content: flex-end;
			}
</style>