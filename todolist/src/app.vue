<script>
import uiInput from "./components/ui-input.vue";
import uiTodoItem from "./components/ui-todoitem.vue";

/**
 * todolist app 组件
 */
export default {
    data() {
        return {
            todoList: [],
        }
    },
    components: {
        uiInput,
        uiTodoItem
    },
    created() {
        this.getStorage();
    },
    methods: {
        /**
         * 获取浏览器本地存储的数据
         */
        getStorage() {
            let list = window.localStorage.getItem('todolist');
            if (list) {
                this.todoList = JSON.parse(list);
            }
            console.log(this.todoList);
        },

        /**
         * 设置浏览器本地存储
         */
        setStorage() {
            window.localStorage.setItem('todolist', JSON.stringify(this.todoList));
        },

        /**
         * ui-input enter 事件处理函数
         * @param {*} msg 输入的文本
         */
        enterMessage(msg) {
            this.todoList.unshift({text: msg, id: new Date().getTime(), date: new Date(), state: true});
            this.setStorage();
        },

        /**
         * 删除指定 id 的 todo
         * @param {*} id todo 的 id
         */
        deleteItem(id) {
            for(let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].id === id) {
                    this.todoList.splice(i, 1);
                    break;
                }
            }
            this.setStorage();
        },

        /**
         * 改变指定 id 的 todo 状态
         * @param {*} id todo 的 id
         */
        stateChang(id) {
            for(let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].id === id) {
                    this.todoList[i].state = !this.todoList[i].state;
                    break;
                }
            }
            this.setStorage();
        }
    }
}
</script>

<template>
    <div id="app">
        <p>添加一个任务</p>
        <ui-input id="uiinput" @enter="enterMessage"></ui-input>
        <div v-for="(item, index) in todoList" :key="index">
            <ui-todo-item class="uiItem" :item="item" @deleteItem="deleteItem" @state="stateChang"></ui-todo-item>
        </div>
    </div>
</template>

<style>
#app {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#uiinput {
    width: 40vw;
    height: 5vh;
}
.uiItem {
    width: 36vw;
    height: 10vh;
}
</style>
