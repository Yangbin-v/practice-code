<template>
    <div id="container" style="display: flex; flex-direction: row; 
    align-items: center; justify-content: center;">
        <div id="input-view">
            <input id="input" @keyup.enter="end" v-model="message">
            <div id="btn" @click="end">+</div>
        </div>
    </div>
</template>


<script>
/**
 * input 组件
 */
export default {
    emits: ['enter'],
    data() {
        return {
            message: ''
        }
    },
    methods: {
        /**
         * 发送按下 enter 键事件
         */
        end() {
            if (this.message.length > 20) {
                alert('最多20个字');
                return;
            }
            this.message&&this.$emit('enter', this.message);
            this.message = '';
        }
    }
}
</script>

<style>
#container {
    width: 200px;
    height: 50px;
}
#input-view {
    width: 90%;
    height: 100%;
    border: 1px solid rgb(190, 190, 190);
    border-radius: 10px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
#input {
    width: 90%;
    height: 90%;
    border-style: none;
    outline: none;
    font-size: 80%;
}
#btn {
    width: 6%;
    height: 80%;
    border-radius: 5px;
    box-shadow: 1px #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 120%;
}
#btn:hover {
    cursor: pointer;
    width: 6%;
    height: 80%;
    border-radius: 5px;
    box-shadow: 1px #eeeeee;
    display: flex;
    background-color: rgb(219, 219, 219);
    align-items: center;
    justify-content: center;
    font-size: 120%;
}
#btn:click {
    cursor: pointer;
    width: 6%;
    height: 80%;
    border-radius: 5px;
    box-shadow: 1px #eeeeee;
    display: flex;
    background-color: rgb(219, 219, 219);
    align-items: center;
    justify-content: center;
    font-size: 120%;
}
</style>
