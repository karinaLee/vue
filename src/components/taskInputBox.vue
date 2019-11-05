<template>
<v-form>
    <v-container>
    <v-layout row wrap  >       
        <v-flex  >
            <v-text-field
                label="task"
                solo
                 v-model="task"
            ></v-text-field>
        </v-flex>
        <v-flex>
        <v-btn class="mx-2" fab dark color="indigo" @click="inputTask">
        <v-icon dark>add</v-icon>
        </v-btn>
        </v-flex>
    </v-layout>
      </v-container>
</v-form>
</template>

<script>
export default {
    data(){ 
        return {
            task : ""
        }
    },
    methods : {
        textclear(){
            this.task = '';
        },
        inputTask(){
            if(this.task.length > 0){
                let hashKey = new Date().getTime();
                let data = {
                    key : hashKey,
                    data : this.task,
                    checked : false
                }
                this.$store.commit('TASK/SET_TASK',data);
                this.textclear();
            }
        }
    }

}
</script>

<style>

</style>
