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
	      uploader.upload(files[0]).then(data => {
				console.log(data);
				var labels = [];
				var dataSets = [];
				for(var i=0;i<data.length;i++){
					labels.push(data[i]["label"]);
					dataSets.push(data[i]["score"]*1000)
				}
				if(dataSets.length == 0){
					$('.close_on_click').show();
					$('#myChart').hide();
					return;
				}
				$('.close_on_click').hide();
				$('#myChart').show();
				var ctx = document.getElementById("myChart");
				var myChart = new Chart(ctx, {
				    type: 'bar',
				    data: {
				        labels: labels,
				        datasets: [{
				            label: 'Score matching your profile',
				            data: dataSets,
				            backgroundColor: [
				                'rgba(255, 99, 132, 0.2)',
				                'rgba(54, 162, 235, 0.2)',
				                'rgba(255, 206, 86, 0.2)',
				                'rgba(75, 192, 192, 0.2)',
				                'rgba(153, 102, 255, 0.2)',
				                'rgba(255, 159, 64, 0.2)'
				            ],
				            borderColor: [
				                'rgba(255,99,132,1)',
				                'rgba(54, 162, 235, 1)',
				                'rgba(255, 206, 86, 1)',
				                'rgba(75, 192, 192, 1)',
				                'rgba(153, 102, 255, 1)',
				                'rgba(255, 159, 64, 1)'
				            ],
				            borderWidth: 1
				        }]
				    },
				    options: {
				        scales: {
				            yAxes: [{
				                ticks: {
				                    beginAtZero:true
				                }
				            }]
				        }
				    }
				});
				$('html, body').animate({
					        scrollTop: $("#myChart").offset().top
					    }, 2000);
			}, error => {
			  // Handle failure
			});
	    }
  },

  
});
