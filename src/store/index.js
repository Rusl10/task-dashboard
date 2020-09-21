import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tasks: null
  },
  mutations: {
  	ADD_TASKS_TO_STATE(state, tasks){
  		state.tasks = tasks
  		
  	},
  	COMPLETE_TASK_IN_STATE(state, data){
  		const idx = state.tasks.findIndex(task => task.id === data.path)
  		state.tasks[idx] = data.updatedStatus
  	},
  	UPDATE_TASK_IN_STATE(state, data){
  		const idx = state.tasks.findIndex(task => task.id === data.path)
  		state.tasks[idx] = data.updatesOfTask
  	}
  },
  actions: {
  	ADD_TASK_TO_DB({commit}, task){
  		return axios({
  			url: 'http://localhost:3009/tasks',
  			method: 'post',
  			data: task

  		})
  		.then(tasks => {
  			return axios({
  				url: 'http://localhost:3009/tasks',
  				method: 'get',
  			})
  			.then(response => {
  				commit('ADD_TASKS_TO_STATE', response.data)
  			})
  			.catch(error => {
  				console.log('errorGet', error)
  			})
  		})
  		.catch(error => {
  			console.log('errorPost', error)
  		})
  	},
  	PASS_TASKS_TO_ACTIONS({commit}, tasks){
  		commit('ADD_TASKS_TO_STATE', tasks)
  	},
  	UPDATE_TASK({commit}, data){
  		return axios({
  			url: `http://localhost:3009/tasks/${data.path}`,
  			method: 'put',
  			data: data.updatesOfTask
  		})
  		.then(response => {
  			commit('UPDATE_TASK_IN_STATE', data)
  		})
  		.catch(error => {
  			console.log('error', error)
  		})
  	},
  	COMPLETE_TASK({commit}, data){

  		return axios({
  			url: `http://localhost:3009/tasks/${data.path}`,
  			method: 'put',
  			data: data.updatedStatus
  		})
  		.then(response => {
  			commit('COMPLETE_TASK_IN_STATE', data)
  		})
  		.catch(error => {
  			console.log('error', error)
  		})
  	}
  },
  getters:{
  	TASK_BY_ID: s => id => s.tasks.find(task => task.id === id) 
  },
  modules: {
  }
})
