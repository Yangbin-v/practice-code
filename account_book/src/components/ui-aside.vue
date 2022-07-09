<script>
import Papa from 'papaparse';
export default{
    emits: ['dateChange', 'acEnterFile', 'zlEnterFile'],
    data() {
        return {
            pickDate: new Date(),
            acFile: undefined,
            zlFile: undefined
        } 
    },
    methods: {
        // 选择日期，触发组件选择月份事件
        dateChange() {
            this.$emit('dateChange', this.pickDate);
        },
        // 账单文件数量超出限制，覆盖前一个文件
        acHandleExceed(files) {
            this.$refs['uploadac'].clearFiles();
            this.$refs['uploadac'].handleStart(files[0]);
        },
        // 选择账单文件，更新缓存
        acFileChange(upFile) {
            this.acFile = upFile;
        },
        // 确定账单文件，触发组件确定账单文件事件
        acEnterFile() {
            if (!this.acFile) {
                console.log('please upfile');
                return false;
            }
            this.$refs['uploadac'].clearFiles();

            const fileTmp = this.acFile;
            this.acFile = undefined;
            const _this = this;
            // 读取 csv 文件
            Papa.parse(fileTmp.raw, {
                complete: function(results) {
                    let temArr = [];
                    for (let i = 1; i < results.data.length; i++) {
                        let obj = {};
                        obj.type = results.data[i][0];
                        obj.time = results.data[i][1];
                        obj.category = results.data[i][2];
                        obj.amount = results.data[i][3];
                        temArr.push(obj);
                    }
                    _this.$emit("acEnterFile", temArr);
                }
            });
        },
        // 分类文件数量超出限制，覆盖前一个文件
        zlHandleExceed(files) {
            this.$refs['uploadzl'].clearFiles();
            this.$refs['uploadzl'].handleStart(files[0]);
        },
        // 选择分类文件，更新缓存
        zlFileChange(upFile) {
            this.zlFile = upFile;
        },
        // 确定分类文件，触发组件确定分类文件事件
        zlEnterFile() {
            if (!this.zlFile) {
                console.log('please upfile');
                return false;
            }
            this.$refs['uploadzl'].clearFiles();

            const fileTmp = this.zlFile;
            this.zlFile = undefined;
            const _this = this;
            // 读取 csv 文件
            Papa.parse(fileTmp.raw, {
                complete: function(results) {
                    let temArr = [];
                    for (let i = 1; i < results.data.length; i++) {
                        let obj = {};
                        obj.id = results.data[i][0];
                        obj.type = results.data[i][1];
                        obj.name = results.data[i][2];
                        temArr.push(obj);
                    }
                    _this.$emit("zlEnterFile", temArr);
                }
            });
        }
    }
}
</script>

<template>
    <div class="aside-container">
        <div class="seldate-container">
            <el-date-picker @change="dateChange" :editable="false" :default-value="pickDate" :clearable="false" v-model="pickDate" type="month"></el-date-picker>
        
        </div>
        <div class="selfile-container">
            <el-upload ref="uploadac" :on-change="acFileChange" :auto-upload="false" :limit="1" :on-exceed="acHandleExceed">
                <template #trigger>
                    <el-button type="primary">选择账单</el-button>
                </template>
                <el-button style="margin-left: 5px" type="success" @click="acEnterFile">
                    确定
                </el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        limit 1 file
                    </div>
                </template>
            </el-upload>
        </div>
        <div class="selfile-container">
            <el-upload ref="uploadzl" :on-change="zlFileChange" :auto-upload="false" :limit="1" :on-exceed="zlHandleExceed">
                <template #trigger>
                    <el-button type="primary">选择分类</el-button>
                </template>
                <el-button style="margin-left: 5px" type="success" @click="zlEnterFile">
                    确定
                </el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        limit 1 file
                    </div>
                </template>
            </el-upload>
        </div>
    </div>
</template>

<style>
.aside-container {
    width: 100px;
    height: 400px;
    display: flex;
    flex-direction: column;
}
.seldate-container {
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    display: flex;
    padding: 40% 10%;
    justify-content: flex-start;
    align-items: center;
}
.date-picker {
    width: 80%;
    height: 50%;
}
.selfile-container {
    box-sizing: border-box;
    width: 100%;
    height: 20%;
    display: flex;
    padding: 10% 10%;
    justify-content: flex-start;
    align-items:flex-start;
}
</style>