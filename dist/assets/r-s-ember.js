"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('r-s-ember/adapters/application', ['exports', 'ember-data/adapters/json-api'], function (exports, _emberDataAdaptersJsonApi) {
	exports['default'] = _emberDataAdaptersJsonApi['default'].extend({
		namespace: 'psapi',
		host: 'http://localhost:8082'
	});
});
define('r-s-ember/app', ['exports', 'ember', 'r-s-ember/resolver', 'ember-load-initializers', 'r-s-ember/config/environment'], function (exports, _ember, _rSEmberResolver, _emberLoadInitializers, _rSEmberConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = window.App = _ember['default'].Application.extend({
    modulePrefix: _rSEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _rSEmberConfigEnvironment['default'].podModulePrefix,
    Resolver: _rSEmberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _rSEmberConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('r-s-ember/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'r-s-ember/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _rSEmberConfigEnvironment) {

  var name = _rSEmberConfigEnvironment['default'].APP.name;
  var version = _rSEmberConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('r-s-ember/components/file-field', ['exports', 'ember-uploader/components/file-field'], function (exports, _emberUploaderComponentsFileField) {
  exports['default'] = _emberUploaderComponentsFileField['default'];
});
define('r-s-ember/components/pdf-upload', ['exports', 'ember', 'ember-uploader'], function (exports, _ember, _emberUploader) {
	exports['default'] = _emberUploader['default'].FileField.extend({

		url: "http://localhost:8082/psapi/upload",

		filesDidChange: function filesDidChange(files) {
			var uploader = _emberUploader['default'].Uploader.create({
				url: this.get('url'),
				method: 'post',
				paramNamespace: 'post'
			});

			if (!_ember['default'].isEmpty(files)) {
				uploader.upload(files[0]).then(function (data) {
					console.log(data);
					var labels = [];
					var dataSets = [];
					for (var i = 0; i < data.length; i++) {
						labels.push(data[i]["label"]);
						dataSets.push(data[i]["score"] * 1000);
					}
					var ctx = document.getElementById("myChart");
					var myChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: labels,
							datasets: [{
								label: 'Score matching your profile',
								data: dataSets,
								backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
								borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}
					});
					$('html, body').animate({
						scrollTop: $("#myChart").offset().top
					}, 2000);
				}, function (error) {
					// Handle failure
				});
			}
		}

	});
});
define('r-s-ember/controllers/recommend', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			recommend: function recommend(model) {
				if (model.get('skills') != undefined) {
					var modelVal = {
						skills: model.get('skills')
					};
					$.ajax({

						url: "http://localhost:8082/psapi/search",
						// Tell jQuery we're expecting JSONP
						dataType: "json",
						type: 'post',
						crossDomain: true,
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify(modelVal),
						success: function success(data) {
							var labels = [];
							var dataSets = [];
							for (var i = 0; i < data.length; i++) {
								labels.push(data[i]["label"]);
								dataSets.push(data[i]["score"] * 1000);
							}
							var ctx = document.getElementById("myChart");
							var myChart = new Chart(ctx, {
								type: 'bar',
								data: {
									labels: labels,
									datasets: [{
										label: 'Score matching your profile',
										data: dataSets,
										backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
										borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
										borderWidth: 1
									}]
								},
								options: {
									scales: {
										yAxes: [{
											ticks: {
												beginAtZero: true
											}
										}]
									}
								}
							});
							$('html, body').animate({
								scrollTop: $("#myChart").offset().top
							}, 2000);
						},
						error: function error(xhr, status, _error) {
							console.log(_error);
						}
					});
				}
			}
		}
	});
});
define('r-s-ember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('r-s-ember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('r-s-ember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'r-s-ember/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _rSEmberConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_rSEmberConfigEnvironment['default'].APP.name, _rSEmberConfigEnvironment['default'].APP.version)
  };
});
define('r-s-ember/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('r-s-ember/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('r-s-ember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('r-s-ember/initializers/export-application-global', ['exports', 'ember', 'r-s-ember/config/environment'], function (exports, _ember, _rSEmberConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_rSEmberConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _rSEmberConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_rSEmberConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('r-s-ember/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('r-s-ember/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('r-s-ember/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("r-s-ember/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('r-s-ember/models/recommend', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    firstName: (0, _emberDataAttr['default'])('string'),
    skills: (0, _emberDataAttr['default'])('string')
  });
});
define('r-s-ember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('r-s-ember/router', ['exports', 'ember', 'r-s-ember/config/environment'], function (exports, _ember, _rSEmberConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _rSEmberConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('recommend');
    this.route('error');
    this.route('search');
  });

  exports['default'] = Router;
});
define('r-s-ember/routes/error', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("r-s-ember/routes/index", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Route.extend({
		model: function model() {
			$(document).ready(function () {
				$.ajax({
					url: "http://localhost:8082/psapi/dashboards",

					// The name of the callback parameter, as specified by the YQL service
					jsonp: "callback",

					// Tell jQuery we're expecting JSONP
					dataType: "jsonp",
					success: function success(data) {
						console(data);
					},
					error: function error(xhr, status, _error) {
						if (xhr.status == 200) {
							$('#server_status_h3').text("OK");
							$('#server_status_p').text("Your server is working perfectly. Relax & enjoy.");
							$('#course_status_h3').text(window.jsonPResponse.courseStatus);
							$('#course_status_p').text("There are " + window.jsonPResponse.courseStatus + " courses available in total");
							$('#rec_status_h3').text(window.jsonPResponse.recommendations);
							$('#rec_status_p').text(window.jsonPResponse.recommendations + " recommendations done till now");
							$('#maxIp').text(window.jsonPResponse.maxHitIp);
							$('#maxIpDate').text(new Date(window.jsonPResponse.maxHitValue));
							$('#maxHit').text(window.jsonPResponse.maxHitCourse);
							$('#userCount').text(window.jsonPResponse.userCount + " Visitors");
							$('#lastDateVisited').text(window.jsonPResponse.lastDateVisited);
							$('#lastCourseSelected').text(window.jsonPResponse.lastCourseSelected);
							$('#matchScore').text("Match Score of " + window.jsonPResponse.matchScore);
							$('#recommendTimeAvg').text(window.jsonPResponse.recommendTimeAvg);
							$('#recommendPdf').text(window.jsonPResponse.recommendPdf);
							$('#recommendSearch').text(window.jsonPResponse.recommendSearch);
						}
					}
				});
			});
		}
	});
});
define('r-s-ember/routes/recommend', ['exports', 'ember'], function (exports, _ember) {
	var errorModel = false;

	exports['default'] = _ember['default'].Route.extend({
		afterModel: function afterModel(model, transition) {
			if (errorModel) {
				this.transitionTo('error');
			}
		},
		model: function model() {
			errorModel = false;
			return this.store.findAll('recommend')['catch'](function (reason) {
				console.log(reason);
				errorModel = true;
			});
		}

	});
});
define('r-s-ember/routes/search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('r-s-ember/serializers/application', ['exports', 'ember-data/serializers/json-api'], function (exports, _emberDataSerializersJsonApi) {
   exports['default'] = _emberDataSerializersJsonApi['default'].extend({
      serialize: function serialize(snapshot, options) {
         var json = this._super.apply(this, arguments);

         return json;
      }
   });
});
define('r-s-ember/serializers/recommend', ['exports', 'ember-data/serializers/json-api'], function (exports, _emberDataSerializersJsonApi) {
   exports['default'] = _emberDataSerializersJsonApi['default'].extend({
      serialize: function serialize(snapshot, options) {
         var json = this._super.apply(this, arguments);

         return json;
      }
   });
});
define('r-s-ember/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("r-s-ember/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "r-s-ember/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("r-s-ember/templates/components/pdf-upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "r-s-ember/templates/components/pdf-upload.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("r-s-ember/templates/error", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 3
            },
            "end": {
              "line": 8,
              "column": 60
            }
          },
          "moduleName": "r-s-ember/templates/error.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Recommend Programs/Courses For me");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 10
          }
        },
        "moduleName": "r-s-ember/templates/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "id", "main-content");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "wrapper");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("\n		Backend error occured while processing. Please try after some time.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "id", "takeToRecommend");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1, 3]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]], ["block", "link-to", ["recommend"], [], 0, null, ["loc", [null, [8, 3], [8, 72]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("r-s-ember/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 15
            },
            "end": {
              "line": 10,
              "column": 113
            }
          },
          "moduleName": "r-s-ember/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Recommend Programs/Courses For me");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 166,
            "column": 0
          }
        },
        "moduleName": "r-s-ember/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n\n        ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("main content start");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n      ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "id", "main-content");
        var el2 = dom.createTextNode("\n          ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "wrapper");
        var el3 = dom.createTextNode("\n\n              ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n\n                  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-lg-9 main-chart");
        var el5 = dom.createTextNode("\n              	");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("    \n                    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row mtbox");
        var el6 = dom.createTextNode("\n              \n                      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-2 col-md-offset-1 box0");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "box1");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8, "class", "li_cloud");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h3");
        dom.setAttribute(el8, "id", "rec_status_h3");
        var el9 = dom.createTextNode("NA");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        dom.setAttribute(el7, "id", "rec_status_p");
        var el8 = dom.createTextNode("Not able to gather information about number of recommendations");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-2 col-sm-2 box0");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "box1");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8, "class", "li_stack");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h3");
        dom.setAttribute(el8, "id", "course_status_h3");
        var el9 = dom.createTextNode("NA");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        dom.setAttribute(el7, "id", "course_status_p");
        var el8 = dom.createTextNode("Course details are not available");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-2 col-sm-2 box0");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "box1");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8, "class", "li_news");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h3");
        var el9 = dom.createTextNode("4");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        var el8 = dom.createTextNode("Heriot Watt Universities are present in 4 countries");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                      \n                      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-2 col-sm-2 box0");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "box1");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8, "class", "li_data");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("h3");
        dom.setAttribute(el8, "id", "server_status_h3");
        var el9 = dom.createTextNode("NA!");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("p");
        dom.setAttribute(el7, "id", "server_status_p");
        var el8 = dom.createTextNode("Your server is not working perfectly. :( ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    \n                    ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" /row mt ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("  \n                  \n                      \n                      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row mt");
        var el6 = dom.createTextNode("\n                      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" SERVER STATUS PANELS ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 col-sm-4 mb");
        var el7 = dom.createTextNode("\n                          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "white-panel pn donut-chart");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "white-header");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("Distinct Visitors Today");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "row");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "col-sm-6 col-xs-6 goleft");
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("p");
        dom.setAttribute(el10, "id", "userCount");
        var el11 = dom.createElement("i");
        dom.setAttribute(el11, "class", "fa fa-database");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode(" 70%");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                             ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "centered");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "http://amazonautonation.com/wp-content/uploads/2015/11/10574697_330195383842590_453268607_n.png");
        dom.setAttribute(el9, "width", "120");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n					                \n                          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("/grey-panel ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                        \n\n                        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 col-sm-4 mb");
        var el7 = dom.createTextNode("\n                          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "white-panel pn");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "white-header");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("TOP Hit Course");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "row");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "col-sm-6 col-xs-6 goleft");
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("p");
        dom.setAttribute(el10, "id", "maxHit");
        var el11 = dom.createElement("i");
        dom.setAttribute(el11, "class", "fa fa-heart");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode(" 122");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "col-sm-6 col-xs-6");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "centered");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "http://sdittcollege.org/images/courses.png");
        dom.setAttribute(el9, "width", "120");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4 ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                        \n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 mb");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" WHITE PANEL - TOP USER ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "white-panel pn");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "white-header");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("TOP USER IP");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("p");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "ui-zac.jpg");
        dom.setAttribute(el9, "class", "img-circle");
        dom.setAttribute(el9, "width", "80");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("p");
        var el9 = dom.createElement("b");
        dom.setAttribute(el9, "id", "maxIp");
        var el10 = dom.createTextNode("0.0.0.0");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "row");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "col-md-6");
        dom.setAttribute(el9, "style", "width:100%");
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("p");
        dom.setAttribute(el10, "class", "small mt");
        var el11 = dom.createTextNode("Last Accessed On");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("p");
        dom.setAttribute(el10, "id", "maxIpDate");
        var el11 = dom.createTextNode("2012");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4 ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                        \n\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" /row ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                    \n                            \n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" TWITTER PANEL ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 mb");
        var el7 = dom.createTextNode("\n                          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "darkblue-panel pn");
        var el8 = dom.createTextNode("\n                            ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "darkblue-header");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("Last Visitor");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n               ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "centered");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png");
        dom.setAttribute(el9, "width", "120");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                \n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("p");
        dom.setAttribute(el8, "id", "lastDateVisited");
        var el9 = dom.createTextNode("April 17, 2014");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("footer");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "");
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("h5");
        dom.setAttribute(el10, "id", "lastCourseSelected");
        dom.setAttribute(el10, "style", "color: white;");
        var el11 = dom.createElement("i");
        dom.setAttribute(el11, "class", "fa fa-hdd-o");
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("SS");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "");
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("h5");
        dom.setAttribute(el10, "id", "matchScore");
        dom.setAttribute(el10, "style", "color:white;");
        var el11 = dom.createTextNode("5");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                  ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" /darkblue panel ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4 ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            \n            \n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 col-sm-4 mb");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" REVENUE PANEL ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "darkblue-panel pn");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "darkblue-header");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("Number of Searches");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "centered");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "http://www.newdesignfile.com/postpic/2011/05/data-document-icon_244034.png");
        dom.setAttribute(el9, "width", "120");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("p");
        dom.setAttribute(el8, "class", "mt");
        dom.setAttribute(el8, "style", "color:white;");
        var el9 = dom.createElement("b");
        dom.setAttribute(el9, "id", "recommendPdf");
        var el10 = dom.createTextNode("17");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode(" via Pdf Upload");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("br");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("b");
        dom.setAttribute(el9, "id", "recommendSearch");
        var el10 = dom.createTextNode("0");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode(" via Normal");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4 ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            \n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "col-md-4 col-sm-4 mb");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment(" REVENUE PANEL ");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "darkblue-panel pn");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "darkblue-header");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("h5");
        var el10 = dom.createTextNode("Average Recommend Time");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "centered");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("img");
        dom.setAttribute(el9, "src", "http://icons.iconseeker.com/png/fullsize/isabi/time-machine-shaped.png");
        dom.setAttribute(el9, "width", "120");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                            ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("p");
        dom.setAttribute(el8, "class", "mt");
        dom.setAttribute(el8, "style", "color:white;");
        var el9 = dom.createElement("b");
        dom.setAttribute(el9, "id", "recommendTimeAvg");
        var el10 = dom.createTextNode("17");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("br");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("seconds");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" /col-md-4 ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            \n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" /row ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          \n      \n          \n                  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" /col-lg-9 END SECTION MIDDLE ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n                  \n              ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("/row ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n          ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n      ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3, 1, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["recommend"], ["class", "btn btn-primary btn-lg btn-block"], 0, null, ["loc", [null, [10, 15], [10, 125]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("r-s-ember/templates/recommend", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 10
          }
        },
        "moduleName": "r-s-ember/templates/recommend.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "id", "main-content");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "wrapper");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Recommend via Uploading Pdf");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	 ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "wrapper");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Recommend via Normal Search");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	 ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "class", "wrapper");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("canvas");
        dom.setAttribute(el4, "id", "myChart");
        dom.setAttribute(el4, "width", "400");
        dom.setAttribute(el4, "height", "400");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [3, 3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 3, 3);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        morphs[3] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["content", "pdf-upload", ["loc", [null, [6, 2], [6, 16]]]], ["element", "action", ["recommend", ["get", "model", ["loc", [null, [12, 29], [12, 34]]]]], ["on", "submit"], ["loc", [null, [12, 8], [12, 48]]]], ["inline", "textarea", [], ["value", ["subexpr", "@mut", [["get", "model.skills", ["loc", [null, [13, 21], [13, 33]]]]], [], []], "cols", "80", "rows", "6", "placeholder", "Skills OR Educational background OR Experience (keywords)"], ["loc", [null, [13, 4], [13, 126]]]], ["inline", "input", [], ["type", "submit", "value", ["subexpr", "@mut", [["get", "Search", ["loc", [null, [14, 32], [14, 38]]]]], [], []], "class", "btn btn-primary"], ["loc", [null, [14, 4], [14, 64]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("r-s-ember/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "r-s-ember/templates/search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('r-s-ember/config/environment', ['ember'], function(Ember) {
  var prefix = 'r-s-ember';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("r-s-ember/app")["default"].create({"name":"r-s-ember","version":"0.0.0+5f7bfe4f"});
}

/* jshint ignore:end */
//# sourceMappingURL=r-s-ember.map