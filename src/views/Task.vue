<template>
	<div class="row">
		<div v-if="showTask">
			<v-popup 
				ref="childPopup"
				:headerText="headerTextPopup"
				:bodyText="bodyTextPopup"
				:operation="operation"
				@operationType="callOperation"
			/>
			<div class="col s6 offset-s3">
			<h1>Task</h1>
			<form @submit.prevent="updateTask">
		        

		        <div class="chips" ref="chips"></div>

		        <div class="input-field">
		          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
		          <label for="description">Description</label>
		          <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
		        </div>

		        <input type="text" ref="datepicker">
		        <div v-if="showTask.status !=='completed'">
			        <button class="btn" type="button"
			        data-target="modal1"
			        @click="openModal('update')"
			        >Update task</button>
			        <button 
			        	class="btn blue" 
			        	type="button"
			        	@click="openModal('complete')"
			        >Complete task</button>	
		        </div>
		    </form>
		</div>
		</div>
		
		<p v-else>Task has not been found</p>	
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import vPopup from '@/components/v-popup'
export default {
  name: 'Task',
  data: () => ({
    description: '',
    chips: null,
    date: null,
    headerTextPopup: '',
    bodyTextPopup: '',
    operation: ''
  }),
  computed: {
  	...mapGetters([
  		'TASK_BY_ID'
  	]),
  	showTask(){
  		return this.TASK_BY_ID(parseInt(this.$route.params.id))
  	}
  },
  mounted() {
  	this.description = this.showTask.description
  	
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.showTask.tags
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.showTask.date),
      setDefaultDate: true
    })
    setTimeout(() => M.updateTextFields(), 0)
  },
  methods: {
  	...mapActions([
  		'UPDATE_TASK',
  		'COMPLETE_TASK'
  	]),
    async updateTask() {
	    const updatesOfTask = {
	    	description: this.description,
	    	title: this.showTask.title,
	        status: new Date(this.date.date) < new Date() ? 'outdated' : 'active',
	        tags: this.showTask.tags,
	        date: this.date.date
	    }
	    const path = this.showTask.id
	    await this.UPDATE_TASK({updatesOfTask, path})
	    this.$router.push('/list')
    },
    async completeTask() {
	    const updatedStatus = {
	    	description: this.description,
	    	title: this.showTask.title,
	        status: 'completed',
	        tags: this.showTask.tags,
	        date: this.date.date
	    }
	    const path = this.showTask.id
	    await this.COMPLETE_TASK({updatedStatus, path})
	    this.$router.push('/list')
    },
    openModal(operation){
    	if (operation === 'update') {
    		this.operation = operation
    		this.headerTextPopup = 'Refreshing of task'
    		this.bodyTextPopup = 'Are you sure that you want to delete this task?'
    	} else if (operation === 'complete'){
    		this.operation = operation
    		this.headerTextPopup = 'Compliting task'
    		this.bodyTextPopup = 'Are you sure that you want to complete this task?'
    	}
    	this.$refs.childPopup.modal.open()
    },
    callOperation(operation){
    	if (operation === 'update') {
    		this.updateTask()
    	} else if (operation === 'complete'){
    		this.completeTask()
    	}
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  },
  components: {
  	vPopup
  }
}
</script>
<style lang="scss">
.btn.blue{
	margin-left: 1rem;
}
</style>