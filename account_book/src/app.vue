<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import uiAside from './components/ui-aside.vue';
import uiHeader from './components/ui-header.vue';
import uiMain from './components/ui-main.vue';
import UiMain from './components/ui-main.vue';

export default {
    data() {
        return {
            locale: zhCn,
            zsz: {
                s: 0,
                z: 0
            },
            acData: {},
            caData: {},
            monthData: [{}],
            szbData: [],
            zzbData: []
        }
    },
    components: {
    ElConfigProvider,
    uiAside,
    uiHeader,
    uiMain,
    UiMain
},
    methods: {
        // 组件传来选择月份
        pickDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth();
            let dateStr = `${year}-${month+1}`;

            let zszTmp = {s: 0, z: 0};
            let szbDataTmp = {};
            let zzbDataTmp = {};

            if (this.acData[dateStr] == undefined) {
                console.log('本月无记录');
                return false;
            }
            for (let i = 0; i < this.acData[dateStr].length; i++) {
                let category_id = this.acData[dateStr][i].category;
                let category = this.caData[category_id].name
                if (this.acData[dateStr][i].type == '1') {
                    if (szbDataTmp[category] == undefined) {
                        szbDataTmp[category] = {};
                        szbDataTmp[category].name = category;
                        szbDataTmp[category].value = this.acData[dateStr][i].amount - 0;
                    }
                    else {
                        szbDataTmp[category].value += this.acData[dateStr][i].amount - 0;
                    }
                    zszTmp.s += this.acData[dateStr][i].amount - 0;
                }
                else {
                    if (zzbDataTmp[category] == undefined) {
                        zzbDataTmp[category] = {};
                        zzbDataTmp[category].name = category;
                        zzbDataTmp[category].value = this.acData[dateStr][i].amount - 0;
                    }
                    else {
                        zzbDataTmp[category].value += this.acData[dateStr][i].amount - 0;
                    }
                    zszTmp.z += this.acData[dateStr][i].amount - 0;
                }
            }

            this.szbData = [];
            this.zzbData = [];
            for (let item in szbDataTmp) {
                this.szbData.push(szbDataTmp[item]);
            }
            for (let item in zzbDataTmp) {
                this.zzbData.push(zzbDataTmp[item]);
            }

            this.zsz = zszTmp;

            let monthDataTmp = [];
            for (let i = 0; i < this.acData[dateStr].length; i++) {
                let objTmp = {};

                let dateTab = new Date(this.acData[dateStr][i].time - 0);
                let yearTab = dateTab.getFullYear();
                let monthTab = dateTab.getMonth();
                let dayTab = dateTab.getDate();
                let dateStrTab = `${yearTab}-${monthTab+1}-${dayTab}`;

                objTmp.date = dateStrTab;
                objTmp.name = this.caData[this.acData[dateStr][i].category].name;
                objTmp.type = this.acData[dateStr][i].type;
                objTmp.amount = this.acData[dateStr][i].amount;

                monthDataTmp.push(objTmp);
            }

            this.monthData = monthDataTmp;
            console.log(this.monthData);
        },
        // 组件传来账单数据
        acEnterFile(data) {
            for (let i = 0; i < data.length; i++) {
                let date = new Date(data[i].time - 0)
                let year = date.getFullYear();
                let month = date.getMonth();
                let dateStr = `${year}-${month+1}`;

                if (this.acData[dateStr] == undefined) {
                    this.acData[dateStr] = [data[i]];
                }
                else {
                    for (let i = 0; i < this.acData[dateStr].length; i++) {
                        if (data[i].time - 0 >=  this.acData[dateStr][i] - 0) {
                            this.acData[dateStr].splice(i, 0, data[i]);
                            break;
                        }
                        if (i == this.acData[dateStr].length -1) {
                            this.acData[dateStr].push(data[i]);
                            break;
                        }
                    }
                }
            }
            window.localStorage.setItem('ACCOUNT_BOOK_AC', JSON.stringify(this.acData));
        },
        // 组件传来分类数据
        zlEnterFile(data) {
            for (let i = 0; i < data.length; i++) {
                this.caData[data[i].id] = data[i];
            }
            window.localStorage.setItem('ACCOUNT_BOOK_CA', JSON.stringify(this.caData));
        },
        getStAcAndCaData() {
            let acDataTmp = window.localStorage.getItem('ACCOUNT_BOOK_AC');
            let caDataTmp = window.localStorage.getItem('ACCOUNT_BOOK_CA');
            if (acDataTmp != null) {
                this.acData = JSON.parse(acDataTmp);
            }
            if (caDataTmp != null) {
                this.caData = JSON.parse(caDataTmp);
            }
        }
    },
    created() {
        this.getStAcAndCaData();
        this.pickDate(new Date());

    }
}
</script>

<template>
    <el-config-provider :locale="locale">
        <div class="app-container">
            <ui-aside class="app-aside" @zlEnterFile="zlEnterFile" @acEnterFile="acEnterFile" @dateChange="pickDate"></ui-aside>
            <div class="app-right">
                <ui-header class="app-header" :zsz="zsz" :szbData="szbData" :zzbData="zzbData"></ui-header>
                <ui-main class="app-main" :monthData="monthData"></ui-main>
            </div>
        </div>
    </el-config-provider>
</template>

<style>
body {
    margin: 0;
}
.app-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}
.app-aside {
    width: 20%;
    height: 100%;
    border-right-style: solid;
    border-width: 8px;
    border-color: #F2F3F5;
}
.app-right {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.app-header {
    width: 100%;
    height: 30%;
    border-bottom-style: solid;
    border-width: 8px;
    border-color: #F2F3F5;
}
.app-main {
    width: 100%;
    height: 70%;
}
</style>

