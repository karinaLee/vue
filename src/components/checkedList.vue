<template>
<v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">완료됨({{checkedList.length}}개)</div>
      <v-card v-for="(item) in checkedList" :key="item.key"> 
        <v-card-text class="is-selected">{{item.value.data}}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
     name: 'checkedList',
     computed : {
        ...mapGetters({
             checkedList : 'TASK/checkedList'
        })
    }
}
</script>

<style scoped>
.is-selected {
  text-decoration: line-through;
}
</style>
