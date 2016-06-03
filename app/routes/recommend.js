import Ember from 'ember';
var errorModel = false;

export default Ember.Route.extend({
	afterModel(model, transition) {
    	if (errorModel) {
      		this.transitionTo('error');
    	}
	},
	model() {
		errorModel = false;
		return this.store.findAll('recommend').catch(function(reason){
			console.log(reason);
			errorModel = true;
		});
	}
	
});
