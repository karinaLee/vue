<template>
  <div class="home text-xs-center" >
    <img alt="Vue logo" src="../assets/logo.png">
    
    <taskInputBox/>  
     <v-content>
        <v-container fluid fill-height>
           <taskList/>
        </v-container>
     </v-content>
    <checkedList/>

  </div>
</template>

<script>
import taskInputBox from '@/components/taskInputBox.vue'
import taskList from '@/components/taskList.vue'
import checkedList from '@/components/checkedList.vue'
import { db } from '@/database/firebase-init'

export default {
  name: 'home',
  components: {
    taskInputBox,
    taskList,
    checkedList
  },
  created(){
    this.$store.dispatch('getTasks'); 
        //  let data = db.collection('tasks').get().then(snap=>{
        //     //const testCollection = [];
        //     let tasks = [];
        //     let checked = [];
        //     snap.forEach(doc => {
        //       let obj = { 
        //         key : doc.id,
        //         value : doc.data()
        //       };
        //       if(obj.value.checked){
        //         checked.push(obj);
        //       }else{
        //         tasks.push(obj);
        //       }
        //     });

        //     this.$store.commit('initTasks',tasks);
        //     this.$store.commit('initcheckedList',checked);

        //  })
  }
}
</script>
