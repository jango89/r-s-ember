import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		recommend: function(model){
			if(model.get('skills') != undefined){
				var modelVal = {
	            	skills: model.get('skills')
		        };
				$.ajax({

				    url: "http://localhost:8082/psapi/search",
				    // Tell jQuery we're expecting JSONP
				    dataType: "json",
				    type: 'post',
				    crossDomain: true,
				    contentType:"application/json; charset=utf-8",
				    data: JSON.stringify(modelVal),
				    success : function(data){
				    	var labels = [];
						var dataSets = [];
						for(var i=0;i<data.length;i++){
							labels.push(data[i]["label"]);
							dataSets.push(data[i]["score"]*1000)
						}
						$('.close_on_click_error').hide();
						if(dataSets.length == 0){
							$('#myChart').hide();
							$('.close_on_click').show();
							return;
						}
						$('#myChart').show();
						$('.close_on_click').hide();
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
				    },
				    error:function(xhr, status, error){
				    	 console.log(error);
						$('.close_on_click_error').show();
				    }
				});	
			}
		}
	}
});
