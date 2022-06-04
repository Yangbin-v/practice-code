<script>
import uiInput from "./components/ui-input.vue";
import uiTodoItem from "./components/ui-todoitem.vue";
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
        getStorage() {
            let list = window.localStorage.getItem('todolist');
            if (list) {
                this.todoList = JSON.parse(list);
            }
            console.log(this.todoList);
        },
        setStorage() {
            window.localStorage.setItem('todolist', JSON.stringify(this.todoList));
        },
        enterMessage(msg) {
            this.todoList.unshift({text: msg, id: new Date().getTime(), date: new Date(), state: true});
            this.setStorage();
        },
        deleteItem(id) {
            for(let i = 0; i < this.todoList.length; i++) {
                if (this.todoList[i].id === id) {
                    this.todoList.splice(i, 1);
                    break;
                }
            }
            this.setStorage();
        },
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