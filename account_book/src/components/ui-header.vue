<script>
// 引入 echarts 核心模块
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default{
    props: ['zsz', 'szbData', 'zzbData'],
    data() {
        return {
            datePer: undefined
        }
    },
    methods: {
        sChartStart() {
            // 收入占比初始化图表，设置配置项
            let mySzbChart = echarts.init(document.getElementById('szbj'));
            
            // 随页面变动大小
            window.onresize = function() {
                mySzbChart.resize();
            };

            let chartOption = {};
            chartOption.title = {
                text: '收入占比',
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 10
                }
            };
            chartOption.series = [];

            let tmpData = this.szbData;
            let tmp = {
                type: 'pie',
                radius: ['40%', '70%'],
                data: tmpData,
                label: {
                    show: true,
                    position: 'outside',
                    fontSize: 7,
                    formatter: '{b}:{d}%'
                },
                labelLine: {
                    length: 5,
                    length2: 5
                },
                emphasis: {
                    label: {
                        fontSize: 8,
                        formatter: '{b}:{c}￥'
                    }
                }
            };

            chartOption.series.push(tmp);
            mySzbChart.setOption(chartOption);
        },
        zChartStart() {
            // 支出占比初始化图表，设置配置项
            let mySzbChart = echarts.init(document.getElementById('zzbj'));
            
            let funTmp = window.onresize;
            window.onresize = function() {
                mySzbChart.resize();
                funTmp();
            };

            let chartOption = {};
            chartOption.title = {
                text: '支出占比',
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 10
                }
            };
            chartOption.series = [];

            let tmpData = this.zzbData;
            let tmp = {
                type: 'pie',
                radius: ['40%', '70%'],
                data: tmpData,
                label: {
                    show: true,
                    position: 'outside',
                    fontSize: 7,
                    formatter: '{b}:{d}%'
                },
                labelLine: {
                    length: 5,
                    length2: 5
                },
                emphasis: {
                    label: {
                        fontSize: 8,
                        formatter: '{b}:{c}￥'
                    }
                }
            };

            chartOption.series.push(tmp);
            mySzbChart.setOption(chartOption);
        },
        getDatePer() {
            let currYear = new Date().getMonth();
            let curr
            

        }
    },
    mounted() {
        this.sChartStart();
        this.zChartStart();
    },
    updated() {
        this.sChartStart();
        this.zChartStart();
    }
}
</script>

<template>
    <div class="header-container">
        <div class="zsz-container">
            <div class="zsz-item">
                <el-tag type="success">收入 +{{zsz.s}}</el-tag>
            </div>
            <div class="zsz-item">
                <el-tag type="danger">支出 -{{zsz.z}}</el-tag>
            </div>
        </div>
        <div class="szzb-container">
            <div class="szzb-item-container">
                <div id="szbj"></div>
            </div>
            <div class="szzb-item-container">
                <div id="zzbj"></div>
            </div>
        </div>
        <div class="gg-container">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="datePer" status="success"/>
        </div>
    </div>
</template>

<style>
.header-container {
    width: 400px;
    height: 100px;
    display: flex;
}
.zsz-container {
    box-sizing: border-box;
    width: 16%;
    height: 100%;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.zsz-item {
    width: 60%;
    height: 20%;
}
.szzb-container {
    width: 70%;
    height: 100%;
    display: flex;
    font-size: 20px;
}
.szzb-item-container {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#szbj {
    width: 70%;
    height: 70%;
}
#zzbj {
    width: 70%;
    height: 70%;
}
.gg-container {
    box-sizing: border-box;
    width: 14%;
    height: 100%;
    padding: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left-style: solid;
    border-width: 8px;
    border-color: #F2F3F5;
}

</style>
