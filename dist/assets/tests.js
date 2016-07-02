define('r-s-ember/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('r-s-ember/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('r-s-ember/tests/components/pdf-upload.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/pdf-upload.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/pdf-upload.js should pass jshint.\ncomponents/pdf-upload.js: line 22, col 57, Missing semicolon.\ncomponents/pdf-upload.js: line 25, col 21, \'myChart\' is defined but never used.\ncomponents/pdf-upload.js: line 64, col 16, \'error\' is defined but never used.\ncomponents/pdf-upload.js: line 25, col 35, \'Chart\' is not defined.\ncomponents/pdf-upload.js: line 61, col 17, \'$\' is not defined.\ncomponents/pdf-upload.js: line 62, col 40, \'$\' is not defined.\n\n6 errors');
  });
});
define('r-s-ember/tests/controllers/recommend.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/recommend.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/recommend.js should pass jshint.\ncontrollers/recommend.js: line 6, col 38, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/recommend.js: line 24, col 65, Missing semicolon.\ncontrollers/recommend.js: line 27, col 29, \'myChart\' is defined but never used.\ncontrollers/recommend.js: line 10, col 17, \'$\' is not defined.\ncontrollers/recommend.js: line 63, col 26, \'$\' is not defined.\ncontrollers/recommend.js: line 64, col 40, \'$\' is not defined.\ncontrollers/recommend.js: line 27, col 43, \'Chart\' is not defined.\n\n7 errors');
  });
});
define('r-s-ember/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('r-s-ember/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('r-s-ember/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'r-s-ember/tests/helpers/start-app', 'r-s-ember/tests/helpers/destroy-app'], function (exports, _qunit, _rSEmberTestsHelpersStartApp, _rSEmberTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _rSEmberTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _rSEmberTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('r-s-ember/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('r-s-ember/tests/helpers/resolver', ['exports', 'r-s-ember/resolver', 'r-s-ember/config/environment'], function (exports, _rSEmberResolver, _rSEmberConfigEnvironment) {

  var resolver = _rSEmberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _rSEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _rSEmberConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('r-s-ember/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('r-s-ember/tests/helpers/start-app', ['exports', 'ember', 'r-s-ember/app', 'r-s-ember/config/environment'], function (exports, _ember, _rSEmberApp, _rSEmberConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _rSEmberConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _rSEmberApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('r-s-ember/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('r-s-ember/tests/integration/components/pdf-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('pdf-upload', 'Integration | Component | pdf upload', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
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
        statements: [['content', 'pdf-upload', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
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
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'pdf-upload', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('r-s-ember/tests/integration/components/pdf-upload-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/pdf-upload-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pdf-upload-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/models/recommend.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/recommend.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/recommend.js should pass jshint.');
  });
});
define('r-s-ember/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('r-s-ember/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('r-s-ember/tests/routes/error.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/error.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/error.js should pass jshint.');
  });
});
define('r-s-ember/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 18, col 38, Expected \'===\' and instead saw \'==\'.\nroutes/index.js: line 17, col 45, \'error\' is defined but never used.\nroutes/index.js: line 17, col 37, \'status\' is defined but never used.\nroutes/index.js: line 5, col 9, \'$\' is not defined.\nroutes/index.js: line 6, col 13, \'$\' is not defined.\nroutes/index.js: line 19, col 27, \'$\' is not defined.\nroutes/index.js: line 20, col 26, \'$\' is not defined.\nroutes/index.js: line 21, col 26, \'$\' is not defined.\nroutes/index.js: line 22, col 26, \'$\' is not defined.\nroutes/index.js: line 23, col 26, \'$\' is not defined.\nroutes/index.js: line 24, col 26, \'$\' is not defined.\nroutes/index.js: line 25, col 26, \'$\' is not defined.\nroutes/index.js: line 26, col 26, \'$\' is not defined.\nroutes/index.js: line 27, col 26, \'$\' is not defined.\nroutes/index.js: line 28, col 26, \'$\' is not defined.\nroutes/index.js: line 29, col 26, \'$\' is not defined.\nroutes/index.js: line 30, col 26, \'$\' is not defined.\nroutes/index.js: line 31, col 26, \'$\' is not defined.\nroutes/index.js: line 32, col 26, \'$\' is not defined.\nroutes/index.js: line 33, col 26, \'$\' is not defined.\nroutes/index.js: line 34, col 26, \'$\' is not defined.\n\n21 errors');
  });
});
define('r-s-ember/tests/routes/recommend.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/recommend.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/recommend.js should pass jshint.\nroutes/recommend.js: line 5, col 23, \'transition\' is defined but never used.\nroutes/recommend.js: line 5, col 16, \'model\' is defined but never used.\n\n2 errors');
  });
});
define('r-s-ember/tests/routes/search.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search.js should pass jshint.');
  });
});
define('r-s-ember/tests/serializers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/application.js should pass jshint.\nserializers/application.js: line 4, col 25, \'options\' is defined but never used.\nserializers/application.js: line 4, col 15, \'snapshot\' is defined but never used.\n\n2 errors');
  });
});
define('r-s-ember/tests/serializers/recommend.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/recommend.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/recommend.js should pass jshint.\nserializers/recommend.js: line 4, col 25, \'options\' is defined but never used.\nserializers/recommend.js: line 4, col 15, \'snapshot\' is defined but never used.\n\n2 errors');
  });
});
define('r-s-ember/tests/test-helper', ['exports', 'r-s-ember/tests/helpers/resolver', 'ember-qunit'], function (exports, _rSEmberTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_rSEmberTestsHelpersResolver['default']);
});
define('r-s-ember/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('r-s-ember/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/controllers/recommend-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:recommend', 'Unit | Controller | recommend', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('r-s-ember/tests/unit/controllers/recommend-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/recommend-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/recommend-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/models/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('index', 'Unit | Model | index', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('r-s-ember/tests/unit/models/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/index-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/models/recommend-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('recommend', 'Unit | Model | recommend', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('r-s-ember/tests/unit/models/recommend-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/recommend-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/recommend-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/routes/error-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:error', 'Unit | Route | error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('r-s-ember/tests/unit/routes/error-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/error-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/error-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('r-s-ember/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/routes/recommend-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:recommend', 'Unit | Route | recommend', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('r-s-ember/tests/unit/routes/recommend-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/recommend-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/recommend-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/routes/search-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:search', 'Unit | Route | search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('r-s-ember/tests/unit/routes/search-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/search-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/search-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/routes/users-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:users', 'Unit | Route | users', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('r-s-ember/tests/unit/routes/users-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/users-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/users-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/serializers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('r-s-ember/tests/unit/serializers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/serializers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.');
  });
});
define('r-s-ember/tests/unit/serializers/recommend-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('recommend', 'Unit | Serializer | recommend', {
    // Specify the other units that are required for this test.
    needs: ['serializer:recommend']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('r-s-ember/tests/unit/serializers/recommend-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/serializers/recommend-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/recommend-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('r-s-ember/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map