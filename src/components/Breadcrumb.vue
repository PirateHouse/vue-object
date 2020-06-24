<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><slot name="item1"></slot></el-breadcrumb-item>
  <el-breadcrumb-item><slot name="item2"></slot></el-breadcrumb-item>
 </el-breadcrumb>
</template>

<script>
	export default{
		
	}
</script>

<style>
</style>