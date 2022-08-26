<script>
export default{
    props: ['monthData'],
    data() {
        return {
            
        }
    },
    methods: {

    }
}
</script>

<template>
    <div class="main-container">
        <el-table :data="monthData" height="400" style="width: 80%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="类别" width="180" />
            <el-table-column prop="type" label="收/支" />
            <el-table-column prop="amount" label="金额" />
        </el-table>
    </div>
</template>

<style>
.main-container {
    width: 600px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
