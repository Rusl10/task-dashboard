<template>
  <div class="row">
  	<div class="col s6 offset-s3">
  		<h1>Create task</h1>
  		<form
  		@submit.prevent="submitHandler"
  		>
  			<div class="input-field">
  				<input id="title" type="text" class="validate" required=""
  				v-model="title"
  				>
  				<label for="title">Title</label>
  				<span class="helper-text" data-error="Title is required"></span>
  			</div>
  			 <div 
  			 class="chips"
  			 ref="chips"
  			 >
  			 	
  			 </div>
  			 <div class="input-field">
  			 	<textarea required id="description" 
  			 	class="materialize-textarea"
  			 	v-model="description"
  			 	></textarea>
  			 	<label for="description">Textarea</label>
  			 	<span class="character-counter">{{description.length}}/2048</span>
  			 </div>
  			 <input type="text"
  			 ref="datepicker"
  			 v-model="date"
  			 >
  			 <button class="btn" type="submit">
  			 	Add task
  			 </button>
  		</form>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
  	description: '',
  	title: '',
  	date: null,
  	chips: null
  }),
  methods: {
  	submitHandler(){
  		const task = {
  			title: this.title,
  			description: this.description,
  			id: Date.now(),
  			status: 'active',
  			tags: this.chips.chipsData,
  			date: this.date.date

  		}
  		this.$store.dispatch('ADD_TASK_TO_DB', task)
  		this.$router.push('/list')
  	}
  },
  mounted(){
  	this.chips = M.Chips.init(this.$refs.chips, {
  		placeholder: 'Task tags',
  		limit: 5

  	})
  	this.date = M.Datepicker.init(this.$refs.datepicker, ({
  		autoClose: true,
  		format: 'dd.mm.yyyy',
  		defaultDate: new Date(),
  		setDefaultDate: true
  	}));
  },
  destroyed(){
  	if (this.date && this.date.destroy) {
  		this.date.destroy()
  	}

  	if (this.chips && this.chips.destroy) {
  		this.chips.destroy()
  	}
  }
}
</script>

<style lang="scss">
.character-counter{
	float: right;
}
	
</style>
