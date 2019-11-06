<template>
    <v-btn depressed large color="error" @click="deleteTasks">완료된 할 일 모두 삭제</v-btn>
</template>

<script>
export default {
    methods : {
        deleteTasks(){
            this.$store.commit('TASK/DELETE_TASKS');
        }
    }
}
</script> 

<style>

</style>