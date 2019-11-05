import { db } from '@/database/firebase-init'

export const TASK = {
    namespaced: true,
    state: {
        todoList : [], //해야될 일정
        checkedList : [], //완료된 일정
        taskMap : new Map() //db 업데이트를 위한 임시 저장소
    },
    getters : {
        todoList(state){
           return state.todoList;
        },
        checkedList(state){
            return state.checkedList;
        },
        taskMap : (state) => state.taskMap 
    },
    mutations : {
        SET_TASKS(state,data){
            state.todoList = data;
        },
        SET_CHECKED_TASKS(state,data){
            state.checkedList = data;
        },
        SET_TASK(state,data){
             state.todoList.push({key : data.key, value : data});
             state.taskMap.set(data.key,{
                 isNew : true, //신규 task 여부
                 value : data
             });
             //task 상태 변경시마다 db update 부분을 taskMap에 임시 저장후 deactivated시 일괄 db update로 수정
             //db.collection("tasks").add(data);

        },
        REMOVE_TASK(state,key){

            let findIndex = state.todoList.findIndex(item=>(key == item.key));
            if(findIndex > -1){
                state.todoList.splice(findIndex,1);
                //state.checkedList.push(data);
            }


        },
        SET_CHECKED_TASK(state,data){
            state.checkedList.push(data);
            if(state.taskMap.has(data.key)){ 
                let task = state.taskMap.get(data.key);
                task.value.checked = true
                state.taskMap.set(data.key,task);
            }else{
                state.taskMap.set(data.key,{
                    isNew : false, 
                    value : data.value
                });
            }

            console.log([...state.taskMap.entries()]);
           // //

            // let doc = db.collection("tasks").where("key", "==", data.value.key);
            // doc.get()
            // .then(function(querySnapshot) {
            //     querySnapshot.forEach(function(doc) {
            //         doc.ref.update({ 'checked': true})

            //         // doc.data() is never undefined for query doc snapshots
            //         console.log(doc.id, " => ", doc.data());
            //     });
            // })
            // .catch(function(error) {
            //     console.log("Error getting documents: ", error);
            // });
        
        }
    },
    actions : {
        FETCH_TASKS({commit}){
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
                commit('SET_TASKS',tasks);
                commit('SET_CHECKED_TASKS',checked);
             })
        },
        UPDATE_TASKS({state}){

            if(state.taskMap.size){
                console.log('db connect')
                
                const collect = db.collection("tasks");

                state.taskMap.forEach((data, key) => {
                    if(data.isNew){
                        collect.add(data.value);
                    }else{
                        collect.doc(key).update({
                            'checked' : true
                        })
                    }
                })

                state.taskMap.clear();

            }

            
            
        }
        
    }
}