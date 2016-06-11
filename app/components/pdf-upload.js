import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
	url : "http://localhost:8082/psapi/upload",

	filesDidChange: function(files) {
	    const uploader = EmberUploader.Uploader.create({
	      url: this.get('url'),
	      method:'post',
	      paramNamespace: 'post'
	    });

	    if (!Ember.isEmpty(files)) {
	      uploader.upload(files[0]);
	    }
  }
});
