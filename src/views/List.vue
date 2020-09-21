<template>
	<div>
	<h1>List</h1>
	<hr>
	<div class="row">
		<div class="input-field col s6">
			<select 
			id="select" 
			ref="select"
			v-model="selectedStatus"
			>
			<option value="" disabled selected>Choose status</option>
			<option 
			:value="status" 
			:key="indx" 
			v-for="(status, indx) in statuses"
			>{{status}}</option>
		</select>
    <label for="select">Status filter</label>
		</div>
	</div>
		<button class="btn btn-small"
		v-if="selectedStatus && selectedStatus !== 'all'"
		@click="removeStatus"
		>Clear</button>
	
	<table 
		class="highlight centered responsive-table"
		v-if="tasks && tasks.length"
	>
        <thead>
          <tr>
              <th v-for="header in headersOfTable">{{ header }}</th>
          </tr>
        </thead>

        <tbody>
          <tr 
          	v-for="(task, ind) in filterTasks"
          	:key="task.id"
          >
            <td>{{ind+1}}</td>
            <td>{{task.title}}</td>
            <td class="m-width"><div class="text">{{task.description}}</div></td>
            <td v-if="task.tags && task.tags.length">
            	<span v-for="tag in task.tags">{{tag.tag}} </span> 
            </td>
            <td v-else></td>
            <td>{{task.date | date}}</td>
            <td>{{task.status}}</td>
            <td>
            	<router-link
            		class="btn btn-small"
            		tag="button"
            		:to="{path: '/task/' + task.id}"
            	>
            		Open
            	</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No tasks</p>
	</div>
</template>
<script>
import {mapState} from 'vuex'
import date from '@/filters/date'
export default {
  name: 'List',
  data () {
    return {
    	headersOfTable: [
    		'#',
    		'Title',
    		'Description',
    		'Tags',
    		'Date',
    		'Status',
    		'Page'
    	],
    	statuses: [
    		'all',
    		'active',
    		'completed',
    		'outdated',
    	],
    	select: null,
    	selectedStatus: null
    }
  },
  mounted(){
  	this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed(){
  	if (this.$select && this.$select.destroy) {
  		this.$select.destroy()
  	}
  },
  computed: {
  	...mapState([
  		'tasks'
  	]),
  	filterTasks(){
  		return this.tasks.filter(task => {
  			if(!this.selectedStatus || this.selectedStatus === 'all'){
  				return true
  			} else {
  			    return task.status === this.selectedStatus

  			}

  		})
  	}

  },
  methods: {
  	removeStatus(){
  		this.selectedStatus = null
  	}
  },
  filters: {
  	date
  }

}

</script>
<style lang="scss">
.m-width{
	max-width: 300px;
}
.text{
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>