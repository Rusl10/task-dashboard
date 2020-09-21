<template>
	<!-- Modal Structure -->
	<div id="modal1" class="modal" ref="modal">
		<div class="modal-content">
			<h4>{{headerText}}</h4>
			<p>{{bodyText}}</p>
		</div>
		<div class="modal-footer">
			<a href="#!" class="modal-close waves-effect waves-green btn-flat"
			>Cancel</a>
			<a href="#!" class="modal-close waves-effect waves-green btn-flat"
			@click="sendOperationToParent"
			>Ок</a>
		</div>
	</div>
</template>
<script>
export default {
  name: 'v-popup',
  props: {
  	operation: {
  		type: String,
  		default: ''
  	},
  	headerText: {
  		type: String,
  		default: ''
  	},
  	bodyText: {
  		type: String,
  		default: ''
  	}
  },
  data () {
    return {
    	modal: null
    }
  },
  methods: {
  	sendOperationToParent(){
  		this.$emit('operationType', this.operation)
  	}
  },
  mounted(){
  	this.modal = M.Modal.init(this.$refs.modal, {
  		opacity: 0.7
  	})
  },
  destroyed(){
  	if (this.modal && this.modal.destroy) {
  		this.modal.destroy()
  	}
  }
}
</script>
<style lang="css" scoped>
</style>