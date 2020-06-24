<template>
	<div>
		<breadcrumb>
			<span slot="item1">数据统计</span>
			<span slot="item2">数据列表</span>
		</breadcrumb>
		<el-card>
		 <div id="main" style="width: 600px;height:400px;"></div>
		</el-card>
	</div>
</template>

<script>
	//导入echarts
	import  echarts from 'echarts'
	import _ from 'lodash'
	import Breadcrumb from'components/Breadcrumb'
	export default{
		components:{
			Breadcrumb
		},
		data(){
			return{
				//将要合并的数据，是文档中粘贴过来的
				options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
			}
		},
		//echarts只能在元素渲染完毕后加载
		async mounted(){
			 // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
	
				//获取后台数据
			const { data: res } = await this.$http.get('reports/type/1')
		    if (res.meta.status !== 200) {
		      return this.$message.error('获取折线图数据失败！')
		    }
        // 指定图表的配置项和数据
        //将两个对象 合并成一个用lodash的放大
      const result =_.merge(res.data,this.options)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result);
		}
	}
</script>

<style>
</style>