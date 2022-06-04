<template>
    <div class="item" style="display: flex; flex-direction: row; justify-self: center; align-content: space-around;">
        <input type="checkbox" :checked="!item.state" @change="stateChange" :key="item.id"/>
        <div class="text">
            <text  class="text1" v-if="item.state">{{item.text}}</text>
            <del class="text1" v-else>{{item.text}}</del>
            <text style="font-size: 10px">{{new Date(item.date).getFullYear()+'年'}}{{new Date(item.date).getMonth()+'月'}}{{new Date(item.date).getDate()+'月'}}</text>
        </div>
        <div style="cursor: pointer;" @click="deleteItem">✖</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        deleteItem() {
            this.$emit('deleteItem', this.item.id);
        },
        stateChange() {
            this.$emit('state', this.item.id);
        }
    },
    props: ['item']
}
</script>

<style>
.item {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item:hover {
    background-color: rgb(226, 226, 226);
}
.text {
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.text1 {
    width: 100%;
    height: 40%;
}
</style>