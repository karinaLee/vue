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
                 state : 'add',
                 value : data
             });
             //task 상태 변경시마다 db update 부분을 taskMap에 임시 저장후 deactivated시 일괄 db update로 수정...
             //브라우저 새로고침이나 닫을시.. DB 저장되지않음
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
            state.taskMap.set(data.key,{
                state : (isNaN(data.key)) ? 'update' : 'add', //db key인 경우 string, 임시 key인 경우 timestamp
                value : data.value
            });
            console.log([...state.taskMap.entries()]);        
        },
        //완료된 일 전체 삭제
        DELETE_TASKS(state){
            state.checkedList.map(task=>{
                if(state.taskMap.has(task.key)){ //db에 없는 task
                    if(!isNaN(task.key)){
                        state.taskMap.delete(task.key)
                        return;
                    }
                }

                state.taskMap.set(task.key,{ //db 삭제해야 될 task
                    state : 'delete',
                    value : task.value
                })
            });

            state.checkedList = [];

        },
        CLEAR_TASK_MAP(state){
            state.taskMap.clear();
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
        UPDATE_TASKS({state, commit}){

            if(state.taskMap.size){

                //단일 배치로 일괄 커밋
                var batch = db.batch();
                var collect = db.collection("tasks");
                state.taskMap.forEach((data, key) => {
                    
                    if(data.state === 'add'){
                        var task = collect.doc();
                        batch.set(task,data.value);
                        return;
                    }

                    var ref = collect.doc(key);         
                    if(data.state === 'update'){
                        batch.update(ref,{
                            'checked' : !data.value.checked
                        })
                    }else if(data.state === 'delete'){
                        batch.delete(ref);
                    }
                })

                batch.commit();
                commit('CLEAR_TASK_MAP');

            }

            
            
        }
        
    }
}
