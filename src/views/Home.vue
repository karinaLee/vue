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

    <task-footer></task-footer>

  </div>
</template>

<script>
import taskInputBox from '@/components/taskInputBox.vue'
import taskList from '@/components/taskList.vue'
import checkedList from '@/components/checkedList.vue'
import taskFooter from '@/components/taskFooter.vue'

export default {
  name: 'home',
  components: {
    taskInputBox,
    taskList,
    checkedList,
    taskFooter
  },
  created(){
    this.$store.dispatch('TASK/FETCH_TASKS'); 
  },
  deactivated(){
    console.log('deactivated');
    this.$store.dispatch('TASK/UPDATE_TASKS'); 

  }
}
</script>
