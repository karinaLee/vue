<template>
  <v-toolbar :class="{ 'fixed': isFixed }" >
    <v-toolbar-title>일일코딩</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text to="/">ToDo</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  data(){
    return {
      headerHeight : 0,
      isFixed : false
    }
  },
  created(){
    window.addEventListener('scroll', this.checkHeight);
  },
  mounted(){

    this.headerHeight = this.$el.offsetHeight;

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkHeight);
  },
  methods: {
    checkHeight() {
      this.isFixed = (window.scrollY > this.headerHeight) ? true : false;
    }
  }
}
</script>
<style scoped>
.fixed {
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>