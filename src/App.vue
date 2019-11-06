<template>
  <div id="app">
     <v-app id="inspire">
      <toolBar></toolBar>
      <v-content>
        <transition>
          <keep-alive> 
                <router-view></router-view>
          </keep-alive>
        </transition>
      </v-content>
     </v-app>
  </div>
</template>
<script>
import toolBar from '@/components/toolBar.vue'

export default {
    components: {
      toolBar
    }
}
</script>
