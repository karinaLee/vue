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

export default {
  name: 'home',
  components: {
    taskInputBox,
    taskList,
    checkedList
  },
  created(){
    this.$store.dispatch('TASK/FETCH_TASKS'); 
  }
}
</script>
