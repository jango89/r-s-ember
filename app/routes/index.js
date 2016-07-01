import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		$(document).ready(function(){
			$.ajax({
			    url: "http://localhost:8082/psapi/dashboards",
			 
			    // The name of the callback parameter, as specified by the YQL service
			    jsonp: "callback",
			 
			    // Tell jQuery we're expecting JSONP
			    dataType: "jsonp",
			    success : function(data){
			    	console(data);
			    },
			    error:function(xhr, status, error){
			    	 if(xhr.status == 200){
			    	 	 $('#server_status_h3').text("OK");
						 $('#server_status_p').text("Your server is working perfectly. Relax & enjoy.");
						 $('#course_status_h3').text(window.jsonPResponse.courseStatus);
						 $('#course_status_p').text("There are "+window.jsonPResponse.courseStatus+" courses available in total");
						 $('#rec_status_h3').text(window.jsonPResponse.recommendations);
						 $('#rec_status_p').text(window.jsonPResponse.recommendations+" recommendations done till now");
						 $('#maxIp').text(window.jsonPResponse.maxHitIp);
						 $('#maxIpDate').text(new Date(window.jsonPResponse.maxHitValue));
			    	 }
			    }
			});
			
		});
	}
});
