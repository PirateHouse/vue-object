<template>
	<el-container>
  <el-header class="home-top">
  	<div class="home-info"> 
  		<img src="~assets/heima.png" class="home-logo" />
  		<span class="home-title">电商后台管理系统</span>
  	</div>
  	<el-button type="info" @click="toLogin">退出</el-button>
  </el-header>
  <el-container>
  	<!--左边列表信息-->
    <el-aside width="200px">
    	 <el-menu
	       :default-active="activePath"
		      background-color="#333744"
		      text-color="#fff"
		      unique-opened	
		      router
		      active-text-color="#409EFF">
	      <el-submenu :index="item.id+''" v-for="item in homeMenusList" :key="item.id">
	        <template slot="title">
	          <i :class="iconsObj[item.id]" class="title-icon"></i>
	          <span>{{item.authName}}</span>
	        </template>
	        <el-menu-item :index="'/'+item1.path" 
							        	v-for="item1 in item.children" 
							        	:key="item1.id"
							        	@click="saveMain('/'+item1.path)">{{item1.authName}}</el-menu-item>
	       
	     </el-submenu>
    </el-menu>
    	
    </el-aside>
    <el-main class='main'>
    		<router-view ></router-view>
    	
    </el-main>
  </el-container>
</el-container>
</template>

<script>
	export default{
		data(){
			return{
				homeMenusList:[],
				activePath:'',
				iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
			}
		},
		created(){
			//获取左边列表数据
			this.getMenusInfo()
			//页面一刷新获取window下保存的activePath
			this.activePath=window.sessionStorage.getItem('activePath')
		},
		methods:{
			//退出按钮
			toLogin(){
				this.$router.push('/login')
			},
			//获取左边列表信息
			async getMenusInfo(){
				const {data:res}=await this.$http.get('menus')
			if(res.meta.status!==200){
				return this.$message.error(res.meta.msg)
			}
			this.homeMenusList=res.data
			},
			saveMain(newPath){
				//将现在活动的路径保存到activePath
				this.activePath=newPath
				//现在window中保存一份
				window.sessionStorage.setItem('activePath',newPath)
			//跳转页面用elementui的组件中有一个router属性 就可以直接在index的基础上跳转不需要发起this.$router
			}
		}
	}
</script>

<style scoped>
	.home-top{
		background-color:#373d41;
		display: flex;
		justify-content: space-between;
		align-items:center;
	}
	.home-info{
		display:flex;
		align-items:center;
		font-size:20px;
		color:#fff;
	}
	.home-logo{
		margin-right:20px;
	}
	.el-aside{
		background-color:#373d41;
	}
	.title-icon{
		margin-right:3px;
	}
	.main{
		background-color:#eee;
	}
</style>