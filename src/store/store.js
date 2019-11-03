
import Vuex from 'vuex';
import Vue from 'vue'
import { db } from '@/database/firebase-init'

Vue.use(Vuex);



export const store = new Vuex.Store({
    state: {
        todoList : [],
       // todoListMap : new Map(),
        checkedList : []
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
          //state.todoList.set(data.key, data);
             state.todoList.push({key : data.key, value : data});
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
        }
    },
    actions : {
        getTasks({commit}){
            db.collection('tasks').get().then(snap=>{
                //const testCollection = [];
                let tasks = [];
                let checked = [];
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
        //  let data = db.collection('tasks').orderBy('createdDate');
        //  console.log
        }
        
        // requestPriceInfo({state}){
        //     return new Promise((resolve,reject)=>{
        //         console.log('requestprice');
        //         resolve('hihiihi');
        //     })
        // },
    //     callBulkPrice({state,commit,dispatch},data){

    //         let resolve, reject, cancelled;
    //          const promise = new Promise((resolveFromPromise, rejectFromPromise) => {
    //            resolve = resolveFromPromise;
    //            reject = rejectFromPromise;
    //          });
           

    //    setTimeout(() => {
    //     dispatch('requestPriceInfo')
    //     .then(wrapWithCancel('addTask'))
    //     .then(resolve)
    //     .then(reject);
           
    //    }, 3000);
     
       
 
    //        return {
    //          promise,
    //          cancel: () => {
    //            cancelled = true;
    //            reject({ reason: 'cancelled' });
    //          }
    //        };

    //        function wrapWithCancel(fn) {
    //         return (data) => {
    //           if (!cancelled) {
    //             return commit(fn,data);
    //           }else{
    //               console.log('not commit!!');
    //           }
    //         };
    //       }

          
    //      }
    }
});