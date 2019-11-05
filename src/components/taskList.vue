<template>
  <v-list two-line subheader>
   <v-list-tile avatar v-for="(item) in todoList" :key="item.key">
        <v-list-tile-action @click="toggle(item)">
        <v-checkbox v-model="item.value.checked" @click.prevent=""></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
        <v-list-tile-title>{{item.value.data}}</v-list-tile-title>
        </v-list-tile-content>
   </v-list-tile>
   <!-- {{todoListMap.get()}} -->
   <!-- <v-list-tile avatar v-for="[key,val] of todoListMap" :key="key">
     {{key}}
        <v-list-tile-action @click="toggle(key)">
        <v-checkbox v-model="val.checked" @click.prevent=""></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
        <v-list-tile-title>{{val.data}}</v-list-tile-title>
        </v-list-tile-content>
   </v-list-tile> -->
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    // created(){
    //      let data = db.collection('tasks').get().then(snap=>{
    //         //const testCollection = [];
    //         let tasks = [];
    //         let checked = [];
    //         snap.forEach(doc => {
    //           let obj = { 
    //             key : doc.id,
    //             value : doc.data()
    //           };
    //           if(obj.value.checked){
    //             checked.push(obj);
    //           }else{
    //             tasks.push(obj);
    //           }
    //         });

    //         this.$store.commit('initTasks',tasks);
    //         this.$store.commit('initcheckedList',checked);

    //      })
    // },
    computed : {
        ...mapGetters({
           todoList : 'TASK/todoList'
           // 'todoListMap'
        // ...
        })
    },
    methods : {
        toggle(item){
          item.checked = !item.checked;
          if(item.checked){
            this.$store.commit('TASK/REMOVE_TASK',item.key);
            this.$store.commit('TASK/SET_CHECKED_TASK',item);
          }
          
        }
    }
}
</script>

<style lang="stylus">
.checkBtnCompleted {
  color: #b3adad;
}
.todo-item
  .v-list__tile
    height: auto
    padding-top: 12px
    padding-bottom: 12px
  &.editing .v-list__tile
    height: 48px
</style>