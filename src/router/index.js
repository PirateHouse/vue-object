import Vue from 'vue'
import VueRouter from 'vue-router'
const Login =()=> import('../views/Login')
const Home =()=> import('../views/Home')
const  Welcome =()=> import('../views/homeChilds/Welcome')
const Users=()=>import ('../views/homeChilds/Users')
const Roles=()=> import('../views/homeChilds/Roles')
const Rights=()=> import('../views/homeChilds/Rights')
const Goods=()=> import('../views/homeChilds/Goods')
const Add =()=>import('../views/homeChilds/Add')
const Params =()=>import('../views/homeChilds/Params')
const Categories=()=>import('../views/homeChilds/Categories')
const Order =()=>import('../views/homeChilds/Order')
const Reports=()=>import('../views/homeChilds/Reports')

Vue.use(VueRouter)

  const routes = [
  {
  	path:'',
  	redirect:'/login'
  },
  {
  	path:'/login',
  	component:Login
  },
  {
  	path:'/home',
  	component:Home,
  	redirect:'/welcome',
  	children:[
  		{
  			path:'/welcome',
  			component:Welcome
  		},
  		{
  			path:'/users',
  			component:Users
  		},
  		{
  			path:'/roles',
  			component:Roles
  		},
  		{
  			path:'/rights',
  			component:Rights
  		},
  		{
  			path:'/goods',
  			component:Goods
  		},
  		{
  			path:'/goods/add',
  			component:Add
  		},
  		{
  			path:'/params',
  			component:Params
  		},
  		{
  			path:'/categories',
  			component:Categories
  		},
  		{
  			path:'/orders',
  			component:Order
  		},
  		{
  			path:'/reports',
  			component:Reports
  		}
  	
  	]
  }
]

const router = new VueRouter({
  routes
})
//路由导航守卫
router.beforeEach((to,from,next)=>{
	//如果要跳转的是登录页面直接放行
	if(to.path==='/login'){
			return next()
	}
	//否则是其他页面先获取token值
		const tokenString =window.sessionStorage.getItem('token')
		//如果tokenString没有值或者无效，跳转登录页面
		if(!tokenString){
			return next('/login')
		}
		//否则放行
		next()

	
})

export default router
