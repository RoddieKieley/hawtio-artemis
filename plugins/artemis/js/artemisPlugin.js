/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @module ARTEMIS
 * @main ARTEMIS
 *
 * The main entrypoint for the ARTEMIS module
 *
 */
var ARTEMIS = (function (ARTEMIS) {

  /**
   * @property pluginName
   * @type {string}
   *
   * The name of this plugin
   */
  ARTEMIS.pluginName = "ARTEMIS";

  /**
   * @property log
   * @type {Logging.Logger}
   *
   * This plugin's logger instance
   */
  ARTEMIS.log = Logger.get(ARTEMIS.pluginName);

  /**
   * @property templatePath
   * @type {string}
   *
   * The top level path to this plugin's partials
   */
  ARTEMIS.templatePath = "plugins/artemis/html/";

  /**
   * @property jmxDomain
   * @type {string}
   *
   * The JMX domain this plugin mostly works with
   */
  ARTEMIS.jmxDomain = "hawtio"

  /**
   * @property mbeanType
   * @type {string}
   *
   * The mbean type this plugin will work with
   */
  ARTEMIS.mbeanType = "ARTEMISHandler";

  /**
   * @property mbean
   * @type {string}
   *
   * The mbean's full object name
   */
  ARTEMIS.mbean = ARTEMIS.jmxDomain + ":type=" + ARTEMIS.mbeanType;

  /**
   * @property SETTINGS_KEY
   * @type {string}
   *
   * The key used to fetch our settings from local storage
   */
  ARTEMIS.SETTINGS_KEY = 'ARTEMISSettings';

  /**
   * @property module
   * @type {object}
   *
   * This plugin's angularjs module instance
   */
  ARTEMIS.module = angular.module(ARTEMIS.pluginName, ['ngSanitize', 'ngResource', 'hawtio-core', 'hawtio-ui']);

  //https://code.angularjs.org/1.5.11/docs/guide/migration#migrating-from-1-2-to-1-3
  ARTEMIS.module.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
  }]);

  //http://devdocs.io/angularjs~1.5/api/ng/service/%24sce#show-me-an-example-using-sce-.html
  ARTEMIS.module.config(['$sceProvider', function ($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  }]);

  // set up the routing for this plugin, these are referenced by the subleveltabs added below
  ARTEMIS.module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/artemis/createAddress', {
        templateUrl: ARTEMIS.templatePath + 'createAddress.html'
      })
      .when('/artemis/deleteAddress', {
        templateUrl: ARTEMIS.templatePath + 'deleteAddress.html'
      })
      .when('/artemis/deleteQueue', {
        templateUrl: ARTEMIS.templatePath + 'deleteQueue.html'
      })
      .when('/artemis/createQueue', {
        templateUrl: ARTEMIS.templatePath + 'createQueue.html'
      })
      .when('/artemis/browseQueue', {
        templateUrl: ARTEMIS.templatePath + 'browseQueue.html'
      })
      .when('/jmx/browseQueue', {
        templateUrl: ARTEMIS.templatePath + 'browseQueue.html'
      })
      .when('/artemis/diagram', {
        templateUrl: ARTEMIS.templatePath + 'brokerDiagram.html'
      })
      .when('/jmx/diagram', {
        templateUrl: ARTEMIS.templatePath + 'brokerDiagram.html'
      })
      .when('/artemis/sendMessage', {
        templateUrl: ARTEMIS.templatePath + 'sendMessage.html'
      })
      .when('/jmx/sendMessage', {
        templateUrl: ARTEMIS.templatePath + 'sendMessage.html'
      })
      .when('/artemis/connections', {
        templateUrl: ARTEMIS.templatePath + 'connections.html'
      })
      .when('/jmx/connections', {
        templateUrl: ARTEMIS.templatePath + 'connections.html'
      })
      .when('/artemis/sessions', {
        templateUrl: ARTEMIS.templatePath + 'sessions.html'
      })
      .when('/jmx/sessions', {
        templateUrl: ARTEMIS.templatePath + 'sessions.html'
      })
      .when('/artemis/consumers', {
        templateUrl: ARTEMIS.templatePath + 'consumers.html'
      })
      .when('/jmx/consumers', {
        templateUrl: ARTEMIS.templatePath + 'consumers.html'
      })
      .when('/artemis/producers', {
        templateUrl: ARTEMIS.templatePath + 'producers.html'
      })
      .when('/jmx/producers', {
        templateUrl: ARTEMIS.templatePath + 'producers.html'
      })
      .when('/artemis/addresses', {
        templateUrl: ARTEMIS.templatePath + 'addresses.html'
      })
      .when('/jmx/addresses', {
        templateUrl: ARTEMIS.templatePath + 'addresses.html'
      })
      .when('/artemis/queues', {
        templateUrl: ARTEMIS.templatePath + 'queues.html'
      })
      .when('/jmx/queues', {
        templateUrl: ARTEMIS.templatePath + 'queues.html'
      });
  }]);

  ARTEMIS.module.factory('artemisMessage', function () {
    return { 'message': null };
  });
  ARTEMIS.module.factory('artemisConnection', function () {
    return { 'connection': null };
  });
  ARTEMIS.module.factory('artemisSession', function () {
    return { 'session': null };
  });
  ARTEMIS.module.factory('artemisConsumer', function () {
    return { 'consumer': null };
  });
  ARTEMIS.module.factory('artemisProducer', function () {
    return { 'producer': null };
  });
  ARTEMIS.module.factory('artemisQueue', function () {
    return { 'queue': null };
  });
  ARTEMIS.module.factory('artemisAddress', function () {
    return { 'address': null };
  });

  return ARTEMIS;
}(ARTEMIS || {}));

// Very important!  Add our module to hawtioPluginLoader so it
// bootstraps our module
hawtioPluginLoader.addModule(ARTEMIS.pluginName);
