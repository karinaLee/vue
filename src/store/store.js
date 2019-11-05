
import Vuex from 'vuex';
import Vue from 'vue'
import {TASK} from './modules/task'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules : {
        TASK
    }

});