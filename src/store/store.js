
import Vuex from 'vuex';
import Vue from 'vue'
import { db } from '@/database/firebase-init'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todoList : [], //해야될 일정
        checkedList : [] //완료된 일정
    },
    getters : {
        todoListMap(state){
            return state.todoListMap;
        },
        todoList(state){
           return state.todoList;
        },
        checkedList(state){
            return state.checkedList;
        }
    },
    mutations : {
        initTasks(state,data){
            state.todoList = data;
        },
        initcheckedList(state,data){
            state.checkedList = data;
        },
        addTask(state,data){
             state.todoList.push({key : data.key, value : data});
             //TODO: state에 저장하기에 task를 추가할때마다 db 연결할 필요가 있을까. 페이지를 벗어날때 변경된 부분을 db update하는 방법 생각할것.
             db.collection("tasks").add(data);
        },
        setRemoveTask(state,key){

            let findIndex = state.todoList.findIndex(item=>(key == item.key));
            if(findIndex > -1){
                state.todoList.splice(findIndex,1);
                //state.checkedList.push(data);
            }
        },
        addCheckedTask(state,data){
            state.checkedList.push(data);
            let doc = db.collection("tasks").doc(data.key);
            doc.update({
                "checked" : true
            })
        }
    },
    actions : {
        getTasks({commit}){
            db.collection('tasks').get().then(snap=>{
                let tasks = []; //해야될 task
                let checked = []; //완료된 task
                snap.forEach(doc => {
                  let obj = { 
                    key : doc.id,
                    value : doc.data()
                  };
                  if(obj.value.checked){
                    checked.push(obj);
                  }else{
                    tasks.push(obj);
                  }
                }); 
                commit('initTasks',tasks);
                commit('initcheckedList',checked);
             })
        }
        
    }
});