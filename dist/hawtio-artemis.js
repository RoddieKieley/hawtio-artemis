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
var ARTEMIS;
(function (ARTEMIS) {
    ARTEMIS.jmsHeaderSchema = {
        definitions: {
            headers: {
                properties: {
                    JMSCorrelationID: {
                        type: "java.lang.String"
                    },
                    JMSDeliveryMode: {
                        "type": "string",
                        "enum": [
                            "PERSISTENT",
                            "NON_PERSISTENT"
                        ]
                    },
                    JMSDestination: {
                        type: "javax.jms.Destination"
                    },
                    JMSExpiration: {
                        type: "long"
                    },
                    JMSPriority: {
                        type: "int"
                    },
                    JMSReplyTo: {
                        type: "javax.jms.Destination"
                    },
                    JMSType: {
                        type: "java.lang.String"
                    },
                    JMSXGroupId: {
                        type: "java.lang.String"
                    },
                    _AMQ_SCHED_DELIVERY: {
                        type: "java.lang.String"
                    }
                }
            },
            "javax.jms.Destination": {
                type: "java.lang.String"
            }
        }
    };
})(ARTEMIS || (ARTEMIS = {}));
//# sourceMappingURL=jmsHeaderSchema.js.map
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
var ARTEMIS = (function(ARTEMIS) {

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
   ARTEMIS.module = angular.module(ARTEMIS.pluginName, ['ngSanitize', 'ngResource', 'hawtio-core', 'camel', 'hawtio-ui']);

   //https://code.angularjs.org/1.5.11/docs/guide/migration#migrating-from-1-2-to-1-3
    angular.module(ARTEMIS.pluginName).config(['$controllerProvider', function($controllerProvider) {
      // this option might be handy for migrating old apps, but please don't use it
      // in new ones!
      $controllerProvider.allowGlobals();
    }]);

    //http://devdocs.io/angularjs~1.5/api/ng/service/%24sce#show-me-an-example-using-sce-.html
    angular.module(ARTEMIS.pluginName).config(['$sceProvider', function($sceProvider) {
      // Completely disable SCE.  For demonstration purposes only!
      // Do not use in new projects.
      $sceProvider.enabled(false);
    }]);

   // set up the routing for this plugin, these are referenced by the subleveltabs added below
   ARTEMIS.module.config(function($routeProvider) {
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
   });

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

   // one-time initialization happens in the run function
   // of our module
   ARTEMIS.module.run(function(HawtioNav, workspace, viewRegistry, helpRegistry, preferencesRegistry, localStorage, jolokia, ARTEMISService, $rootScope, preLogoutTasks, $templateCache) {
      // let folks know we're actually running
      ARTEMIS.log.info("plugin running " + jolokia);

      var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

      ARTEMISService.initArtemis();

      // tell hawtio that we have our own custom layout for our view
      viewRegistry['{ "main-tab": "artemis" }'] = ARTEMIS.templatePath + "artemisLayout.html";

      helpRegistry.addUserDoc("artemis", ARTEMIS.templatePath + "../doc/" + "help.md", function () {
         return workspace.treeContainsDomainAndProperties(artemisJmxDomain);
      });

      preferencesRegistry.addTab("Artemis", ARTEMIS.templatePath + "preferences.html", function () {
         return workspace.treeContainsDomainAndProperties(artemisJmxDomain);
      });

      // Add a top level tab to hawtio's navigation bar
      var builder = HawtioNav.builder();
      var tab = builder.id('artemis')
	                   .title(function() { return 'Artemis' })
	                   .defaultPage(
	                   {rank: 15,
			            isValid: function(yes, no)
			            {var name = 'ArtemisDefaultPage';
			             workspace.addNamedTreePostProcessor(name, function (tree)
			             {workspace.removeNamedTreePostProcessor(name);
				          if (workspace.treeContainsDomainAndProperties(artemisJmxDomain))
				          {
				              yes();
				          }
				          else
				          {
				              no();
				          }
			             });
			            },
		               })
	                   .href(function () { return '/jmx/attributes' })
		               .isValid(function () { return workspace.treeContainsDomainAndProperties(artemisJmxDomain); })
		               .build();

      tab.tabs = Jmx.getNavItems(builder, workspace, $templateCache, 'artemis');
      subLevelTabs = tab.tabs;

      subLevelTabs.push({
            id: 'artemis-create-address',
            title: function() { return '<i class="fa fa-plus"></i> Create' },
            tooltip: function() { return "Create a new address" },
            show: function() { return isBroker(workspace, artemisJmxDomain) || isAddressFolder(workspace, artemisJmxDomain); },
            href: function() { return "/artemis/createAddress" }
        });

      subLevelTabs.push({
         id: 'artemis-delete-address',
         title: function() { return '<i class="fa fa-remove"></i> Delete' },
         tooltip: function() { return "Delete an address" },
         index: 4,
         show: function () { return isAddress(workspace, artemisJmxDomain); },
         href: function () { return "/artemis/deleteAddress"; }
      });

      subLevelTabs.push({
         id: 'artemis-create-queue',
         title: function() { return '<i class="fa fa-plus"></i> Create' },
         tooltip: function() { return "Create a new queue" },
         show: function () { return isAddress(workspace, artemisJmxDomain) },
         href: function () { return "/artemis/createQueue" }
      });

        subLevelTabs.push({
           id: 'artemis-delete-queue',
           title: function() { return '<i class="fa fa-remove"></i> Delete' },
           tooltip: function() { return "Delete or purge this queue" },
           show: function () { return isQueue(workspace, artemisJmxDomain); },
           href: function () { return "/artemis/deleteQueue" }
        });

        subLevelTabs.push({
         id: 'artemis-browse-queue',
           title: function() { return '<i class="fa fa-envelope"></i> Browse' },
           tooltip: function() { return "Browse the messages on the queue" },
           show: function () { return isQueue(workspace, artemisJmxDomain); },
           href: function () { return "/artemis/browseQueue" + workspace.hash(); }
        });

      subLevelTabs.push({
         id: 'artemis-send-message',
         title: function() { return '<i class="fa fa-pencil"></i> Send' },
         tooltip: function() { return "Send a message to this address" },
         show: function () { return isAddress(workspace, artemisJmxDomain) || isQueue(workspace, artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/sendMessage"; else return  "/jmx/sendMessage";}
         //href: function () { return "/artemis/sendMessage";}
      });

      subLevelTabs.unshift({
         id: 'artemis-view-diagram',
         title: function() { return '<i class="fa fa-picture-o"></i> Diagram&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|' },
         tooltip: function() { return "View a diagram of the producers, destinations and consumers" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/diagram"; else return  "/jmx/diagram";}
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-queues',
         title: function() { return '<i class="fa fa-th-list"></i> Queues' },
         tooltip: function() { return "Manage Queues" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/queues"; else return  "/jmx/queues"; }
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-addresses',
         title: function() { return '<i class="fa fa-book"></i> Addresses' },
         tooltip: function() { return "Manage Addresses" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/addresses"; else return  "/artemis/addresses"; }
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-producers',
         title: function() { return '<i class="fa fa-upload"></i> Producers' },
         tooltip: function() { return "Manage Producers" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/producers"; else return  "/jmx/producers"; }
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-consumers',
         title: function() { return '<i class="fa fa-download"></i> Consumers' },
         tooltip: function() { return "Manage Consumers" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/consumers"; else return  "/jmx/consumers"; }
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-sessions',
         title: function() { return '<i class="fa fa-tasks"></i> Sessions' },
         tooltip: function() { return "Manage Sessions" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/sessions"; else return  "/jmx/sessions"; }
      });

      subLevelTabs.unshift({
         id: 'artemis-manage-connections',
         title: function() { return '<i class="fa fa-signal"></i> Connections' },
         tooltip: function() { return "Manage Connections" },
         show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
         href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/connections"; else return  "/jmx/connections"; }
      });
      HawtioNav.add(tab);

      preLogoutTasks.addTask("clearArtemisCredentials", () => {
          localStorage.removeItem('artemisUserName');
          localStorage.removeItem('artemisPassword');
      });
});

   function isBroker(workspace, domain) {
      return workspace.hasDomainAndProperties(domain, {'broker': 'Broker'}, 3);
   }

   function isAddressFolder(workspace, domain) {
      return workspace.selectionHasDomainAndLastFolderName(domain, 'addresses');
   }

   function isAddress(workspace, domain) {
      return workspace.hasDomainAndProperties(domain, {'component': 'addresses'}) && !workspace.hasDomainAndProperties(domain, {'subcomponent': 'queues'}) && !workspace.hasDomainAndProperties(domain, {'subcomponent': 'diverts'});
   }

   function isDivert(workspace, domain) {
      return workspace.hasDomainAndProperties(domain, {'subcomponent': 'diverts'});
   }

   function isQueue(workspace, domain) {
      return workspace.hasDomainAndProperties(domain, {'subcomponent': 'queues'});
   }

   return ARTEMIS;
}(ARTEMIS || {}));

// Very important!  Add our module to hawtioPluginLoader so it
// bootstraps our module
hawtioPluginLoader.addModule(ARTEMIS.pluginName);

/*
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 Architecture
 */
function ArtemisConsole() {

   this.getServerAttributes = function (jolokia, mBean) {
      var req1 = { type: "read", mbean: mBean};
      return jolokia.request(req1, {method: "post"});
   };

   this.createAddress = function (mbean, jolokia, name, routingType,  method) {
      jolokia.execute(mbean, "createAddress(java.lang.String,java.lang.String)", name, routingType,  method);
   };

   this.deleteAddress = function (mbean, jolokia, name, method) {
      jolokia.execute(mbean, "deleteAddress(java.lang.String)", name,  method);
   };

   this.createQueue = function (mbean, jolokia, address, routingType, name, durable, filter, maxConsumers, purgeWhenNoConsumers, method) {
      jolokia.execute(mbean, "createQueue(java.lang.String,java.lang.String,java.lang.String,java.lang.String,boolean,int,boolean,boolean)", address, routingType, name, filter, durable, maxConsumers, purgeWhenNoConsumers, true, method);
   };

   this.deleteQueue = function (mbean, jolokia, name, method) {
      jolokia.execute(mbean, "destroyQueue(java.lang.String)", name,  method);
   };

   this.purgeQueue = function (mbean, jolokia, method) {
	  jolokia.execute(mbean, "removeAllMessages()", method);
   };

   this.browse = function (mbean, jolokia, method) {
      jolokia.request({ type: 'exec', mbean: mbean, operation: 'browse()' }, method);
   };

   this.deleteMessage = function (mbean, jolokia, id,  method) {
      ARTEMIS.log.info("executing on " + mbean);
      jolokia.execute(mbean, "removeMessage(long)", id, method);
   };

   this.moveMessage = function (mbean, jolokia, id, queueName,  method) {
      jolokia.execute(mbean, "moveMessage(long,java.lang.String)", id, queueName, method);
   };

   this.retryMessage = function (mbean, jolokia, id, method) {
      jolokia.execute(mbean, "retryMessage(java.lang.String)", id,  method);
   };

   this.sendMessage = function (mbean, jolokia, headers, type, body, durable, user, pwd, method) {
      jolokia.execute(mbean, "sendMessage(java.util.Map, int, java.lang.String, boolean, java.lang.String, java.lang.String)", headers, type, body, durable, user, pwd,  method);
   };

   this.getConsumers = function (mbean, jolokia, method) {
      jolokia.request({ type: 'exec', mbean: mbean, operation: 'listAllConsumersAsJSON()' }, method);
   };

   this.getRemoteBrokers = function (mbean, jolokia, method) {
      jolokia.request({ type: 'exec', mbean: mbean, operation: 'listNetworkTopology()' }, method);
   };

   this.ownUnescape = function (name) {
      //simple return unescape(name); does not work for this :(
      return name.replace(/\\\\/g, "\\").replace(/\\\*/g, "*").replace(/\\\?/g, "?");
   };
}

function getServerAttributes() {
   var console = new ArtemisConsole();
   //return console.getVersion(new Jolokia("http://localhost:8161/jolokia/"));
   return console.getVersion(new Jolokia("http://localhost:8778/jolokia/"));
}

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
 */

var ARTEMIS = (function(ARTEMIS) {

  ARTEMIS.SERVER = 'Server Messages';


  // The ARTEMIS service handles the connection to
  // the Artemis Jolokia server in the background
  ARTEMIS.module.factory("ARTEMISService", function(jolokia, $rootScope) {
    var self = {
      artemisConsole: undefined,

      getVersion: function(jolokia) {
        ARTEMIS.log.info("Connecting to ARTEMIS service: " + self.artemisConsole.getServerAttributes(jolokia));
      } ,
      initArtemis: function(broker) {
        ARTEMIS.log.info("*************creating Artemis Console************");
        self.artemisConsole = new ArtemisConsole();
      }
    };

    return self;
  });

  return ARTEMIS;
}(ARTEMIS || {}));


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
var ARTEMIS;
(function (ARTEMIS) {
    ARTEMIS.log = Logger.get("ARTEMIS");
    ARTEMIS.jmxDomain = 'org.apache.ARTEMIS';
    function getSelectionQueuesFolder(workspace) {
        function findQueuesFolder(node) {
            if (node) {
                if (node.title === "Queues" || node.title === "Queue") {
                    return node;
                }
                var parent = node.parent;
                if (parent) {
                    return findQueuesFolder(parent);
                }
            }
            return null;
        }
        var selection = workspace.selection;
        if (selection) {
            return findQueuesFolder(selection);
        }
        return null;
    }
    ARTEMIS.getSelectionQueuesFolder = getSelectionQueuesFolder;
    function getSelectionTopicsFolder(workspace) {
        function findTopicsFolder(node) {
            var answer = null;
            if (node) {
                if (node.title === "Topics" || node.title === "Topic") {
                    answer = node;
                }
                if (answer === null) {
                    angular.forEach(node.children, function (child) {
                        if (child.title === "Topics" || child.title === "Topic") {
                            answer = child;
                        }
                    });
                }
            }
            return answer;
        }
        var selection = workspace.selection;
        if (selection) {
            return findTopicsFolder(selection);
        }
        return null;
    }
    ARTEMIS.getSelectionTopicsFolder = getSelectionTopicsFolder;
    /**
     * Sets $scope.row to currently selected JMS message.
     * Used in:
     *  - ARTEMIS/js/browse.ts
     *  - camel/js/browseEndpoint.ts
     *
     * TODO: remove $scope argument and operate directly on other variables. but it's too much side effects here...
     *
     * @param message
     * @param key unique key inside message that distinguishes between values
     * @param $scope
     */
    function selectCurrentMessage(message, key, $scope) {
        // clicking on message's link would interfere with messages selected with checkboxes
        if ('selectAll' in $scope.gridOptions) {
            $scope.gridOptions.selectAll(false);
        }
        else {
            $scope.gridOptions.selectedItems.length = 0;
        }
        var idx = Core.pathGet(message, ["rowIndex"]) || Core.pathGet(message, ['index']);
        var jmsMessageID = Core.pathGet(message, ["entity", key]);
        $scope.rowIndex = idx;
        var selected = $scope.gridOptions.selectedItems;
        selected.splice(0, selected.length);
        if (idx >= 0 && idx < $scope.messages.length) {
            $scope.row = $scope.messages.find(function (msg) { return msg[key] === jmsMessageID; });
            if ($scope.row) {
                selected.push($scope.row);
            }
        }
        else {
            $scope.row = null;
        }
    }
    ARTEMIS.selectCurrentMessage = selectCurrentMessage;
    /**
     * - Adds functions needed for message browsing with details
     * - Adds a watch to deselect all rows after closing the slideout with message details
     * TODO: export these functions too?
     *
     * @param $scope
     */
    function decorate($scope) {
        $scope.selectRowIndex = function (idx) {
            $scope.rowIndex = idx;
            var selected = $scope.gridOptions.selectedItems;
            selected.splice(0, selected.length);
            if (idx >= 0 && idx < $scope.messages.length) {
                $scope.row = $scope.messages[idx];
                if ($scope.row) {
                    selected.push($scope.row);
                }
            }
            else {
                $scope.row = null;
            }
        };
        $scope.$watch("showMessageDetails", function () {
            if (!$scope.showMessageDetails) {
                $scope.row = null;
                $scope.gridOptions.selectedItems.splice(0, $scope.gridOptions.selectedItems.length);
            }
        });
    }
    ARTEMIS.decorate = decorate;

    function getAddressNid(address, $location) {
       var rootNID = getRootNid($location);
       var targetNID = rootNID + "-addresses-\"" + address.name + "\"";
       ARTEMIS.log.info("targetNID=" + targetNID);
       return targetNID;
    }
    ARTEMIS.getAddressNid = getAddressNid;

    function getQueueNid(queue, $location) {
       var rootNID = getRootNid($location);
       var targetNID = rootNID + "-addresses-\"" + queue.address + "\"-queues-\"" + queue.routingType.toLowerCase() + "\"-\"" + queue.name + "\"";
         return targetNID;
    }
    ARTEMIS.getQueueNid = getQueueNid;

    function getRootNid($location) {
       var currentNid = $location.search()['nid'];
       var firstQoute = currentNid.indexOf('"');
       var secondQuote = currentNid.indexOf('"', firstQoute + 1);
       var rootNID = currentNid.substring(0, secondQuote + 1);
    return rootNID;
}
})(ARTEMIS || (ARTEMIS = {}));
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
/// <reference path="artemisPlugin.ts"/>
var ARTEMIS;
(function (ARTEMIS) {
    ARTEMIS.module.controller("ARTEMIS.TreeHeaderController", ["$scope", function ($scope) {
    //ARTEMIS.TreeHeaderController = function ($scope) {
        $scope.expandAll = function () {
            Tree.expandAll("#artemistree");
        };
        $scope.contractAll = function () {
            Tree.contractAll("#artemistree");
        };
    //};
    }]);
    ARTEMIS.module.controller("ARTEMIS.TreeController", ["$scope", "$location", "workspace", "localStorage", function ($scope, $location, workspace, localStorage) {
        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";
        ARTEMIS.log.info("init tree " + artemisJmxDomain);
        $scope.$on("$routeChangeSuccess", function (event, current, previous) {
            // lets do this asynchronously to avoid Error: $digest already in progress
            setTimeout(updateSelectionFromURL, 50);
        });
        $scope.$watch('workspace.tree', function () {
            reloadTree();
        });
        $scope.$on('jmxTreeUpdated', function () {
            reloadTree();
        });
        function reloadTree() {
            ARTEMIS.log.info("workspace tree has changed, lets reload the artemis tree");
            var children = [];
            var tree = workspace.tree;

            ARTEMIS.log.info("tree="+tree);
            if (tree) {
                var domainName = artemisJmxDomain;
                var folder = tree.get(domainName);

                ARTEMIS.log.info("folder="+folder);
                if (folder) {
                    children = folder.children;
                }
                var treeElement = $("#artemistree");
                Jmx.enableTree($scope, $location, workspace, treeElement, children, true);
                // lets do this asynchronously to avoid Error: $digest already in progress
                setTimeout(updateSelectionFromURL, 50);
            }
        }
        function updateSelectionFromURL() {
            Jmx.updateTreeSelectionFromURLAndAutoSelect($location, $("#artemistree"), function (first) {
                // use function to auto select the queue folder on the 1st broker
                var jms = first.getChildren()[0];
                ARTEMIS.log.info("%%%%%%" + jms);
                var queues = jms.getChildren()[0];
                if (queues && queues.data.title === 'Queue') {
                    first = queues;
                    first.expand(true);
                    return first;
                }
                return null;
            }, true);
        }
    }]);

    //ARTEMIS.module.controller("ARTEMIS.TreeHeaderController", ARTEMIS.TreeHeaderController);

})(ARTEMIS || (ARTEMIS = {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

   /**
    * @method PreferencesController
    * @param $scope
    *
    * Controller for the Preferences interface
    */
   ARTEMIS.PreferencesController = function ($scope, localStorage, userDetails, $rootScope) {
      Core.initPreferenceScope($scope, localStorage, {
         'artemisUserName': {
            'value': userDetails.username
         },
         'artemisPassword': {
            'value': userDetails.password
         },
         'artemisDLQ': {
            'value': "DLQ"
         },
         'artemisExpiryQueue': {
            'value': "ExpiryQueue"
         },
         'artemisBrowseBytesMessages': {
            'value': 1,
            'converter': parseInt,
            'formatter': function (value) {
               return "" + value;
            }
         }
      });
   };

   ARTEMIS.module.controller("ARTEMIS.PreferencesController", ARTEMIS.PreferencesController);

   return ARTEMIS;

}(ARTEMIS || {}));


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
 */
var ARTEMIS = (function(ARTEMIS) {

    /**
     * @method AddressController
     * @param $scope
     * @param ARTEMISService
     *
     * Controller for the Create interface
     */
    ARTEMIS.AddressController = function ($scope, workspace, ARTEMISService, jolokia, localStorage) {
        Core.initPreferenceScope($scope, localStorage, {
            'routingType': {
                'value': 0,
                'converter': parseInt,
                'formatter': parseInt
            }
        });
        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";
        $scope.workspace = workspace;
        $scope.message = "";
        $scope.deleteDialog = false;
        $scope.$watch('workspace.selection', function () {
            workspace.moveIfViewInvalid();
        });
        function operationSuccess() {
            $scope.addressName = "";
            $scope.workspace.operationCounter += 1;
            Core.$apply($scope);
            Core.notification("success", $scope.message);
            $scope.workspace.loadTree();
        }
        function deleteSuccess() {
            // lets set the selection to the parent
            workspace.removeAndSelectParentNode();
            $scope.workspace.operationCounter += 1;
            Core.$apply($scope);
            Core.notification("success", $scope.message);
            $scope.workspace.loadTree();
        }
        $scope.createAddress = function (name, routingType) {
            var mbean = getBrokerMBean(jolokia);
            if (mbean) {
                if (routingType == 0) {
                    $scope.message = "Created  Multicast Address " + name;
                    ARTEMIS.log.info($scope.message);
                    ARTEMISService.artemisConsole.createAddress(mbean, jolokia, name, "MULTICAST", Core.onSuccess(operationSuccess));
                }
                else if (routingType == 1) {
                    $scope.message = "Created Anycast Address " + name;
                    ARTEMIS.log.info($scope.message);
                    ARTEMISService.artemisConsole.createAddress(mbean, jolokia, name, "ANYCAST", Core.onSuccess(operationSuccess));
                }
                else {
                    $scope.message = "Created Anycast/Multicast Address " + name;
                    ARTEMIS.log.info($scope.message);
                    ARTEMISService.artemisConsole.createAddress(mbean, jolokia, name, "ANYCAST,MULTICAST", Core.onSuccess(operationSuccess));
                }
            }
        };
        $scope.deleteAddress = function () {
            var selection = workspace.selection;
            var entries = selection.entries;
            var mbean = getBrokerMBean(jolokia);
            ARTEMIS.log.info(mbean);
            if (mbean) {
                if (selection && jolokia && entries) {
                    var domain = selection.domain;
                    var name = entries["address"];
                    name = name.replace(/['"]+/g, '');
                    name = ARTEMISService.artemisConsole.ownUnescape(name);
                    ARTEMIS.log.info(name);
                    if (name.charAt(0) === '"' && name.charAt(name.length -1) === '"')
                    {
                        name = name.substr(1,name.length -2);
                    }
                    name = ARTEMISService.artemisConsole.ownUnescape(name);
                    ARTEMIS.log.info(name);
                    var operation;
                    $scope.message = "Deleted address " + name;
                    ARTEMISService.artemisConsole.deleteAddress(mbean, jolokia, name, Core.onSuccess(deleteSuccess));
                }
            }
        };
        $scope.name = function () {
            var selection = workspace.selection;
            if (selection) {
                return ARTEMISService.artemisConsole.ownUnescape(selection.title);
            }
            return null;
        };

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        }
    };

    return ARTEMIS;
} (ARTEMIS || {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.AddressesController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisAddress) {
    //ARTEMIS.module.controller("ARTEMIS.AddressesController", ["$scope", "$location", "workspace", "ARTEMISService", "jolokia", "localStorage", "artemisAddress", function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisAddress) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        $scope.$on("$routeChangeSuccess", function (event, current, previous) {
            // lets do this asynchronously to avoid Error: $digest already in progress
            setTimeout(updateSelectionFromURL, 50);
        });


        function updateSelectionFromURL() {
            // TODO: Need to get the nid updating properly
            //$location.path("jmx/attributes").search({"tab": "artemis", "nid": ARTEMIS.getAddressNid(row.entity, $location)});
            Jmx.updateTreeSelectionFromURLAndAutoSelect($location, $("#artemistree"), function (first) {
                // use function to auto select the queue folder on the 1st broker
                var jms = first.getChildren()[0];
                ARTEMIS.log.info("%%%%%%" + jms);
                var queues = jms.getChildren()[0];
                if (queues && queues.data.title === 'Queue') {
                    first = queues;
                    first.expand(true);
                    return first;
                }
                return null;
            }, true);
        }

        /**
         *  Required For Each Object Type
         */

        var objectType = "address";
        var method = 'listAddresses(java.lang.String, int, int)';

        var attributes = [
           {
               field: 'manage',
               displayName: 'manage',
               width: '*',
               cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.navigateToAddressAtts(row)">attributes</a>&nbsp;<a href="" ng-click="row.entity.navigateToAddressOps(row)">operations</a></div>'
           },
           {
                field: 'id',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'name',
                displayName: 'Name',
                width: '*'
            },
            {
                field: 'routingTypes',
                displayName: 'Routing Types',
                width: '*',
                sortable: false
            },
            {
                field: 'queueCount',
                displayName: 'Queue Count',
                width: '*',
                sortable: false
            }
        ];
        $scope.filter = {
            fieldOptions: [
                {id: 'ID', name: 'ID'},
                {id: 'NAME', name: 'Name'},
                {id: 'ROUTING_TYPES', name: 'Routing Types'},
                {id: 'QUEUE_COUNT', name: 'Queue Count'},
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'},
                {id: 'GREATER_THAN', name: 'Greater Than'},
                {id: 'LESS_THAN', name: 'Less Than'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "ID"
            }
        };

        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */


        if (artemisAddress.address) {
            $scope.filter.values.field = $scope.filter.fieldOptions[1].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisAddress.address.address;
            artemisAddress.address = null;
        }

        $scope.navigateToAddressAtts = function (row) {
            $location.path("jmx/attributes").search({"tab": "artemis", "nid": ARTEMIS.getAddressNid(row.entity, $location)});
        };
        $scope.navigateToAddressOps = function (row) {
            $location.path("jmx/operations").search({"tab": "artemis", "nid": ARTEMIS.getAddressNid(row.entity, $location)});
        };
        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
            fields: ["id"],
            columns: ["id"],
            directions: ["asc"]
        };
        var refreshed = false;

        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.id; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };

        $scope.refresh = function () {
            //refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            console.log("populateTable with response: " + response);
            var data = JSON.parse(response.value);
            //console.log("Got data: ", data);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (address) {
              address.navigateToAddressOps = $scope.navigateToAddressOps;
              address.navigateToAddressAtts = $scope.navigateToAddressAtts;
            })

            $scope.totalServerItems = data["count"];
            console.log("totalServerItems: ", $scope.totalServerItems);
            $scope.gridOptions.pagingOptions.currentPage = 1;
//            if (refreshed == true) {
//                $scope.gridOptions.pagingOptions.currentPage = 1;
//                refreshed = false;
//            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    //}]);

    return ARTEMIS;

} (ARTEMIS || {}));


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
 */
var ARTEMIS = (function(ARTEMIS) {
   ARTEMIS.BrokerDiagramController = function ($scope, $compile, $location, localStorage, ARTEMISService, jolokia, workspace, $routeParams) {

      //Fabric.initScope($scope, $location, jolokia, workspace);
      var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

      $scope.selectedNode = null;
      var defaultFlags = {
         panel: true,
         popup: false,
         label: true,
         group: false,
         profile: false,
         slave: false,
         broker: true,
         network: true,
         container: false,
         address: true,
         queue: true,
         consumer: true,
         producer: true
      };
      $scope.viewSettings = {};
      $scope.shapeSize = {
         broker: 20,
         queue: 14,
         address: 14
      };
      var redrawGraph = Core.throttled(doRedrawGraph, 1000);
      var graphBuilder = new ForceGraph.GraphBuilder();
      Core.bindModelToSearchParam($scope, $location, "searchFilter", "q", "");
      angular.forEach(defaultFlags, function (defaultValue, key) {
         var modelName = "viewSettings." + key;
         // bind model values to search params...
         function currentValue() {
            var answer = $location.search()[paramName] || defaultValue;
            return answer === "false" ? false : answer;
         }

         var paramName = key;
         var value = currentValue();
         Core.pathSet($scope, modelName, value);
         $scope.$watch(modelName, function () {
            var current = Core.pathGet($scope, modelName);
            var old = currentValue();
            if (current !== old) {
               var defaultValue = defaultFlags[key];
               if (current !== defaultValue) {
                  if (!current) {
                     current = "false";
                  }
                  $location.search(paramName, current);
               }
               else {
                  $location.search(paramName, null);
               }
            }
            redrawGraph();
         });
      });
      $scope.connectToBroker = function () {
         var selectedNode = $scope.selectedNode;
         if (selectedNode) {
            var container = selectedNode["brokerContainer"] || selectedNode;
            connectToBroker(container, selectedNode["brokerName"]);
         }
      };
      function connectToBroker(container, brokerName, postfix) {
         if (postfix === void 0) {
            postfix = null;
         }

         var view = "/jmx/attributes?tab=artemis";
         if (!postfix) {
            if (brokerName) {
               // lets default to the broker view
               postfix = "nid=root-" + artemisJmxDomain + "-Broker-" + brokerName;
            }
         }
         if (postfix) {
            view += "&" + postfix;
         }
         var path = Core.url("/#" + view);
         window.open(path, '_destination');
         window.focus();
      }

      $scope.connectToDestination = function () {
         var selectedNode = $scope.selectedNode;
         if (selectedNode) {
            var container = selectedNode["brokerContainer"] || selectedNode;
            var brokerName = selectedNode["brokerName"];
            var destinationType = selectedNode["destinationType"] || selectedNode["typeLabel"];
            var destinationName = selectedNode["destinationName"];
            var postfix = null;
            if (brokerName && destinationType && destinationName) {
               postfix = "nid=root-" + artemisJmxDomain + "-Broker-" + brokerName + "-" + destinationType + "-" + destinationName;
            }
            connectToBroker(container, brokerName, postfix);
         }
      };
      $scope.$on('$destroy', function (event) {
         stopOldJolokia();
      });
      function stopOldJolokia() {
         var oldJolokia = $scope.selectedNodeJolokia;
         if (oldJolokia && oldJolokia !== jolokia) {
            oldJolokia.stop();
         }
      }

      $scope.$watch("selectedNode", function (newValue, oldValue) {
         // lets cancel any previously registered thingy
         if ($scope.unregisterFn) {
            $scope.unregisterFn();
            $scope.unregisterFn = null;
         }
         var node = $scope.selectedNode;
         if (node) {
            var mbean = node.objectName;
            var brokerContainer = node.brokerContainer || {};
            var nodeJolokia = node.jolokia || brokerContainer.jolokia || jolokia;
            if (nodeJolokia !== $scope.selectedNodeJolokia) {
               stopOldJolokia();
               $scope.selectedNodeJolokia = nodeJolokia;
               if (nodeJolokia !== jolokia) {
                  var rate = Core.parseIntValue(localStorage['updateRate'] || "2000", "update rate");
                  if (rate) {
                     nodeJolokia.start(rate);
                  }
               }
            }
            var dummyResponse = {value: node.panelProperties || {}};
            if (mbean && nodeJolokia) {
               ARTEMIS.log.debug("reading ", mbean, " on remote container");
               $scope.unregisterFn = Core.register(nodeJolokia, $scope, {
                  type: 'read',
                  mbean: mbean
               }, Core.onSuccess(renderNodeAttributes, {
                  error: function (response) {
                     // probably we've got a wrong mbean name?
                     // so lets render at least
                     renderNodeAttributes(dummyResponse);
                     Core.defaultJolokiaErrorHandler(response);
                  }
               }));
            }
            else {
               ARTEMIS.log.debug("no mbean or jolokia available, using dummy response");
               renderNodeAttributes(dummyResponse);
            }
         }
      });
      function getDestinationTypeName(attributes) {
         var prefix = attributes["DestinationTemporary"] ? "Temporary " : "";
         return prefix + (attributes["DestinationTopic"] ? "Topic" : "Queue");
      }

      var ignoreNodeAttributes = ["Broker", "BrokerId", "BrokerName", "Connection", "DestinationName", "DestinationQueue", "DestinationTemporary", "DestinationTopic",];
      var ignoreNodeAttributesByType = {
         producer: ["Producer", "ProducerId"],
         queue: ["Name", "MessageGroups", "MessageGroupType", "Subscriptions"],
         topic: ["Name", "Subscriptions"],
         broker: ["DataDirectory", "DurableTopicSubscriptions", "DynamicDestinationProducers", "InactiveDurableToppicSubscribers"]
      };
      var brokerShowProperties = ["Version", "Started"];
      var onlyShowAttributesByType = {
         broker: brokerShowProperties,
         brokerSlave: brokerShowProperties
      };

      function renderNodeAttributes(response) {
         var properties = [];
         if (response) {
            var value = response.value || {};
            $scope.selectedNodeAttributes = value;
            var selectedNode = $scope.selectedNode || {};
            var brokerContainer = selectedNode['brokerContainer'] || {};
            var nodeType = selectedNode["type"];
            var brokerName = selectedNode["brokerName"];
            var containerId = selectedNode["container"] || brokerContainer["container"];
            var group = selectedNode["group"] || brokerContainer["group"];
            var jolokiaUrl = selectedNode["jolokiaUrl"] || brokerContainer["jolokiaUrl"];
            var profile = selectedNode["profile"] || brokerContainer["profile"];
            var version = selectedNode["version"] || brokerContainer["version"];
            var isBroker = nodeType && nodeType.startsWith("broker");
            var ignoreKeys = ignoreNodeAttributes.concat(ignoreNodeAttributesByType[nodeType] || []);
            var onlyShowKeys = onlyShowAttributesByType[nodeType];
            angular.forEach(value, function (v, k) {
               if (onlyShowKeys ? onlyShowKeys.indexOf(k) >= 0 : ignoreKeys.indexOf(k) < 0) {
                  var formattedValue = Core.humanizeValueHtml(v);
                  properties.push({key: Core.humanizeValue(k), value: formattedValue});
               }
            });
            // TODO: Reenable sortBy
            //properties = properties.sortBy("key");
            var brokerProperty = null;
            if (brokerName) {
               var brokerHtml = '<a target="broker" ng-click="connectToBroker()">' + '<img title="Apache Artemis" src="img/icons/messagebroker.svg"> ' + brokerName + '</a>';
//               if (version && profile) {
//                  var brokerLink = Fabric.brokerConfigLink(workspace, jolokia, localStorage, version, profile, brokerName);
//                  if (brokerLink) {
//                     brokerHtml += ' <a title="configuration settings" target="brokerConfig" href="' + brokerLink + '"><i class="icon-tasks"></i></a>';
//                  }
//               }
               var html = $compile(brokerHtml)($scope);
               brokerProperty = {key: "Broker", value: html};
               if (!isBroker) {
                  properties.splice(0, 0, brokerProperty);
               }
            }
            if (containerId) {
               //var containerModel = "selectedNode" + (selectedNode['brokerContainer'] ? ".brokerContainer" : "");
               properties.splice(0, 0, {
                  key: "Container",
                  value: $compile('<div fabric-container-link="' + selectedNode['container'] + '"></div>')($scope)
               });
            }
            var destinationName = value["DestinationName"] || selectedNode["destinationName"];
            if (destinationName && (nodeType !== "queue" && nodeType !== "topic")) {
               var destinationTypeName = getDestinationTypeName(value);
               var html = createDestinationLink(destinationName, destinationTypeName);
               properties.splice(0, 0, {key: destinationTypeName, value: html});
            }
            var typeLabel = selectedNode["typeLabel"];
            var name = selectedNode["name"] || selectedNode["id"] || selectedNode['objectName'];
            if (typeLabel) {
               var html = name;
               if (nodeType === "queue" || nodeType === "topic") {
                  html = createDestinationLink(name, nodeType);
               }
               var typeProperty = {key: typeLabel, value: html};
               if (isBroker && brokerProperty) {
                  typeProperty = brokerProperty;
               }
               properties.splice(0, 0, typeProperty);
            }
         }
         $scope.selectedNodeProperties = properties;
         Core.$apply($scope);
      }

      /**
       * Generates the HTML for a link to the destination
       */
      function createDestinationLink(destinationName, destinationType) {
         if (destinationType === void 0) {
            destinationType = "queue";
         }
         return $compile('<a target="destination" title="' + destinationName + '" ng-click="connectToDestination()">' + destinationName + '</a>')($scope);
      }

      $scope.$watch("searchFilter", function (newValue, oldValue) {
         redrawGraph();
      });
      // lets just use the current stuff from the workspace
      $scope.$watch('workspace.tree', function () {
         redrawGraph();
      });
      $scope.$on('jmxTreeUpdated', function () {
         redrawGraph();
      });

      function onBrokerData(response) {
         if (response) {
            var responseJson = angular.toJson(response.value);
            if ($scope.responseJson === responseJson) {
               return;
            }
            $scope.responseJson = responseJson;
            $scope.brokers = response.value;
            doRedrawGraph();
         }
      }

      function redrawLocalBroker() {
         var container = {
            jolokia: jolokia
         };
         var containerId = "local";
         $scope.activeContainers = {
            containerId: container
         };
         var brokers = [];
         jolokia.search(artemisJmxDomain + ":broker=*", Core.onSuccess(function (response) {
            angular.forEach(response, function (objectName) {
               var atts = ARTEMISService.artemisConsole.getServerAttributes(jolokia, objectName);
               var val = atts.value;
               var details = Core.parseMBean(objectName);
               if (details) {
                  var properties = details['attributes'];
                  ARTEMIS.log.info("Got broker: " + objectName + " on container: " + containerId + " properties: " + angular.toJson(properties, true));
                  if (properties) {
                     var master = true;
                     var brokerId = properties["broker"] || "unknown";
                     var nodeId = val["NodeID"];
                     var theBroker = {
                        brokerId: brokerId,
                        nodeId: nodeId
                     };
                     brokers.push(theBroker);
                     if ($scope.viewSettings.broker) {
                        var broker = getOrAddBroker(master, brokerId, nodeId, containerId, container, properties);
                     }
                  }
               }
            });

            redrawActiveContainers(brokers);
         }));
      }

      function redrawActiveContainers(brokers) {
         // TODO delete any nodes from dead containers in containersToDelete
         angular.forEach($scope.activeContainers, function (container, id) {
            var containerJolokia = container.jolokia;
            if (containerJolokia) {
               onContainerJolokia(containerJolokia, container, id, brokers);
            }
//            else {
//               Fabric.containerJolokia(jolokia, id, function (containerJolokia) {
//                  return onContainerJolokia(containerJolokia, container, id, brokers);
//               });
//            }
         });
         $scope.graph = graphBuilder.buildGraph();
         Core.$apply($scope);
      }

      function doRedrawGraph() {
         graphBuilder = new ForceGraph.GraphBuilder();
         redrawLocalBroker();
      }

      function brokerNameMarkup(brokerName) {
         return brokerName ? "<p></p>broker: " + brokerName + "</p>" : "";
      }

      function onContainerJolokia(containerJolokia, container, id, brokers) {
         function createQueues(brokers) {
            if ($scope.viewSettings.queue) {
               containerJolokia.search(artemisJmxDomain + ":*,subcomponent=queues", Core.onSuccess(function (response) {
                  angular.forEach(response, function (objectName) {
                     var details = Core.parseMBean(objectName);
                     if (details) {
                        var properties = details['attributes'];
                        if (properties) {
                           configureDestinationProperties(properties);
                           var brokerName = properties.broker;
                           var addressName = properties.address;
                           var typeName = "queue";
                           var queueName = properties.queue;
                           var routingType = properties["routing-type"];
                           var destination = getOrAddQueue(properties, typeName, routingType, queueName, addressName, brokerName);
                        }
                     }
                  });
                  graphModelUpdated();
                  createConsumersAndNetwork(brokers);
               }));
            } else {
               createConsumersAndNetwork(brokers);
            }
         }

         function createAddresses(brokers) {
            if ($scope.viewSettings.address) {
               containerJolokia.search(artemisJmxDomain + ":*,component=addresses", Core.onSuccess(function (response) {
                  angular.forEach(response, function (objectName) {
                     var details = Core.parseMBean(objectName);
                     if (details) {
                        var properties = details['attributes'];
                        if (properties) {
                           var brokerName = properties.broker;
                           var typeName = "address";
                           var addressName = properties.address;
                           var destination = getOrAddAddress(properties, typeName, addressName, brokerName);
                        }
                     }
                  });
                  createQueues(brokers);
                  graphModelUpdated();
               }));
            } else {
               createQueues(brokers);
            }
         }

         function createConsumersAndNetwork(brokers) {
            angular.forEach(brokers, function (broker) {
               mBean = artemisJmxDomain + ":broker=" + broker.brokerId;
               // find consumers
               if ($scope.viewSettings.consumer) {
                  ARTEMISService.artemisConsole.getConsumers(mBean, containerJolokia, Core.onSuccess(function (properties) {
                     consumers = properties.value;
                     ARTEMIS.log.info(consumers);
                     angular.forEach(angular.fromJson(consumers), function (consumer) {
                        if (consumer) {

                           configureDestinationProperties(consumer);
                           var consumerId = consumer.sessionID + "-" + consumer.consumerID;
                           if (consumerId) {
                              var queueName = consumer.queueName;
                              var consumerNode = getOrAddNode("consumer", consumerId, consumer, function () {
                                 return {
                                    typeLabel: "Consumer",
                                    brokerContainer: container,
                                    //objectName: "null",
                                    jolokia: containerJolokia,
                                    popup: {
                                       title: "Consumer: " + consumerId,
                                       content: "<p>client: " + (consumer.connectionID || "") + "</p> " + brokerNameMarkup(broker.brokerId)
                                    }
                                 };
                              });
                              addLinkIds("queue:\"" + queueName + "\"", consumerNode["id"], "consumer");
                           }
                        }
                     });
                     graphModelUpdated();
                  }));
               }


               // find networks of brokers
               if ($scope.viewSettings.network && $scope.viewSettings.broker) {

                  ARTEMISService.artemisConsole.getRemoteBrokers(mBean, containerJolokia, Core.onSuccess(function (properties) {
                     remoteBrokers = properties.value;

                     ARTEMIS.log.info("remoteBrokers=" + angular.toJson(remoteBrokers))
                     angular.forEach(angular.fromJson(remoteBrokers), function (remoteBroker) {
                        if (remoteBroker) {
                           ARTEMIS.log.info("remote=" + angular.toJson(remoteBroker))
                           if (broker.nodeId != remoteBroker.nodeID) {
                              getOrAddBroker(true, "\"" + remoteBroker.live + "\"", remoteBroker.nodeID, "remote", null, properties);
                              addLinkIds("broker:" + broker.brokerId, "broker:" + "\"" + remoteBroker.live + "\"", "network");

                              var backup = remoteBroker.backup;
                              if (backup) {
                                 getOrAddBroker(false, "\"" + backup + "\"", remoteBroker.nodeID, "remote", null, properties);
                                 addLinkIds("broker:" + "\"" + remoteBroker.live + "\"", "broker:" + "\"" + backup + "\"", "network");
                              }
                           }
                           else {
                              var backup = remoteBroker.backup;
                              if (backup) {
                                 getOrAddBroker(false, "\"" + remoteBroker.backup + "\"", remoteBroker.nodeID, "remote", null, properties);
                                 addLinkIds("broker:" + broker.brokerId, "broker:" + "\"" + remoteBroker.backup + "\"", "network");
                              }
                           }
                        }
                     });
                     graphModelUpdated();
                  }));
               }
            });
         }

         if (containerJolokia) {
            container.jolokia = containerJolokia;
            function getOrAddQueue(properties, typeName, routingType, queueName, addressName, brokerName) {
               var queue = getOrAddNode(typeName.toLowerCase(), queueName, properties, function () {
                  var objectName = "";
                  if (addressName) {
                     objectName = artemisJmxDomain + ":broker=" + brokerName + ",component=addresses,address=" + addressName + ",subcomponent=queues,routing-type=" + routingType + ",queue=" + queueName;
                     
                  }
                  ARTEMIS.log.info(objectName);
                  var answer = {
                     typeLabel: typeName,
                     brokerContainer: container,
                     objectName: objectName,
                     jolokia: containerJolokia,
                     popup: {
                        title: "queue: " + queueName,
                        content: "address:" + addressName
                     }
                  };
                  if (!addressName) {
                     containerJolokia.search(artemisJmxDomain + ":broker=" + brokerName + ",component=addresses,address=" + addressName + ",subcomponent=queues,routing-type=" + routingType + ",queue=" + queueName + ",*", Core.onSuccess(function (response) {
                        if (response && response.length) {
                           answer.objectName = response[0];
                        }
                     }));
                  }
                  return answer;
               });
               if (queue && $scope.viewSettings.broker && addressName) {
                  addLinkIds("address:" + addressName, queue["id"], "queue");
               }
               return queue;
            }

            function getOrAddAddress(properties, typeName, destinationName, brokerName) {
               var destination = getOrAddNode(typeName.toLowerCase(), destinationName, properties, function () {
                  var objectName = "";
                  if (brokerName) {
                     objectName = artemisJmxDomain + ":broker=" + brokerName + ",component=addresses,address=" + destinationName;
                  }
                  var answer = {
                     typeLabel: typeName,
                     brokerContainer: container,
                     objectName: objectName,
                     jolokia: containerJolokia,
                     popup: {
                        title: typeName + ": " + destinationName,
                        content: brokerNameMarkup(brokerName)
                     }
                  };
                  if (!brokerName) {
                     containerJolokia.search(artemisJmxDomain + ":broker=" + brokerName + ",component=addresses,address=" + destinationName + ",*", Core.onSuccess(function (response) {
                        if (response && response.length) {
                           answer.objectName = response[0];
                        }
                     }));
                  }
                  return answer;
               });
               if (destination && $scope.viewSettings.broker && brokerName) {
                  addLinkIds(brokerNodeId(brokerName), destination["id"], "address");
               }
               return destination;
            }

            createAddresses(brokers);
         }
      }

      function graphModelUpdated() {
         $scope.graph = graphBuilder.buildGraph();
         Core.$apply($scope);
      }

      function getOrAddBroker(master, brokerId, nodeId, containerId, container, brokerStatus) {
         var broker = null;
         var brokerFlag = master ? $scope.viewSettings.broker : $scope.viewSettings.slave;
         if (brokerFlag) {
            broker = getOrAddNode("broker", brokerId, brokerStatus, function () {
               return {
                  type: master ? "broker" : "brokerSlave",
                  typeLabel: master ? "Broker" : "Slave Broker",
                  popup: {
                     title: (master ? "Master" : "Slave") + " Broker: " + brokerId,
                     content: "<p>Container: " + containerId + "</p> Node ID: " + nodeId
                  }
               };
            });
            if (!broker['objectName']) {
               // lets try guess the mbean name
               broker['objectName'] = artemisJmxDomain + ":broker=" + brokerId;
               ARTEMIS.log.debug("Guessed broker mbean: " + broker['objectName']);
            }
            if (!broker['brokerContainer'] && container) {
               broker['brokerContainer'] = container;
            }
            if (!broker['nodeID']) {
               broker['nodeID'] = nodeId;
            }
         }
         return broker;
      }

      function getOrAddNode(typeName, id, properties, createFn) {
         var node = null;
         if (id) {
            var nodeId = typeName + ":" + id;
            node = graphBuilder.getNode(nodeId);
            if (!node) {
               var nodeValues = createFn();
               node = angular.copy(properties);

               angular.forEach(nodeValues, function (value, key) {
                  return node[key] = value;
               });
               node['id'] = nodeId;
               if (!node['type']) {
                  node['type'] = typeName;
               }
               if (!node['name']) {
                  node['name'] = id;
               }
               if (node) {
                  var size = $scope.shapeSize[typeName];
                  if (size && !node['size']) {
                     node['size'] = size;
                  }
                  if (!node['summary']) {
                     node['summary'] = node['popup'] || "";
                  }
                  if (!$scope.viewSettings.popup) {
                     delete node['popup'];
                  }
                  if (!$scope.viewSettings.label) {
                     delete node['name'];
                  }
                  // lets not add nodes which are defined as being disabled
                  var enabled = $scope.viewSettings[typeName];
                  if (enabled || !angular.isDefined(enabled)) {
                     graphBuilder.addNode(node);
                  }
                  else {
                  }
               }
            }
         }
         return node;
      }

      function addLink(object1, object2, linkType) {
         if (object1 && object2) {
            addLinkIds(object1.id, object2.id, linkType);
         }
      }

      function addLinkIds(id1, id2, linkType) {
         ARTEMIS.log.info("adding " + id1 + " to " + id2 + " " + linkType)
         if (id1 && id2) {
            graphBuilder.addLink(id1, id2, linkType);
         }
      }

      function brokerNodeId(brokerId) {
         return brokerId ? "broker:" + brokerId : null;
      }

      /**
       * Avoid the JMX type property clashing with the ForceGraph type property; used for associating css classes with nodes on the graph
       *
       * @param properties
       */
      function renameTypeProperty(properties) {
         properties.mbeanType = properties['type'];
         delete properties['type'];
      }

      function configureDestinationProperties(properties) {
         renameTypeProperty(properties);
         var destinationType = properties.destinationType || "Queue";
         var typeName = destinationType.toLowerCase();
         properties.isQueue = !typeName.startsWith("t");
         properties['destType'] = typeName;
      }
   };

   return ARTEMIS;
} (ARTEMIS || {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.BrowseQueueController = function ($scope, workspace, ARTEMISService, jolokia, localStorage, artemisMessage, $location, $timeout) {
    $scope.pagingOptions = {
          pageSizes: [50, 100, 200],
          pageSize: 100,
          currentPage: 1
       };
       $scope.totalServerItems = 0;
       $scope.searchText = '';
       $scope.allMessages = [];
       $scope.messages = [];
       $scope.headers = {};
       $scope.mode = 'text';
       $scope.deleteDialog = false;
       $scope.moveDialog = false;
       $scope.gridOptions = {
          $gridScope: {
              allSelected: false
          },
          pagingOptions: $scope.pagingOptions,
          enablePaging: true,
          totalServerItems: 'totalServerItems',
          showFooter: true,
          selectedItems: [],
          data: 'messages',
          displayFooter: false,
          showFilter: false,
          showColumnMenu: true,
          enableColumnResize: true,
          enableColumnReordering: true,
          enableHighlighting: true,
          filterOptions: {
             filterText: '',
             useExternalFilter: true
          },
          selectWithCheckboxOnly: true,
          showSelectionCheckbox: true,
          maintainColumnRatios: false,
          columnDefs: [
             {
                field: 'messageID',
                displayName: 'Message ID',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.openMessageDialog(row)">{{row.entity.messageID}}</a></div>',
                // for ng-grid
                width: '10%'
             },
             {
                field: 'userID',
                displayName: 'User ID',
                width: '10%'
             },
             {
                field: 'type',
                displayName: 'Type',
                width: '10%'
             },
             {
                field: 'durable',
                displayName: 'Durable',
                width: '10%'
             },
             {
                field: 'priority',
                displayName: 'Priority',
                width: '7%'
             },
             {
                field: 'timestamp',
                displayName: 'Timestamp',
                width: '19%'
             },
             {
                field: 'expiration',
                displayName: 'Expires',
                width: '10%'
             },
              {
                 field: 'redelivered',
                 displayName: 'Redelivered',
                 width: '10%'
              }
          ],
          primaryKeyFn: function (entity) { return entity.messageID; },
          afterSelectionChange: afterSelectionChange
       };
       $scope.showMessageDetails = false;
       // openMessageDialog is for the dialog itself so we should skip that guy
       var ignoreColumns = ["PropertiesText", "BodyPreview", "text", "openMessageDialog"];
       var flattenColumns = ["BooleanProperties", "ByteProperties", "ShortProperties", "IntProperties", "LongProperties", "FloatProperties", "DoubleProperties", "StringProperties"];
       $scope.$watch('workspace.selection', function () {
          if (workspace.moveIfViewInvalid()) {
             return;
          }
          // lets defer execution as we may not have the selection just yet
          setTimeout(loadTable, 50);
       });
       $scope.$watch('gridOptions.filterOptions.filterText', function (filterText) {
          filterMessages(filterText);
       });
       $scope.$watch('pagingOptions', function (newVal, oldVal) {
          if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
             loadTable();
          }
          if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
             $scope.pagingOptions.currentPage = 1;
             loadTable();
          }
       }, true);
       $scope.openMessageDialog = function (message) {
          ARTEMIS.selectCurrentMessage(message, "messageID", $scope);
          if ($scope.row) {
             $scope.mode = CodeEditor.detectTextFormat($scope.row.Text);
             $scope.showMessageDetails = true;
          }
       };
       $scope.refresh = loadTable;
       ARTEMIS.decorate($scope);
       $scope.moveMessages = function () {
          var selection = workspace.selection;
          var mbean = selection.objectName;
          if (mbean && selection) {
             var selectedItems = $scope.gridOptions.selectedItems;
             $scope.message = "Moved " + Core.maybePlural(selectedItems.length, "message" + " to " + $scope.queueName);
             angular.forEach(selectedItems, function (item, idx) {
                var id = item.messageID;
                if (id) {
                   var callback = (idx + 1 < selectedItems.length) ? intermediateResult : moveSuccess;
                   ARTEMISService.artemisConsole.moveMessage(mbean, jolokia, id, $scope.queueName, Core.onSuccess(callback));
                }
             });
          }
       };
       $scope.resendMessage = function () {
          var selection = workspace.selection;
          var mbean = selection.objectName;
          if (mbean && selection) {
             var selectedItems = $scope.gridOptions.selectedItems;
             //always assume a single message
             artemisMessage.message = selectedItems[0];
             $location.path('artemis/sendMessage');
          }
       };
       $scope.deleteMessages = function () {
          var selection = workspace.selection;
          var mbean = selection.objectName;
          if (mbean && selection) {
             var selectedItems = $scope.gridOptions.selectedItems;
             $scope.message = "Deleted " + Core.maybePlural(selectedItems.length, "message");
             angular.forEach(selectedItems, function (item, idx) {
                var id = item.messageID;
                if (id) {
                   var callback = (idx + 1 < selectedItems.length) ? intermediateResult : operationSuccess;
                   ARTEMISService.artemisConsole.deleteMessage(mbean, jolokia, id, Core.onSuccess(callback));
                }
             });
          }
       };
       $scope.retryMessages = function () {
          var selection = workspace.selection;
          var mbean = selection.objectName;
          if (mbean && selection) {
             var selectedItems = $scope.gridOptions.selectedItems;
             $scope.message = "Retry " + Core.maybePlural(selectedItems.length, "message");
             var operation = "retryMessage(java.lang.String)";
             angular.forEach(selectedItems, function (item, idx) {
                var id = item.messageID;
                if (id) {
                   var callback = (idx + 1 < selectedItems.length) ? intermediateResult : operationSuccess;
                   jolokia.execute(mbean, operation, id, Core.onSuccess(callback));
                   ARTEMISService.artemisConsole.retryMessage(mbean, jolokia, id, Core.onSuccess(callback));
                }
             });
          }
       };
       $scope.queueNames = function (completionText) {
          var queuesFolder = ARTEMIS.getSelectionQueuesFolder(workspace);
          if (queuesFolder) {
             var selectedQueue = workspace.selection.key;
             var otherQueues = queuesFolder.children.exclude(function (child) {
                return child.key == selectedQueue;
             });
             return (otherQueues) ? otherQueues.map(function (n) {
                return n.title;
             }) : [];
          }
          else {
             return [];
          }
       };
       function populateTable(response) {
          var data = response.value;
          ARTEMIS.log.info("loading data:" + data);

          if (!angular.isArray(data)) {
             $scope.allMessages = [];
             angular.forEach(data, function (value, idx) {
                $scope.allMessages.push(value);
             });
          }
          else {
             $scope.allMessages = data;
          }
          angular.forEach($scope.allMessages, function (message) {
             message.openMessageDialog = $scope.openMessageDialog;
             message.headerHtml = createHeaderHtml(message);
             message.bodyText = createBodyText(message);
          });
          filterMessages($scope.gridOptions.filterOptions.filterText);
          Core.$apply($scope);
       }

       /*
        * For some reason using ng-repeat in the modal dialog doesn't work so lets
        * just create the HTML in code :)
        */
       function createBodyText(message) {

          ARTEMIS.log.info("loading message:" + message);
          if (message.text) {
             var body = message.text;
             var lenTxt = "" + body.length;
             message.textMode = "text (" + lenTxt + " chars)";
             return body;
          }
          else if (message.BodyPreview) {
             var code = Core.parseIntValue(localStorage["ARTEMISBrowseBytesMessages"] || "1", "browse bytes messages");
             var body;
             message.textMode = "bytes (turned off)";
             if (code != 99) {
                var bytesArr = [];
                var textArr = [];
                message.BodyPreview.forEach(function (b) {
                   if (code === 1 || code === 2) {
                      // text
                      textArr.push(String.fromCharCode(b));
                   }
                   if (code === 1 || code === 4) {
                      // hex and must be 2 digit so they space out evenly
                      var s = b.toString(16);
                      if (s.length === 1) {
                         s = "0" + s;
                      }
                      bytesArr.push(s);
                   }
                   else {
                      // just show as is without spacing out, as that is usually more used for hex than decimal
                      var s = b.toString(10);
                      bytesArr.push(s);
                   }
                });
                var bytesData = bytesArr.join(" ");
                var textData = textArr.join("");
                if (code === 1 || code === 2) {
                   // bytes and text
                   var len = message.BodyPreview.length;
                   var lenTxt = "" + textArr.length;
                   body = "bytes:\n" + bytesData + "\n\ntext:\n" + textData;
                   message.textMode = "bytes (" + len + " bytes) and text (" + lenTxt + " chars)";
                }
                else {
                   // bytes only
                   var len = message.BodyPreview.length;
                   body = bytesData;
                   message.textMode = "bytes (" + len + " bytes)";
                }
             }
             return body;
          }
          else {
             message.textMode = "unsupported";
             return "Unsupported message body type which cannot be displayed by hawtio";
          }
       }

       /*
        * For some reason using ng-repeat in the modal dialog doesn't work so lets
        * just create the HTML in code :)
        */
            function createHeaderHtml(message) {
                var headers = createHeaders(message);
                var properties = createProperties(message);
                var headerKeys = _.keys(headers);
                function sort(a, b) {
                    if (a > b)
                        return 1;
                    if (a < b)
                        return -1;
                    return 0;
                }
                var propertiesKeys = _.keys(properties).sort(sort);
                var jmsHeaders = _.filter(headerKeys, function (key) { return _.startsWith(key, "JMS"); }).sort(sort);
                var remaining = _.difference(headerKeys, jmsHeaders.concat(propertiesKeys)).sort(sort);
                var buffer = [];
                function appendHeader(key) {
                    var value = headers[key];
                    if (value === null) {
                        value = '';
                    }
                    buffer.push('<tr><td class="propertyName"><span class="green">Header</span> - ' +
                        key +
                        '</td><td class="property-value">' +
                        value +
                        '</td></tr>');
                }
                function appendProperty(key) {
                    var value = properties[key];
                    if (value === null) {
                        value = '';
                    }
                    buffer.push('<tr><td class="propertyName">' +
                        key +
                        '</td><td class="property-value">' +
                        value +
                        '</td></tr>');
                }
                jmsHeaders.forEach(appendHeader);
                remaining.forEach(appendHeader);
                propertiesKeys.forEach(appendProperty);
                return buffer.join("\n");
            }
            function createHeaders(row) {
                //log.debug("headers: ", row);
                var answer = {};
                angular.forEach(row, function (value, key) {
                    if (!_.some(ignoreColumns, function (k) { return k === key; }) && !_.some(flattenColumns, function (k) { return k === key; })) {
                        answer[_.escape(key)] = _.escape(value);
                    }
                });
                return answer;
            }
            function createProperties(row) {
                //log.debug("properties: ", row);
                var answer = {};
                angular.forEach(row, function (value, key) {
                    if (!_.some(ignoreColumns, function (k) { return k === key; }) && _.some(flattenColumns, function (k) { return k === key; })) {
                        angular.forEach(value, function (v2, k2) {
                            answer['<span class="green">' + key.replace('Properties', ' Property') + '</span> - ' + _.escape(k2)] = _.escape(v2);
                        });
                    }
                });
                return answer;
            }


       function loadTable() {
          ARTEMIS.log.info("loading table")
          var objName;
          $scope.gridOptions.selectedItems.length = 0;
          if (workspace.selection) {
             objName = workspace.selection.objectName;
          }
          else {
             // in case of refresh
             // TODO: Fix location.search()
             var key = $location.search()['nid'];
             var node = workspace.keyToNodeMap[key];
             objName = node.objectName;
          }
          if (objName) {
             $scope.dlq = false;
             var queueName = jolokia.getAttribute(objName, "Name");

             var artemisDLQ = localStorage['artemisDLQ'] || "DLQ";
             var artemisExpiryQueue = localStorage['artemisExpiryQueue'] || "ExpiryQueue";
             ARTEMIS.log.info("loading table" + artemisExpiryQueue);
             if (queueName == artemisDLQ || queueName == artemisExpiryQueue) {
                onDlq(true);
             }
             else {
                onDlq(false);
             }
             jolokia.request({ type: 'exec', mbean: objName, operation: 'countMessages()'}, Core.onSuccess(function(response) {$scope.totalServerItems = response.value;}));
             jolokia.request({ type: 'exec', mbean: objName, operation: 'browse(int, int)', arguments: [$scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable));
          }
       }

       function onDlq(response) {
          ARTEMIS.log.info("onDLQ=" + response);
          $scope.dlq = response;
          Core.$apply($scope);
       }

       function intermediateResult() {
       }

       function operationSuccess() {
          $scope.messageDialog = false;
          deselectAll();
          Core.notification("success", $scope.message);
          loadTable();
          setTimeout(loadTable, 50);
       }

       function moveSuccess() {
          operationSuccess();
          workspace.loadTree();
       }

       function filterMessages(filter) {
          var searchConditions = buildSearchConditions(filter);
          evalFilter(searchConditions);
       }

       function evalFilter(searchConditions) {
          if (!searchConditions || searchConditions.length === 0) {
             $scope.messages = $scope.allMessages;
          }
          else {
             ARTEMIS.log.debug("Filtering conditions:", searchConditions);
             $scope.messages = $scope.allMessages.filter(function (message) {
                ARTEMIS.log.debug("Message:", message);
                var matched = true;
                $.each(searchConditions, function (index, condition) {
                   if (!condition.column) {
                      matched = matched && evalMessage(message, condition.regex);
                   }
                   else {
                      matched = matched && (message[condition.column] && condition.regex.test(message[condition.column])) || (message.StringProperties && message.StringProperties[condition.column] && condition.regex.test(message.StringProperties[condition.column]));
                   }
                });
                return matched;
             });
          }
       }

       function evalMessage(message, regex) {
          var jmsHeaders = ['JMSDestination', 'JMSDeliveryMode', 'JMSExpiration', 'JMSPriority', 'JMSmessageID', 'JMSTimestamp', 'JMSCorrelationID', 'JMSReplyTo', 'JMSType', 'JMSRedelivered'];
          for (var i = 0; i < jmsHeaders.length; i++) {
             var header = jmsHeaders[i];
             if (message[header] && regex.test(message[header])) {
                return true;
             }
          }
          if (message.StringProperties) {
             for (var property in message.StringProperties) {
                if (regex.test(message.StringProperties[property])) {
                   return true;
                }
             }
          }
          if (message.bodyText && regex.test(message.bodyText)) {
             return true;
          }
          return false;
       }

       function getRegExp(str, modifiers) {
          try {
             return new RegExp(str, modifiers);
          }
          catch (err) {
             return new RegExp(str.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, '\\$1'));
          }
       }

       function buildSearchConditions(filterText) {
          var searchConditions = [];
          var qStr;
          if (!(qStr = $.trim(filterText))) {
             return;
          }
          var columnFilters = qStr.split(";");
          for (var i = 0; i < columnFilters.length; i++) {
             var args = columnFilters[i].split(':');
             if (args.length > 1) {
                var columnName = $.trim(args[0]);
                var columnValue = $.trim(args[1]);
                if (columnName && columnValue) {
                   searchConditions.push({
                      column: columnName,
                      columnDisplay: columnName.replace(/\s+/g, '').toLowerCase(),
                      regex: getRegExp(columnValue, 'i')
                   });
                }
             }
             else {
                var val = $.trim(args[0]);
                if (val) {
                   searchConditions.push({
                      column: '',
                      regex: getRegExp(val, 'i')
                   });
                }
             }
          }
          return searchConditions;
       }

       function afterSelectionChange(rowItem, checkAll) {
          if (checkAll === void 0) {
             // then row was clicked, not select-all checkbox
             $scope.gridOptions['$gridScope'].allSelected = rowItem.config.selectedItems.length == $scope.messages.length;
          }
          else {
             $scope.gridOptions['$gridScope'].allSelected = checkAll;
          }
       }

       function deselectAll() {
          $scope.gridOptions['$gridScope'].allSelected = false;
       }
    }

       return ARTEMIS;
   } (ARTEMIS || {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.ConnectionsController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisConnection, artemisSession) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        /**
         *  Required For Each Object Type
         */

        var objectType = "connection"
        var method = 'listConnections(java.lang.String, int, int)';
        var attributes = [
            {
                field: 'connectionID',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'clientID',
                displayName: 'Client ID',
                width: '*'
            },
            {
                field: 'users',
                displayName: 'Users',
                width: '*'
            },
            {
                field: 'protocol',
                displayName: 'Protocol',
                width: '*'
            },
            {
                field: 'sessionCount',
                displayName: 'Session Count',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectSessions(row)">{{row.entity.sessionCount}}</a></div>',
                sortable: false
            },
            {
                field: 'remoteAddress',
                displayName: 'Remote Address',
                width: '*'
            },
            {
                field: 'localAddress',
                displayName: 'Local Address',
                width: '*'
            },
            {
                field: 'creationTime',
                displayName: 'Creation Time',
                width: '*'
            }
        ];
        $scope.filter = {
            fieldOptions: [
                {id: 'CONNECTION_ID', name: 'Connection ID'},
                {id: 'CLIENT_ID', name: 'Client ID'},
                {id: 'USERS', name: 'Users'},
                {id: 'PROTOCOL', name: 'Protocol'},
                {id: 'SESSION_COUNT', name: 'Session Count'},
                {id: 'REMOTE_ADDRESS', name: 'Remote Address'},
                {id: 'LOCAL_ADDRESS', name: 'Local Address'},
                {id: 'SESSION_ID', name: 'Session ID'}
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'},
                {id: 'GREATER_THAN', name: 'Greater Than'},
                {id: 'LESS_THAN', name: 'Less Than'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "connectionID"
            }
        };

        // Configure Parent/Child click through relationships
        if (artemisSession.session) {
            $scope.filter.values.field = $scope.filter.fieldOptions[0].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisSession.session.connectionID;
            artemisSession.session = null;
        }

        $scope.selectSessions = function (connection) {
            artemisConnection.connection = connection.entity;
            $location.path("artemis/sessions");
        };
        $scope.closeConnection = function () {
            var connectionID = $scope.gridOptions.selectedItems[0].connectionID
           ARTEMIS.log.info("closing connection: " + connectionID);
           if (workspace.selection) {
              var mbean = getBrokerMBean(jolokia);
              if (mbean) {
                  jolokia.request({ type: 'exec',
                     mbean: mbean,
                     operation: 'closeConnectionWithID(java.lang.String)',
                     arguments: [connectionID] },
                     onSuccess($scope.loadTable(), { error: function (response) {
                        Core.defaultJolokiaErrorHandler("Could not close connection: " + response);
                     }}));
              }
           }
        };
        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */

        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
            fields: ["connectionID"],
            columns: ["connectionID"],
            directions: ["asc"]
        };
        var refreshed = false;
        $scope.showClose = false;
        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.connectionID; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };
        $scope.refresh = function () {
            refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        $scope.selectGridRow = function () {
            $scope.showClose =  $scope.gridOptions.selectedItems.length > 0;
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            $scope.gridOptions.selectedItems.length = 0;
            $scope.showClose = false;
            var data = JSON.parse(response.value);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (connection) {
              connection.selectSessions = $scope.selectSessions;
            })
            $scope.totalServerItems = data["count"];
            if (refreshed == true) {
                $scope.gridOptions.pagingOptions.currentPage = 1;
                refreshed = false;
            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    return ARTEMIS;
} (ARTEMIS || {}));

ARTEMIS.module.controller("ARTEMIS.ConnectionsController", ARTEMIS.ConnectionsController);
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.ConsumersController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisConnection, artemisSession, artemisConsumer, artemisQueue, artemisAddress) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        /**
         *  Required For Each Object Type
         */

        var objectType = "consumer";
        var method = 'listConsumers(java.lang.String, int, int)';
        var attributes = [
            {
                field: 'id',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'session',
                displayName: 'Session',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href = "" ng-click="row.entity.selectSession(row)">{{row.entity.session}}</a></div>'
            },
            {
                field: 'clientID',
                displayName: 'Client ID',
                width: '*'
            },
            {
                field: 'protocol',
                displayName: 'Protocol',
                width: '*'
            },
            {
                field: 'queue',
                displayName: 'Queue',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectQueue(row)">{{row.entity.queue}}</a></div>'
            },
            {
                field: 'queueType',
                displayName: 'Queue Type',
                width: '*'
            },
            {
                field: 'address',
                displayName: 'Address',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectAddress(row)">{{row.entity.address}}</a></div>'
            },
            {
                field: 'remoteAddress',
                displayName: 'Remote Address',
                width: '*'
            },
            {
                field: 'localAddress',
                displayName: 'Local Address',
                width: '*'
            },
            {
                field: 'creationTime',
                displayName: 'Creation Time',
                width: '*'
            }
        ];
        $scope.filter = {
            fieldOptions: [
                {id: 'ID', name: 'ID'},
                {id: 'SESSION_ID', name: 'Session ID'},
                {id: 'CLIENT_ID', name: 'Client ID'},
                {id: 'USER', name: 'User'},
                {id: 'ADDRESS', name: 'Address'},
                {id: 'QUEUE', name: 'Queue'},
                {id: 'PROTOCOL', name: 'Protocol'},
                {id: 'REMOTE_ADDRESS', name: 'Remote Address'},
                {id: 'LOCAL_ADDRESS', name: 'Local Address'}
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "id"
            }
        };

        $scope.selectSession = function (row) {
            artemisConsumer.consumer = row.entity;
            $location.path("artemis/sessions");
        };

        $scope.selectQueue = function (row) {
           artemisQueue.queue = row.entity;
           $location.path("artemis/queues");
        };

        $scope.selectAddress = function (row) {
           artemisAddress.address = row.entity;
           $location.path("artemis/addresses");
        };

        // Configure Parent/Child click through relationships
        if (artemisSession.session) {
            $scope.filter.values.field = $scope.filter.fieldOptions[1].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisSession.session.id;
            artemisSession.session = null;
        }

        artemisSession.session = null;

       $scope.closeConsumer = function () {
          var consumerID = $scope.gridOptions.selectedItems[0].id;
          var sessionID = $scope.gridOptions.selectedItems[0].session;
          ARTEMIS.log.info("closing session: " + sessionID);
          if (workspace.selection) {
             var mbean = getBrokerMBean(jolokia);
             if (mbean) {
                jolokia.request({ type: 'exec',
                   mbean: mbean,
                   operation: 'closeConsumerWithID(java.lang.String, java.lang.String)',
                   arguments: [sessionID, consumerID] },
                   Core.onSuccess($scope.loadTable(), { error: function (response) {
                      Core.defaultJolokiaErrorHandler("Could not close consumer: " + response);
                   }}));
            }
         }
       };
        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */

        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
            fields: ["id"],
            columns: ["id"],
            directions: ["asc"]
        };
        var refreshed = false;
        $scope.showClose = false;
        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.id; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };
        $scope.refresh = function () {
            refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        $scope.selectGridRow = function () {
            $scope.showClose =  $scope.gridOptions.selectedItems.length > 0;
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            $scope.gridOptions.selectedItems.length = 0;
            $scope.showClose = false;
            var data = JSON.parse(response.value);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (consumer) {
              consumer.selectSession = $scope.selectSession;
              consumer.selectQueue = $scope.selectQueue;
              consumer.selectAddress = $scope.selectAddress
            })
            $scope.totalServerItems = data["count"];
            if (refreshed == true) {
                $scope.gridOptions.pagingOptions.currentPage = 1;
                refreshed = false;
            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    return ARTEMIS;
} (ARTEMIS || {}));

ARTEMIS.module.controller("ARTEMIS.ConsumersController", ARTEMIS.ConsumersController);
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.ProducersController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisAddress, artemisSession, artemisProducer) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        /**
         *  Required For Each Object Type
         */

        var objectType = "producer";
        var method = 'listProducers(java.lang.String, int, int)';
        var attributes = [
            {
                field: 'id',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'session',
                displayName: 'Session',
                width: '*',
                sortable: false,
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectSession(row)">{{row.entity.session}}</a></div>'
            },
            {
                field: 'clientID',
                displayName: 'Client ID',
                sortable: false,
                width: '*'
            },
            {
                field: 'protocol',
                displayName: 'Protocol',
                width: '*',
                sortable: false
            },
            {
                field: 'user',
                displayName: 'User',
                width: '*',
                sortable: false
            },
            {
                field: 'address',
                displayName: 'Address',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectAddress(row)">{{row.entity.address}}</a></div>'
            },
            {
                field: 'remoteAddress',
                displayName: 'Remote Address',
                width: '*',
                sortable: false
            },
            {
                field: 'localAddress',
                displayName: 'Local Address',
                width: '*',
                sortable: false
            }
        ];
        $scope.filter = {
            fieldOptions: [
                {id: 'ID', name: 'ID'},
                {id: 'SESSION_ID', name: 'Session ID'},
                {id: 'CLIENT_ID', name: 'Client ID'},
                {id: 'USER', name: 'User'},
                {id: 'ADDRESS', name: 'Address'},
                {id: 'PROTOCOL', name: 'Protocol'},
                {id: 'REMOTE_ADDRESS', name: 'Remote Address'},
                {id: 'LOCAL_ADDRESS', name: 'Local Address'}
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "id"
            }
        };

        $scope.selectAddress = function (row) {
           artemisAddress.address = row.entity;
           $location.path("artemis/addresses");
        };

        $scope.selectSession = function (row) {
            artemisProducer.producer = row.entity;
            $location.path("artemis/sessions");
        };

        // Configure Parent/Child click through relationships
        if (artemisSession.session) {
            $scope.filter.values.field = $scope.filter.fieldOptions[1].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisSession.session.id;
            artemisSession.session = null;
        }

        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */

        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
            fields: ["id"],
            columns: ["id"],
            directions: ["asc"]
        };
        var refreshed = false;

        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.id; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };
        $scope.refresh = function () {
            refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            var data = JSON.parse(response.value);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (producer) {
              producer.selectSession = $scope.selectSession;
              producer.selectAddress = $scope.selectAddress;
            })
            $scope.totalServerItems = data["count"];
            if (refreshed == true) {
                $scope.gridOptions.pagingOptions.currentPage = 1;
                refreshed = false;
            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    return ARTEMIS;
} (ARTEMIS || {}));

ARTEMIS.module.controller("ARTEMIS.ProducersController", ARTEMIS.ProducersController);


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
 */
var ARTEMIS = (function(ARTEMIS) {

    /**
     * @method QueueController
     * @param $scope
     * @param ARTEMISService
     *
     * Controller for the Create interface
     */
    ARTEMIS.QueueController = function ($scope, workspace, ARTEMISService, jolokia, localStorage) {
        Core.initPreferenceScope($scope, localStorage, {
            'durable': {
                'value': true,
                'converter': Core.parseBooleanValue
            },
            'routingType': {
                'value': 0,
                'converter': parseInt,
                'formatter': parseInt
            },
            'maxConsumers': {
                'value': -1,
                'converter': parseInt,
                'formatter': parseInt
            },
            'purgeWhenNoConsumers': {
                'value': false,
                'converter': Core.parseBooleanValue
            }
        });
        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";
        $scope.workspace = workspace;
        $scope.message = "";
        $scope.queueType = 'true';
        $scope.deleteDialog = false;
        $scope.purgeDialog = false;
        $scope.$watch('workspace.selection', function () {
            workspace.moveIfViewInvalid();
        });
        function operationSuccess() {
            $scope.queueName = "";
            $scope.workspace.operationCounter += 1;
            Core.$apply($scope);
            Core.notification("success", $scope.message);
            $scope.workspace.loadTree();
        }
        function deleteSuccess() {
            // lets set the selection to the parent
            workspace.removeAndSelectParentNode();
            $scope.workspace.operationCounter += 1;
            Core.$apply($scope);
            Core.notification("success", $scope.message);
            $scope.workspace.loadTree();
        }
        $scope.createQueue = function (queueName, routingType, durable, filter, maxConsumers, purgeWhenNoConsumers) {
            var mbean = getBrokerMBean(jolokia);
            if (mbean) {
                var selection = workspace.selection;
                var entries = selection.entries;
                var address = entries["address"];
                if (address.charAt(0) === '"' && address.charAt(address.length -1) === '"')
                {
                    address = address.substr(1,address.length -2);
                }
                $scope.message = "Created queue " + queueName + " durable=" + durable + " filter=" + filter + " on address " + address;
                if (routingType == 0) {
                    ARTEMIS.log.info($scope.message);
                    ARTEMISService.artemisConsole.createQueue(mbean, jolokia, address, "MULTICAST", queueName, durable, filter, maxConsumers, purgeWhenNoConsumers, Core.onSuccess(operationSuccess));
                    ARTEMIS.log.info("executed");
                } else {
                   ARTEMIS.log.info($scope.message);
                   ARTEMISService.artemisConsole.createQueue(mbean, jolokia, address, "ANYCAST", queueName, durable, filter, maxConsumers, purgeWhenNoConsumers, Core.onSuccess(operationSuccess));
                   ARTEMIS.log.info("executed");
                }
            }
        };
        $scope.deleteDestination = function (isQueue) {
            var selection = workspace.selection;
            var entries = selection.entries;
            var mbean = getBrokerMBean(jolokia);
            ARTEMIS.log.info(mbean);
            if (mbean) {
                if (selection && jolokia && entries) {
                    var domain = selection.domain;
                    var name = entries["Destination"] || entries["destinationName"] || selection.title;
                    name = name.replace(/['"]+/g, '');
                    name = ARTEMISService.artemisConsole.ownUnescape(name);
                    ARTEMIS.log.info(name);
                    var operation;
                    if (isQueue) {
                        $scope.message = "Deleted queue " + name;
                        ARTEMISService.artemisConsole.deleteQueue(mbean, jolokia, name, Core.onSuccess(deleteSuccess));
                    }
                    else {
                        $scope.message = "Deleted topic " + name;
                        ARTEMISService.artemisConsole.deleteTopic(mbean, jolokia, name, Core.onSuccess(deleteSuccess));
                    }
                }
            }
        };
        $scope.purgeDestination = function () {
            var selection = workspace.selection;
            var entries = selection.entries;
            var mbean = selection.objectName;
            if (mbean) {
                if (selection && jolokia && entries) {
                    var name = entries["Destination"] || entries["destinationName"] || selection.title;
                    name = name.replace(/['"]+/g, '');
                    name = ARTEMISService.artemisConsole.ownUnescape(name);
                    ARTEMIS.log.info(name);
                    var operation = "purge()";
                    $scope.message = "Purged queue " + name;
                    ARTEMISService.artemisConsole.purgeQueue(mbean, jolokia, Core.onSuccess(deleteSuccess));
                }
            }
        };
        $scope.name = function () {
            var selection = workspace.selection;
            if (selection) {
                return ARTEMISService.artemisConsole.ownUnescape(selection.title);
            }
            return null;
        };

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        }
    };

    return ARTEMIS;
} (ARTEMIS || {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.QueuesController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisConnection, artemisSession, artemisQueue) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        /**
         *  Required For Each Object Type
         */

        var objectType = "queue";
        var method = 'listQueues(java.lang.String, int, int)';
        var attributes = [
            {
                field: 'manage',
                displayName: 'manage',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.navigateToQueueAtts(row)">attributes</a>&nbsp;<a href="" ng-click="row.entity.navigateToQueueOps(row)">operations</a></div>'
            },
            {
                field: 'id',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'name',
                displayName: 'Name',
                width: '*'
            },
            {
                field: 'address',
                displayName: 'Address',
                width: '*'
            },
            {
                field: 'routingType',
                displayName: 'Routing Type',
                width: '*'
            },
            {
                field: 'filter',
                displayName: 'Filter',
                width: '*'
            },
            {
                field: 'durable',
                displayName: 'Durable',
                width: '*'
            },
            {
                field: 'maxConsumers',
                displayName: 'Max Consumers',
                width: '*'
            },
            {
                field: 'purgeOnNoConsumers',
                displayName: 'Purge On No Consumers',
                width: '*'
            },
            {
                field: 'consumerCount',
                displayName: 'Consumer Count',
                width: '*'
            },
            {
                field: 'rate',
                displayName: 'Rate',
                width: '*'
            },
            {
                field: 'messageCount',
                displayName: 'Message Count',
                width: '*'
            },

            // Hidden
            {
                field: 'paused',
                displayName: 'Paused',
                width: '*',
                visible: false
            },
            {
                field: 'temporary',
                displayName: 'Temporary',
                width: '*',
                visible: false
            },
            {
                field: 'autoCreated',
                displayName: 'Auto Created',
                width: '*',
                visible: false
            },
            {
                field: 'user',
                displayName: 'User',
                width: '*',
                visible: false
            },
            {
                field: 'messagesAdded',
                displayName: 'Total Messages Added',
                width: '*',
                visible: false
            },
            {
                field: 'messagesAcked',
                displayName: 'Total Messages Acked',
                width: '*',
                visible: false
            },
            {
                field: 'deliveringCount',
                displayName: 'Delivering Count',
                width: '*',
                visible: false
            },
            {
                field: 'messagesKilled',
                displayName: 'Messages Killed',
                width: '*',
                visible: false
            },
            {
                field: 'directDeliver',
                displayName: 'Direct Deliver',
                width: '*',
                visible: false
            }
        ];

        $scope.filter = {
            fieldOptions: [
                {id: 'ID', name: 'ID'},
                {id: 'NAME', name: 'Name'},
                {id: 'CONSUMER_ID', name: 'Consumer ID'},
                {id: 'ADDRESS', name: 'Address'},
                {id: 'FILTER', name: 'Filter'},
                {id: 'MAX_CONSUMERS', name: 'maxConsumers'},
                {id: 'ROUTING_TYPE', name: 'Routing Type'},
                {id: 'PURGE_ON_NO_CONSUMERS', name: 'Purge On No Consumers'},
                {id: 'USER', name: 'User'},
                {id: 'MESSAGE_COUNT', name: 'Message Count'},
                {id: 'DELIVERING_COUNT', name: 'Delivering Count'},
                {id: 'PAUSED', name: 'Paused'},
                {id: 'TEMPORARY', name: 'Temporary'},
                {id: 'AUTO_CREATED', name: 'Auto Created'},
                {id: 'RATE', name: 'Rate'},
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'},
                {id: 'GREATER_THAN', name: 'Greater Than'},
                {id: 'LESS_THAN', name: 'Less Than'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "id"
            }
        };

        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */
        if (artemisQueue.queue) {
            $scope.filter.values.field = $scope.filter.fieldOptions[1].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisQueue.queue.queue;
            artemisQueue.queue = null;
        }

        artemisSession.session = null;
        $scope.navigateToQueueAtts = function (row) {
            $location.path("jmx/attributes").search({"tab": "artemis", "nid": ARTEMIS.getQueueNid(row.entity, $location)});
        };
        $scope.navigateToQueueOps = function (row) {
            $location.path("jmx/operations").search({"tab": "artemis", "nid": ARTEMIS.getQueueNid(row.entity, $location)});
        };
        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
                fields: ["id"],
                columns: ["id"],
                directions: ["asc"]
            };
        var refreshed = false;

        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.id; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };
        $scope.refresh = function () {
            refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            var data = JSON.parse(response.value);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (queue) {
              queue.navigateToQueueAtts = $scope.navigateToQueueAtts;
              queue.navigateToQueueOps = $scope.navigateToQueueOps;
            })
            $scope.totalServerItems = data["count"];
            if (refreshed == true) {
                $scope.gridOptions.pagingOptions.currentPage = 1;
                refreshed = false;
            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    return ARTEMIS;
} (ARTEMIS || {}));

ARTEMIS.module.controller("ARTEMIS.QueuesController", ARTEMIS.QueuesController);
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
 */
var ARTEMIS;
(function (ARTEMIS) {
    var DELIVERY_PERSISTENT = "2";
    ARTEMIS.SendMessageController = function($route, $scope, $element, $timeout, workspace, ARTEMISService,  jolokia, localStorage, $location, artemisMessage) {
        Core.initPreferenceScope($scope, localStorage, {
            'durable': {
                'value': true,
                'converter': Core.parseBooleanValue
            }
        });
        var log = Logger.get("ARTEMIS");
        $scope.noCredentials = false;
        $scope.showChoose = false;
        $scope.profileFileNames = [];
        $scope.profileFileNameToProfileId = {};
        $scope.selectedFiles = {};
        $scope.container = {};
        $scope.message = "\n\n\n\n";
        $scope.headers = [];
        // bind model values to search params...
        Core.bindModelToSearchParam($scope, $location, "tab", "subtab", "compose");
        Core.bindModelToSearchParam($scope, $location, "searchText", "q", "");
        // only reload the page if certain search parameters change
        Core.reloadWhenParametersChange($route, $scope, $location);
        $scope.checkCredentials = function () {
           ARTEMIS.log.info(localStorage['artemisUserName'] + " " + localStorage['artemisPassword']);
            $scope.noCredentials = (Core.isBlank(localStorage['artemisUserName']) || Core.isBlank(localStorage['artemisPassword']));
        };
        // TODO: Find replacement
//        if ($location.path().has('artemis')) {
//            $scope.localStorage = localStorage;
//            $scope.$watch('localStorage.artemisUserName', $scope.checkCredentials);
//            $scope.$watch('localStorage.artemisPassword', $scope.checkCredentials);
//            //prefill if it's a resent
//            if (artemisMessage.message !== null) {
//                $scope.message = artemisMessage.message.bodyText;
//                if (artemisMessage.message.PropertiesText !== null) {
//                    for (var p in artemisMessage.message.StringProperties) {
//                        $scope.headers.push({name: p, value: artemisMessage.message.StringProperties[p]});
//                    }
//                }
//            }
//            // always reset at the end
//            artemisMessage.message = null;
//        }
        $scope.openPrefs = function () {
            $location.search('pref', 'Artemis');
            $scope.$emit("hawtioOpenPrefs");
        };
        var LANGUAGE_FORMAT_PREFERENCE = "defaultLanguageFormat";
        var sourceFormat = workspace.getLocalStorage(LANGUAGE_FORMAT_PREFERENCE) || "javascript";
        // TODO Remove this if possible
        $scope.codeMirror = undefined;
        var options = {
            mode: {
                name: sourceFormat
            },
            // Quick hack to get the codeMirror instance.
            onChange: function (codeMirror) {
                if (!$scope.codeMirror) {
                    $scope.codeMirror = codeMirror;
                }
            }
        };
        // TODO: Find replacement
        //$scope.codeMirrorOptions = CodeEditor.createEditorSettings(options);
        $scope.addHeader = function () {
            $scope.headers.push({name: "", value: ""});
            // lets set the focus to the last header
            if ($element) {
                $timeout(function () {
                    var lastHeader = $element.find("input.headerName").last();
                    lastHeader.focus();
                }, 100);
            }
        };
        $scope.removeHeader = function (header) {
            $scope.headers = $scope.headers.remove(header);
        };
        $scope.defaultHeaderNames = function () {
            var answer = [];

            function addHeaderSchema(schema) {
                angular.forEach(schema.definitions.headers.properties, function (value, name) {
                    answer.push(name);
                });
            }

            if (isJmsEndpoint()) {
                addHeaderSchema(ARTEMIS.jmsHeaderSchema);
            }
            /*if (isARTEMISEndpoint()) {
                addHeaderSchema(ARTEMIS.ARTEMISHeaderSchema);
            }*/
            return answer;
        };
        /* save the sourceFormat in preferences for later
         * Note, this would be controller specific preferences and not the global, overriding, preferences */
        // TODO Use ng-selected="changeSourceFormat()" - Although it seemed to fire multiple times..
        $scope.$watch('codeMirrorOptions.mode.name', function (newValue, oldValue) {
            workspace.setLocalStorage(LANGUAGE_FORMAT_PREFERENCE, newValue);
        });
        var sendWorked = function () {
            Core.notification("success", "Message sent!");
        };
        $scope.autoFormat = function () {
            setTimeout(function () {
                CodeEditor.autoFormatEditor($scope.codeMirror);
            }, 50);
        };
        $scope.sendMessage = function (durable) {
            var body = $scope.message;
           ARTEMIS.log.info(body);
            doSendMessage(durable, body, sendWorked);
        };
        function doSendMessage(durable, body, onSendCompleteFn) {
            var selection = workspace.selection;
            if (selection) {
                var mbean = selection.objectName;
                if (mbean) {
                    var headers = null;
                    if ($scope.headers.length) {
                        headers = {};
                        angular.forEach($scope.headers, function (object) {
                            var key = object.name;
                            if (key) {
                                headers[key] = object.value;
                            }
                        });
                        log.info("About to send headers: " + JSON.stringify(headers));
                    }
                    var callback = Core.onSuccess(onSendCompleteFn);

                    ARTEMIS.log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                    var user = localStorage["artemisUserName"];
                    var pwd = localStorage["artemisPassword"];
                    // AMQ is sending non persistent by default, so make sure we tell to sent persistent by default
                    if (!headers) {
                        headers = {};
                    }
                    var type = 3;
                    ARTEMISService.artemisConsole.sendMessage(mbean, jolokia, headers, type, body, durable, user, pwd, callback, Core.onSuccess(callback));

                }
            }
        }

        $scope.fileSelection = function () {
            var answer = [];
            angular.forEach($scope.selectedFiles, function (value, key) {
                if (value) {
                    answer.push(key);
                }
            });
            return answer;
        };
        $scope.sendSelectedFiles = function () {
            var filesToSend = $scope.fileSelection();
            var fileCount = filesToSend.length;
            var version = $scope.container.versionId || "1.0";

            function onSendFileCompleted(response) {
                if (filesToSend.length) {
                    var fileName = filesToSend.pop();
                    if (fileName) {
                        // lets load the file data...
                        var profile = $scope.profileFileNameToProfileId[fileName];
                        if (profile) {
                            var body = Fabric.getConfigFile(jolokia, version, profile, fileName);
                            if (!body) {
                                log.warn("No body for message " + fileName);
                                body = "";
                            }
                            doSendMessage(body, onSendFileCompleted);
                        }
                    }
                }
                else {
                    var text = Core.maybePlural(fileCount, "Message") + " sent!";
                    Core.notification("success", text);
                }
            }

            // now lets start sending
            onSendFileCompleted(null);
        };

        function isJmsEndpoint() {
            // TODO check for the jms/activemq endpoint in ARTEMIS or if its an activemq endpoint
            return true;
        }
    };
    return ARTEMIS;
} (ARTEMIS || {}));
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
 */
var ARTEMIS = (function(ARTEMIS) {

    ARTEMIS.SessionsController = function ($scope, $location, workspace, ARTEMISService, jolokia, localStorage, artemisConnection, artemisSession, artemisConsumer, artemisProducer) {

        var artemisJmxDomain = localStorage['artemisJmxDomain'] || "org.apache.activemq.artemis";

        /**
         *  Required For Each Object Type
         */

        var objectType = "sessions"
        var method = 'listSessions(java.lang.String, int, int)';
        var attributes = [
            {
                field: 'id',
                displayName: 'ID',
                width: '*'
            },
            {
                field: 'connectionID',
                displayName: 'Connection',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectConnection(row)">{{row.entity.connectionID}}</a></div>'
            },
            {
                field: 'user',
                displayName: 'User',
                width: '*'
            },
            {
                field: 'consumerCount',
                displayName: 'Consumer Count',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectConsumers(row)">{{row.entity.consumerCount}}</a></div>'
            },
            {
                field: 'producerCount',
                displayName: 'Producer Count',
                width: '*',
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="row.entity.selectProducers(row)">{{row.entity.producerCount}}</a></div>'
            },
            {
                field: 'creationTime',
                displayName: 'Creation Time',
                width: '*'
            },
        ];
        $scope.filter = {
            fieldOptions: [
                {id: 'ID', name: 'ID'},
                {id: 'CONNECTION_ID', name: 'Connection ID'},
                {id: 'CONSUMER_COUNT', name: 'Consumer Count'},
                {id: 'USER', name: 'User'},
                {id: 'PROTOCOL', name: 'Protocol'},
                {id: 'CLIENT_ID', name: 'Client ID'},
                {id: 'LOCAL_ADDRESS', name: 'Local Address'},
                {id: 'REMOTE_ADDRESS', name: 'Remote Address'},
            ],
            operationOptions: [
                {id: 'EQUALS', name: 'Equals'},
                {id: 'CONTAINS', name: 'Contains'},
                {id: 'GREATER_THAN', name: 'Greater Than'},
                {id: 'LESS_THAN', name: 'Less Than'}
            ],
            values: {
                field: "",
                operation: "",
                value: "",
                sortOrder: "asc",
                sortBy: "id"
            }
        };
        // Configure Parent/Child click through relationships
        $scope.selectConnection = function (row) {
            artemisSession.session = row.entity;
            $location.path("artemis/connections");
        };

        $scope.selectProducers = function (row) {
           artemisSession.session = row.entity;
           $location.path("artemis/producers");
        };

        $scope.selectConsumers = function (row) {
           artemisSession.session = row.entity;
           $location.path("artemis/consumers");
        };

        if (artemisConnection.connection) {
            ARTEMIS.log.info("navigating to connection = " + artemisConnection.connection.connectionID);
            $scope.filter.values.field = $scope.filter.fieldOptions[1].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisConnection.connection.connectionID;
        }

        if (artemisConsumer.consumer) {
            ARTEMIS.log.info("navigating to connection = " + artemisConsumer.consumer.ID);
            $scope.filter.values.field = $scope.filter.fieldOptions[0].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisConsumer.consumer.session;
        }

        if (artemisProducer.producer) {
            ARTEMIS.log.info("navigating to producer = " + artemisProducer.producer.ID);
            $scope.filter.values.field = $scope.filter.fieldOptions[0].id;
            $scope.filter.values.operation = $scope.filter.operationOptions[0].id;
            $scope.filter.values.value = artemisProducer.producer.session;
        }
        //refresh after use
        artemisSession.connection = null;
        artemisConsumer.consumer = null;
        artemisProducer.producer = null;
        $scope.closeSession = function () {
           var sessionID = $scope.gridOptions.selectedItems[0].id;
           var connectionID = $scope.gridOptions.selectedItems[0].connectionID;
           ARTEMIS.log.info("closing session: " + sessionID);
           if (workspace.selection) {
              var mbean = getBrokerMBean(jolokia);
              if (mbean) {
                 jolokia.request({ type: 'exec',
                    mbean: mbean,
                    operation: 'closeSessionWithID(java.lang.String, java.lang.String)',
                    arguments: [connectionID, sessionID] },
                    onSuccess($scope.loadTable(), { error: function (response) {
                       Core.defaultJolokiaErrorHandler("Could not close session: " + response);
                    }}));
             }
          }
        };
        /**
         *  Below here is utility.
         *
         *  TODO Refactor into new separate files
         */

        $scope.workspace = workspace;
        $scope.objects = [];
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [50, 100, 200],
            pageSize: 100,
            currentPage: 1
        };
        $scope.sortOptions = {
            fields: ["id"],
            columns: ["id"],
            directions: ["asc"]
        };
        var refreshed = false;
        $scope.showClose = false;
        $scope.gridOptions = {
            selectedItems: [],
            data: 'objects',
            showFooter: true,
            showFilter: true,
            showColumnMenu: true,
            enableCellSelection: false,
            enableHighlighting: true,
            enableColumnResize: true,
            enableColumnReordering: true,
            selectWithCheckboxOnly: false,
            showSelectionCheckbox: false,
            multiSelect: false,
            displaySelectionCheckbox: false,
            pagingOptions: $scope.pagingOptions,
            enablePaging: true,
            totalServerItems: 'totalServerItems',
            maintainColumnRatios: false,
            columnDefs: attributes,
            primaryKeyFn: function (entity) { return entity.id; },
            enableFiltering: true,
            useExternalFiltering: true,
            sortInfo: $scope.sortOptions,
            useExternalSorting: true,
        };
        $scope.refresh = function () {
            refreshed = true;
            $scope.loadTable();
        };
        $scope.reset = function () {
            $scope.filter.values.field = "";
            $scope.filter.values.operation = "";
            $scope.filter.values.value = "";
            $scope.loadTable();
        };
        $scope.loadTable = function () {
        	$scope.filter.values.sortColumn = $scope.sortOptions.fields[0];
            $scope.filter.values.sortBy = $scope.sortOptions.directions[0];
	        $scope.filter.values.sortOrder = $scope.sortOptions.directions[0];
            var mbean = getBrokerMBean(jolokia);
            if (mbean.includes("undefined")) {
                onBadMBean();
            } else if (mbean) {
                var filter = JSON.stringify($scope.filter.values);
                console.log("Filter string: " + filter);
                jolokia.request({ type: 'exec', mbean: mbean, operation: method, arguments: [filter, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize] }, Core.onSuccess(populateTable, { error: onError }));
            }
        };
        $scope.selectGridRow = function () { 
            $scope.showClose =  $scope.gridOptions.selectedItems.length > 0;
        };
        function onError() {
            Core.notification("error", "Could not retrieve " + objectType + " list from Artemis.");
        }
        function onBadMBean() {
            Core.notification("error", "Could not retrieve " + objectType + " list. Wrong MBean selected.");
        }
        function populateTable(response) {
            $scope.gridOptions.selectedItems.length = 0;
            $scope.showClose =  false;
            var data = JSON.parse(response.value);
            $scope.objects = [];
            angular.forEach(data["data"], function (value, idx) {
                $scope.objects.push(value);
            });
            angular.forEach($scope.objects, function (session) {
              session.selectConnection = $scope.selectConnection;
              session.selectConsumers = $scope.selectConsumers;
              session.selectProducers = $scope.selectProducers;
            })
            $scope.totalServerItems = data["count"];
            if (refreshed == true) {
                $scope.gridOptions.pagingOptions.currentPage = 1;
                refreshed = false;
            }
            Core.$apply($scope);
        }
        $scope.$watch('sortOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadTable();
            }
        }, true);
        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (parseInt(newVal.currentPage) && newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.loadTable();
            }
            if (parseInt(newVal.pageSize) && newVal !== oldVal && newVal.pageSize !== oldVal.pageSize) {
                $scope.pagingOptions.currentPage = 1;
                $scope.loadTable();
            }
        }, true);

        function getBrokerMBean(jolokia) {
            var mbean = null;
            var selection = workspace.selection;
            var folderNames = selection.folderNames;
            mbean = "" + folderNames[0] + ":broker=" + folderNames[1];
            ARTEMIS.log.info("broker=" + mbean);
            return mbean;
        };
        $scope.refresh();
    };
    return ARTEMIS;
} (ARTEMIS || {}));

ARTEMIS.module.controller("ARTEMIS.SessionsController", ARTEMIS.SessionsController);
angular.module("hawtio-artemis-template", []).run(["$templateCache", function($templateCache) {$templateCache.put("plugins/artemis/html/addresses.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.AddressesController\">\n\n    <!-- TODO This should be templated and included -->\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <div-- class=\"row-fluid\">\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>");
$templateCache.put("plugins/artemis/html/artemisLayout.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<script type=\"text/ng-template\" id=\"header\">\n  <div class=\"tree-header\" ng-controller=\"ARTEMIS.TreeHeaderController\">\n    <div class=\"left\">\n    </div>\n    <div class=\"right\">\n      <i class=\"fa fa-chevron-down clickable\"\n         title=\"Expand all nodes\"\n         ng-click=\"expandAll()\"></i>\n      <i class=\"fa fa-chevron-up clickable\"\n         title=\"Unexpand all nodes\"\n         ng-click=\"contractAll()\"></i>\n    </div>\n  </div>\n</script>\n<hawtio-pane position=\"left\" width=\"300\" header=\"header\">\n  <div id=\"tree-container\"\n       ng-controller=\"Jmx.MBeansController\">\n    <div id=\"artemistree\"\n         ng-controller=\"ARTEMIS.TreeController\"></div>\n  </div>\n</hawtio-pane>\n<div class=\"row-fluid\">\n  <!--\n  <ul class=\"nav nav-tabs\" ng-controller=\"Core.NavBarController\" hawtio-auto-dropdown>\n    <li ng-repeat=\"nav in subLevelTabs track by $index | orderBy:index\" ng-show=\"isValid(nav)\" ng-class=\"{active : isActive(nav)}\">\n      <a ng-href=\"{{nav.href()}}{{hash}}\" title=\"{{nav.title}}\"\n         data-placement=\"bottom\" ng-bind-html-unsafe=\"nav.content\">\n      </a>\n    </li>\n\n    <li class=\"pull-right\">\n      <a ng-href=\"{{fullScreenLink()}}\" title=\"Show this view in full screen\" data-placement=\"bottom\">\n        <i class=\"icon-fullscreen\"></i>\n      </a>\n    </li>\n    <li class=\"pull-right\">\n      <a ng-href=\"{{addToDashboardLink()}}\" title=\"Add this view to a dashboard\" data-placement=\"bottom\">\n        <i class=\"icon-share\"></i>\n      </a>\n    </li>\n    <li class=\"pull-right dropdown overflow\" style=\"visibility: hidden;\">\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><i class=\"icon-chevron-down\"></i></a>\n      <ul class=\"dropdown-menu right\"></ul>\n    </li>\n-->\n\n  </ul>\n\n  <div id=\"properties\" ng-view></div>\n</div>\n");
$templateCache.put("plugins/artemis/html/brokerDiagram.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<style type=\"text/css\">\n\n.span4.node-panel {\n  margin-top: 10px;\n  margin-left: 10px;\n  width: 33%;\n}\n.node-attributes dl {\n  margin-top: 5px;\n  margin-bottom: 10px;\n}\n.node-attributes dt {\n  width: 150px;\n}\n.node-attributes dd {\n  margin-left: 160px;\n}\n.node-attributes dd a {\n  /** lets make the destination links wrap */\n  -ms-word-break: break-all;\n  word-break: break-all;\n  -webkit-hyphens: auto;\n  -moz-hyphens: auto;\n  hyphens: auto;\n}\n\nul.viewMenu li {\n  padding-left: 10px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n\ndiv#pop-up {\n  display: none;\n  position: absolute;\n  color: white;\n  font-size: 14px;\n  background: rgba(0, 0, 0, 0.6);\n  padding: 5px 10px 5px 10px;\n  -moz-border-radius: 8px 8px;\n  border-radius: 8px 8px;\n}\n\ndiv#pop-up-title {\n  font-size: 15px;\n  margin-bottom: 4px;\n  font-weight: bolder;\n}\n\ndiv#pop-up-content {\n  font-size: 12px;\n}\n\nrect.graphbox {\n  fill: #FFF;\n}\n\nrect.graphbox.frame {\n  stroke: #222;\n  stroke-width: 2px\n}\n\n/* only things directly related to the network graph should be here */\n\npath.link {\n  fill: none;\n  stroke: #666;\n  stroke-width: 1.5px;  b\n}\n\nmarker.broker {\n  stroke: red;\n  fill: red;\n  stroke-width: 1.5px;\n}\n\ncircle.broker {\n  fill: #0c0;\n}\n\ncircle.brokerSlave {\n  fill: #c00;\n}\n\ncircle.notActive {\n  fill: #c00;\n}\n\npath.link.group {\n  stroke: #ccc;\n}\n\nmarker#group {\n  stroke: #ccc;\n  fill: #ccc;\n}\n\ncircle.group {\n  fill: #eee;\n  stroke: #ccc;\n}\n\ncircle.destination {\n  fill: #bbb;\n  stroke: #ccc;\n}\n\ncircle.pinned {\n  stroke-width: 4.5px;\n}\n\npath.link.profile {\n  stroke-dasharray: 0, 2 1;\n  stroke: #888;\n}\n\nmarker#container {\n}\n\ncircle.container {\n  stroke-dasharray: 0, 2 1;\n  stroke: #888;\n}\n\npath.link.container {\n  stroke-dasharray: 0, 2 1;\n  stroke: #888;\n}\n\ncircle {\n  fill: #ccc;\n  stroke: #333;\n  stroke-width: 1.5px;\n  cursor: pointer;\n}\n\ncircle.closeMode {\n  cursor: crosshair;\n}\n\npath.link.destination {\n  stroke: #ccc;\n}\n\ncircle.topic {\n  fill: #c0c;\n}\n\ncircle.queue {\n  fill: #00c;\n}\n\ncircle.consumer {\n  fill: #cfc;\n}\n\ncircle.producer {\n  fill: #ccf;\n}\n\npath.link.producer {\n  stroke: #ccc;\n}\n\npath.link.consumer {\n  stroke: #ccc;\n}\n\npath.link.network {\n  stroke: #ccc;\n}\n\ncircle.selected {\n  stroke-width: 3px;\n}\n\n.selected {\n  stroke-width: 3px;\n}\n\ntext {\n  font: 10px sans-serif;\n  pointer-events: none;\n}\n\ntext.shadow {\n  stroke: #fff;\n  stroke-width: 3px;\n  stroke-opacity: .8;\n}\n</style>\n\n\n<div class=\"row-fluid mq-page\" ng-controller=\"ARTEMIS.BrokerDiagramController\">\n\n  <div ng-hide=\"inDashboard\" class=\"span12 page-padded\">\n    <div class=\"section-header\">\n\n      <div class=\"section-filter\">\n        <input type=\"text\" class=\"search-query\" placeholder=\"Filter...\" ng-model=\"searchFilter\">\n        <i class=\"fa fa-remove clickable\" title=\"Clear filter\" ng-click=\"searchFilter = \'\'\"></i>\n      </div>\n\n      <div class=\"section-controls\">\n        <a href=\"#\"\n           class=\"dropdown-toggle\"\n           data-toggle=\"dropdown\">\n          View &nbsp;<i class=\"fa fa-caret-down\"></i>\n        </a>\n\n        <ul class=\"dropdown-menu viewMenu\">\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.consumer\"> Consumers\n            </label>\n          </li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.producer\"> Producers\n            </label>\n          </li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.address\"> Addresses\n            </label>\n          </li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.queue\"> Queues\n            </label>\n          </li>\n          <li class=\"divider\"></li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.broker\"> Brokers\n            </label>\n          </li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.slave\"> Slave brokers\n            </label>\n          </li>\n          <li>\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.network\"> Networks\n            </label>\n          </li>\n          <li class=\"divider\"></li>\n          <li title=\"Should we show the details panel on the left\">\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.panel\"> Details panel\n            </label>\n          </li>\n          <li title=\"Show the summary popup as you hover over nodes\">\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.popup\"> Hover text\n            </label>\n          </li>\n          <li title=\"Show the labels next to nodes\">\n            <label class=\"checkbox\">\n              <input type=\"checkbox\" ng-model=\"viewSettings.label\"> Label\n            </label>\n          </li>\n        </ul>\n\n      </div>\n    </div>\n  </div>\n\n\n  <div id=\"pop-up\">\n    <div id=\"pop-up-title\"></div>\n    <div id=\"pop-up-content\"></div>\n  </div>\n\n  <div class=\"row-fluid\">\n    <div class=\"{{viewSettings.panel ? \'span8\' : \'span12\'}} canvas broker-canvas\">\n      <div hawtio-force-graph graph=\"graph\" selected-model=\"selectedNode\" link-distance=\"150\" charge=\"-600\" nodesize=\"10\" marker-kind=\"marker-end\"\n           style=\"min-height: 800px\">\n      </div>\n    </div>\n    <div ng-show=\"viewSettings.panel\" class=\"span4 node-panel\">\n      <div ng-show=\"selectedNode\" class=\"node-attributes\">\n        <dl ng-repeat=\"property in selectedNodeProperties\" class=\"dl-horizontal\">\n          <dt title=\"{{property.key}}\">{{property.key}}:</dt>\n          <dd ng-bind-html=\"property.value\"></dd>\n        </dl>\n      </div>\n    </div>\n  </div>\n\n  <div ng-include=\"\'app/fabric/html/connectToContainerDialog.html\'\"></div>\n\n</div>\n\n\n");
$templateCache.put("plugins/artemis/html/browseQueue.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.BrowseQueueController\">\n  <div class=\"row-fluid\">\n    <div class=\"span6\">\n      <input class=\"search-query span12\" type=\"text\" ng-model=\"gridOptions.filterOptions.filterText\"\n             placeholder=\"Filter messages\">\n    </div>\n    <div class=\"span6\">\n      <div class=\"pull-right\">\n        <form class=\"form-inline\">\n          <button class=\"btn\" ng-disabled=\"!gridOptions.selectedItems.length\" ng-show=\"dlq\" ng-click=\"retryMessages()\"\n                  title=\"Moves the dead letter queue message back to its original destination so it can be retried\" data-placement=\"bottom\">\n            <i class=\"fa fa-reply\"></i> Retry\n          </button>\n          <button class=\"btn\" ng-disabled=\"gridOptions.selectedItems.length !== 1\" ng-click=\"resendMessage()\"\n                    title=\"Edit the message to resend it\" data-placement=\"bottom\">\n           <i class=\"fa fa-share-alt\"></i> Resend\n          </button>\n\n          <button class=\"btn\" ng-disabled=\"!gridOptions.selectedItems.length\" ng-click=\"moveDialog = true\"\n                  title=\"Move the selected messages to another destination\" data-placement=\"bottom\">\n            <i class=\"fa fa-share-alt\"></i> Move\n          </button>\n          <button class=\"btn\" ng-disabled=\"!gridOptions.selectedItems.length\"\n                  ng-click=\"deleteDialog = true\"\n                  title=\"Delete the selected messages\">\n            <i class=\"fa fa-remove\"></i> Delete\n          </button>\n          <button class=\"btn\" ng-click=\"refresh()\"\n                  title=\"Refreshes the list of messages\">\n            <i class=\"fa fa-refresh\"></i>\n          </button>\n        </form>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row-fluid\">\n    <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n  </div>\n\n  <div hawtio-slideout=\"showMessageDetails\" title=\"{{row.JMSMessageID}}\">\n    <div class=\"dialog-body\">\n\n      <div class=\"row-fluid\">\n        <div class=\"pull-right\">\n          <form class=\"form-horizontal no-bottom-margin\">\n\n            <div class=\"btn-group\"\n                 hawtio-pager=\"messages\"\n                 on-index-change=\"selectRowIndex\"\n                 row-index=\"rowIndex\"></div>\n\n            <button class=\"btn\" ng-disabled=\"!gridOptions.selectedItems.length\" ng-click=\"moveDialog = true\"\n                    title=\"Move the selected messages to another destination\" data-placement=\"bottom\">\n              <i class=\"fa fa-share-alt\"></i> Move\n            </button>\n\n            <button class=\"btn btn-danger\" ng-disabled=\"!gridOptions.selectedItems.length\"\n                    ng-click=\"deleteDialog = true\"\n                    title=\"Delete the selected messages\">\n              <i class=\"fa fa-remove\"></i> Delete\n            </button>\n\n            <button class=\"btn\" ng-click=\"showMessageDetails = !showMessageDetails\" title=\"Close this dialog\">\n              <i class=\"fa fa-remove\"></i> Close\n            </button>\n\n          </form>\n        </div>\n      </div>\n\n      <div class=\"row-fluid\">\n        <div class=\"expandable closed\">\n          <div title=\"Headers\" class=\"title\">\n            <i class=\"expandable-indicator\"></i> Headers & Properties\n          </div>\n          <div class=\"expandable-body well\">\n            <table class=\"table table-condensed table-striped\">\n              <thead>\n              <tr>\n                <th>Header</th>\n                <th>Value</th>\n              </tr>\n              </thead>\n              <tbody ng-bind-html=\"row.headerHtml\"></tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row-fluid\">\n        <div>Displaying body as <span ng-bind=\"row.textMode\"></span></div>\n        <div hawtio-editor=\"row.bodyText\" read-only=\"true\" mode=\'mode\'></div>\n      </div>\n\n    </div>\n  </div>\n\n  <div hawtio-confirm-dialog=\"deleteDialog\"\n       ok-button-text=\"Delete\"\n       cancel-button-text=\"Cancel\"\n       on-ok=\"deleteMessages()\">\n    <div class=\"dialog-body\">\n      <p>You are about to delete\n        <ng-pluralize count=\"gridOptions.selectedItems.length\"\n                      when=\"{\'1\': \'a message!\', \'other\': \'{} messages!\'}\">\n        </ng-pluralize>\n      </p>\n      <p>This operation cannot be undone so please be careful.</p>\n    </div>\n  </div>\n\n  <div hawtio-confirm-dialog=\"moveDialog\"\n       ok-button-text=\"Move\"\n       cancel-button-text=\"Cancel\"\n       on-ok=\"moveMessages()\">\n    <div class=\"dialog-body\">\n      <p>Move\n        <ng-pluralize count=\"gridOptions.selectedItems.length\"\n                      when=\"{\'1\': \'message\', \'other\': \'{} messages\'}\"></ng-pluralize>\n        to: <input type=\"text\" ng-model=\"queueName\" placeholder=\"Queue name\"\n                   typeahead=\"title.unescapeHTML() for title in queueNames($viewValue) | filter:$viewValue\" typeahead-editable=\'true\'></p>\n      <p>\n        You cannot undo this operation.<br>\n        Though after the move you can always move the\n        <ng-pluralize count=\"gridOptions.selectedItems.length\"\n                      when=\"{\'1\': \'message\', \'other\': \'messages\'}\"></ng-pluralize>\n        back again.\n      </p>\n    </div>\n  </div>\n\n</div>\n\n");
$templateCache.put("plugins/artemis/html/connections.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.ConnectionsController\">\n\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}</option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n\n            <div class=\"pull-right\">\n              <form class=\"form-inline\">\n                <button class=\"btn-danger\" ng-show=\"showClose\"\n                        ng-click=\"deleteDialog = true\"\n                        title=\"Close the selected Connection\">\n                  <i class=\"fa fa-remove\"></i> Close\n                </button>\n                &nbsp;&nbsp;&nbsp;\n              </form>\n            </div>\n        </div>\n    </div>\n\n    <div hawtio-confirm-dialog=\"deleteDialog\"\n           ok-button-text=\"Close\"\n           cancel-button-text=\"Cancel\"\n           on-ok=\"closeConnection()\">\n        <div class=\"dialog-body\">\n          <p>You are about to close the selected connection: {{gridOptions.selectedItems[0].connectionID}}\n          </p>\n          <p>Are you sure you want to continue.</p>\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <!--div-- class=\"gridStyle\" ng-grid=\"gridOptions\" ui-grid-resize-columns ng-click=\"selectGridRow()\"></div-->\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>");
$templateCache.put("plugins/artemis/html/consumers.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.ConsumersController\">\n\n    <!-- TODO This should be templated and included -->\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n\n            <div class=\"pull-right\">\n              <form class=\"form-inline\">\n                <button class=\"btn-danger\" ng-show=\"showClose\"\n                        ng-click=\"deleteDialog = true\"\n                        title=\"Close the selected Consumer\">\n                  <i class=\"fa fa-remove\"></i> Close\n                </button>\n                &nbsp;&nbsp;&nbsp;\n              </form>\n            </div>\n        </div>\n    </div>\n\n    <div hawtio-confirm-dialog=\"deleteDialog\"\n          ok-button-text=\"Close\"\n          cancel-button-text=\"Cancel\"\n          on-ok=\"closeConsumer()\">\n       <div class=\"dialog-body\">\n         <p>You are about to close the selected consumer: {{gridOptions.selectedItems[0].id}}\n         </p>\n         <p>Are you sure you want to continue.</p>\n       </div>\n    </div>\n\n    <div class=\"row-fluid\">\n        <!--div-- class=\"gridStyle\" ng-grid=\"gridOptions\" ui-grid-resize-columns ng-click=\"selectGridRow()\"></div-->\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>");
$templateCache.put("plugins/artemis/html/createAddress.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<form class=\"form-horizontal\" ng-controller=\"ARTEMIS.AddressController\">\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"addressName\"\n                title=\"The routing name of this address\">Address name</label>\n        <div class=\"controls\">\n            <input id=\"addressName\" type=\"text\" maxlength=\"300\" ng-model=\"addressName\" placeholder=\"Address Name\"/>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"routingType\">Routing type</label>\n\n        <div class=\"controls\">\n            <select id=\"routingType\" ng-model=\"routingType\">\n                <option value=\'0\'>Multicast</option>\n                <option value=\'1\'>Anycast</option>\n                <option value=\'2\'>Both</option>\n            </select>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <div class=\"controls\">\n            <button type=\"submit\" class=\"btn btn-info\" ng-click=\"createAddress(addressName, routingType)\" ng-disabled=\"!addressName\">Create Address</button>\n        </div>\n    </div>\n</form>\n");
$templateCache.put("plugins/artemis/html/createQueue.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<form class=\"form-horizontal\" ng-controller=\"ARTEMIS.QueueController\">\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"queueName\"\n               title=\"The routing name of this address\">Queue name</label>\n        <div class=\"controls\">\n            <input id=\"queueName\" type=\"text\" maxlength=\"300\" ng-model=\"queueName\" placeholder=\"Queue Name\"/>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"routingType\">Routing type</label>\n\n        <div class=\"controls\">\n            <select id=\"routingType\" ng-model=\"routingType\">\n                <option value=\'0\'>Multicast</option>\n                <option value=\'1\'>Anycast</option>\n            </select>\n        </div>\n    </div>\n\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"durable\"\n               title=\"Whether the queue will be durable\">Durable</label>\n        <div class=\"controls\">\n            <input id=\"durable\" type=\"checkbox\" ng-model=\"durable\" value=\"false\">\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"filter\"\n               title=\"The user name to be used when connecting to the broker\">Filter</label>\n        <div class=\"controls\">\n            <input id=\"filter\" type=\"text\" maxlength=\"300\" ng-model=\"filter\" placeholder=\"Filter\"/>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"maxConsumers\"\n               title=\"The maximum consumers the queue can have\">Max Consumers</label>\n        <div class=\"controls\">\n            <input id=\"maxConsumers\" type=\"number\" ng-model=\"maxConsumers\" placeholder=\"maxConsumers\"/>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <label class=\"control-label\" for=\"purgeWhenNoConsumers\"\n               title=\"Whether or not this queue should be purged (emptied and paused) when there are no consumers\">Purge when no consumers</label>\n        <div class=\"controls\">\n            <input id=\"purgeWhenNoConsumers\" type=\"checkbox\" ng-model=\"purgeWhenNoConsumers\" value=\"false\"/>\n        </div>\n    </div>\n\n    <div class=\"control-group\">\n        <div class=\"controls\">\n            <button type=\"submit\" class=\"btn btn-info\" ng-click=\"createQueue(queueName, routingType, durable, filter, maxConsumers, purgeWhenNoConsumers)\" ng-disabled=\"!queueName\">Create Queue</button>\n        </div>\n    </div>\n</form>\n");
$templateCache.put("plugins/artemis/html/deleteAddress.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.AddressController\">\n  <div class=\"row-fluid\">\n\n    <div class=\"control-group\">\n      <div class=\"alert\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n        <strong>Warning:</strong> these operations cannot be undone. Please be careful!\n      </div>\n    </div>\n  </div>\n  <div class=\"row-fluid\">\n    <div class=\"span4\">\n      <div class=\"control-group\">\n        <button type=\"submit\" class=\"btn btn-warning\" ng-click=\"deleteDialog = true\">Delete address \'{{name()}}\'</button>\n        <label>This will remove the address completely.</label>\n      </div>\n    </div>\n  </div>\n\n  <div hawtio-confirm-dialog=\"deleteDialog\"\n       ok-button-text=\"Delete\"\n       cancel-button-text=\"Cancel\"\n       on-ok=\"deleteAddress()\">\n    <div class=\"dialog-body\">\n      <p>You are about to delete the <b>{{name()}}</b> address</p>\n      <p>This operation cannot be undone so please be careful.</p>\n    </div>\n  </div>\n\n\n\n</div>\n");
$templateCache.put("plugins/artemis/html/deleteQueue.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.QueueController\">\n  <div class=\"row-fluid\">\n\n    <div class=\"control-group\">\n      <div class=\"alert\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n        <strong>Warning:</strong> these operations cannot be undone. Please be careful!\n      </div>\n    </div>\n  </div>\n  <div class=\"row-fluid\">\n    <div class=\"span4\">\n      <div class=\"control-group\">\n        <button type=\"submit\" class=\"btn btn-warning\" ng-click=\"deleteDialog = true\">Delete queue \'{{name()}}\'</button>\n        <label>This will remove the queue completely.</label>\n      </div>\n    </div>\n    <div class=\"span4\">\n      <div class=\"control-group\">\n        <button type=\"submit\" class=\"btn btn-warning\" ng-click=\"purgeDialog = true\">Purge queue \'{{name()}}\'</button>\n        <label>Purges all the current messages on the queue.</label>\n      </div>\n    </div>\n  </div>\n\n  <div hawtio-confirm-dialog=\"deleteDialog\"\n       ok-button-text=\"Delete\"\n       cancel-button-text=\"Cancel\"\n       on-ok=\"deleteDestination(true)\">\n    <div class=\"dialog-body\">\n      <p>You are about to delete the <b>{{name()}}</b> queue</p>\n      <p>This operation cannot be undone so please be careful.</p>\n    </div>\n  </div>\n\n  <div hawtio-confirm-dialog=\"purgeDialog\"\n       ok-button-text=\"Purge\"\n       cancel-button-text=\"Cancel\"\n       on-ok=\"purgeDestination()\">\n    <div class=\"dialog-body\">\n      <p>You are about to purge the <b>{{name()}}</b> queue</p>\n      <p>This operation cannot be undone so please be careful.</p>\n    </div>\n  </div>\n\n\n</div>\n");
$templateCache.put("plugins/artemis/html/layoutActiveMQTree.html","<script type=\"text/ng-template\" id=\"ActiveMQTreeHeader.html\">\n  <div class=\"tree-header\" ng-controller=\"ActiveMQ.TreeHeaderController\">\n    <div class=\"left\">\n    </div>\n    <div class=\"right\">\n      <i class=\"fa fa-chevron-down clickable\"\n         title=\"Expand all nodes\"\n         ng-click=\"expandAll()\"></i>\n      <i class=\"fa fa-chevron-up clickable\"\n         title=\"Unexpand all nodes\"\n         ng-click=\"contractAll()\"></i>\n    </div>\n  </div>\n</script>\n\n<hawtio-pane position=\"left\" width=\"300\" header=\"ActiveMQTreeHeader.html\">\n  <div id=\"tree-container\"\n       ng-controller=\"Jmx.MBeansController\">\n    <div id=\"activemqtree\"\n         ng-controller=\"ActiveMQ.TreeController\"></div>\n  </div>\n</hawtio-pane>\n<div class=\"row\">\n  <!--\n  <ng-include src=\"\'plugins/jmx/html/subLevelTabs.html\'\"></ng-include>\n  -->\n  <div id=\"properties\" ng-view></div>\n</div>\n");
$templateCache.put("plugins/artemis/html/preferences.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.PreferencesController\">\n  <form class=\"form-horizontal\">\n\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"artemisUserName\"\n             title=\"The user name to be used when connecting to the broker\">User name</label>\n\n      <div class=\"controls\">\n        <input id=\"artemisUserName\" type=\"text\" placeholder=\"username\" ng-model=\"artemisUserName\" autofill/>\n      </div>\n    </div>\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"artemisPassword\" title=\"Password to be used when connecting to the broker\">Password</label>\n\n      <div class=\"controls\">\n        <input id=\"artemisPassword\" type=\"password\" placeholder=\"password\" ng-model=\"artemisPassword\" autofill/>\n      </div>\n    </div>\n\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"artemisDLQ\" title=\"The DLQ of the Broker\">DLQ</label>\n\n      <div class=\"controls\">\n        <input id=\"artemisDLQ\" type=\"text\" placeholder=\"DLQ\" ng-model=\"artemisDLQ\" autofill/>\n      </div>\n    </div>\n\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"artemisExpiryQueue\" title=\"The Expiry Queue of the Broker\">Expiry Queue</label>\n\n      <div class=\"controls\">\n        <input id=\"artemisExpiryQueue\" type=\"text\" placeholder=\"ExpiryQueue\" ng-model=\"artemisExpiryQueue\" autofill/>\n      </div>\n    </div>\n\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"byteMessages\">Browse byte messages</label>\n\n      <div class=\"controls\">\n        <select id=\"byteMessages\" ng-model=\"activemqBrowseBytesMessages\">\n          <option value=\'99\'>Off</option>\n          <option value=\'8\'>Decimal</option>\n          <option value=\'4\'>Hex</option>\n          <option value=\'2\'>Decimal and text</option>\n          <option value=\'1\'>Hex and text</option>\n        </select>\n        <span class=\"help-block\">Browsing byte messages should display the message body as</span>\n      </div>\n    </div>\n\n  </form>\n</div>\n");
$templateCache.put("plugins/artemis/html/producers.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.ProducersController\">\n\n    <!-- TODO This should be templated and included -->\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row-fluid\">\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>");
$templateCache.put("plugins/artemis/html/queues.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.QueuesController\">\n\n    <!-- TODO This should be templated and included -->\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row-fluid\">\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>");
$templateCache.put("plugins/artemis/html/sendMessage.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.SendMessageController\">\n\n  <div class=\"tabbable\" ng-model=\"tab\">\n\n    <div value=\"compose\" class=\"tab-pane\" title=\"Compose\">\n      <!--\n         title=\"Compose a new message to send\"\n      -->\n\n      <div class=\"row-fluid\">\n        <span ng-show=\"noCredentials\" class=\"alert\">\n          No credentials set for endpoint!  Please set your username and password in the <a\n            href=\"\" ng-click=\"openPrefs()\">Preferences</a> page\n        </span>\n\n        <form class=\"form-inline pull-right\">\n          <div class=\"row-fluid\">\n            <div class=\"controls\">\n              <label class=\"control-label\" for=\"durable\" title=\"Is this message durable\">Durable: </label>\n              <input id=\"durable\" type=\"checkbox\" ng-model=\"durable\" value=\"true\">\n            </div>\n          <button class=\"btn\" ng-click=\"addHeader()\" title=\"Add a new message header\"><i\n              class=\"fa fa-plus\"></i> Header\n          </button>\n          <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"sendMessage(durable)\">Send message</button>\n        </form>\n      </div>\n\n      <form class=\"form-inline bottom-margin\" ng-submit=\"addHeader()\">\n        <ol class=\"zebra-list header-list\">\n          <div class=\"row-fluid\">\n            <li ng-repeat=\"header in headers\">\n              <div class=\"span4\">\n                <input type=\"text\" style=\"width: 100%\" class=\"headerName\"\n                       ng-model=\"header.name\"\n                       typeahead=\"completion for completion in defaultHeaderNames() | filter:$viewValue\"\n                       typeahead-editable=\'true\'\n                       placeholder=\"Header name\">\n              </div>\n              <div class=\"span6\">\n                <input type=\"text\" style=\"width: 100%\" ng-model=\"header.value\"\n                       placeholder=\"Value of the message header\">\n              </div>\n              <div class=\"span2\">\n                <button type=\"submit\" class=\"btn\" title=\"Add a new message header\">\n                  <i class=\"fa fa-plus\"></i>\n                </button>\n                <button type=\"button\" ng-click=\"removeHeader(header)\" class=\"btn\" title=\"Removes this message header\">\n                  <i class=\"fa fa-remove\"></i>\n                </button>\n              </div>\n            </li>\n          </div>\n        </ol>\n      </form>\n\n      <div class=\"row-fluid\">\n        <form class=\"form-inline\">\n          <div class=\"controls\">\n            <label class=\"control-label\" for=\"sourceFormat\" title=\"The text format to use for the message payload\">Payload\n              format: </label>\n            <select ng-model=\"codeMirrorOptions.mode.name\" id=\"sourceFormat\">\n              <option value=\"javascript\">JSON</option>\n              <option value=\"text\" selected>Plain text</option>\n              <option value=\"properties\">Properties</option>\n              <option value=\"xml\">XML</option>\n            </select>\n\n            <button class=\"btn\" ng-click=\"autoFormat()\"\n                    title=\"Automatically pretty prints the message so its easier to read\">Auto format\n            </button>\n          </div>\n        </form>\n      </div>\n\n      <div class=\"row-fluid\">\n        <textarea ui-codemirror=\"codeMirrorOptions\" ng-model=\"message\"></textarea>\n      </div>\n    </div>\n    </tab>\n\n    <div ng-switch=\"showChoose\">\n      <div ng-switch-when=\"true\">\n        <div value=\"choose\" class=\"tab-pane\" title=\"Choose\">\n          <!--\n                   title=\"Choose messages to send from the available files in the Profile configuration for this container\">\n          -->\n          <div class=\"row-fluid bottom-margin\">\n        <span ng-show=\"noCredentials\" class=\"alert\">\n          No credentials set for endpoint!  Please set your username and password in the <a\n            href=\"#/preferences\">Preferences</a> page\n        </span>\n            <button type=\"submit\" ng-disabled=\"!fileSelection().length\" class=\"btn btn-primary pull-right\"\n                    ng-click=\"sendSelectedFiles()\">\n              <ng-pluralize count=\"fileSelection().length\"\n                            when=\"{\'0\': \'No files selected\', \'1\': \'Send the file\',\'other\': \'Send {} files\'}\">\n              </ng-pluralize>\n            </button>\n          </div>\n\n          <p>Choose which files to send from the profile configuration:</p>\n\n          <div class=\"control-group inline-block\">\n            <input class=\"search-query\" type=\"text\" ng-model=\"searchText\" placeholder=\"Filter...\" autofocus>\n          </div>\n\n          <ul>\n            <li ng-repeat=\"fileName in profileFileNames | filter:searchText\">\n              <input type=\"checkbox\" ng-model=\"selectedFiles[fileName]\"> {{fileName}}\n            </li>\n          </ul>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n");
$templateCache.put("plugins/artemis/html/sessions.html","<!--\n  Licensed to the Apache Software Foundation (ASF) under one or more\n  contributor license agreements.  See the NOTICE file distributed with\n  this work for additional information regarding copyright ownership.\n  The ASF licenses this file to You under the Apache License, Version 2.0\n  (the \"License\"); you may not use this file except in compliance with\n  the License.  You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n  Architecture\n-->\n<div ng-controller=\"ARTEMIS.SessionsController\">\n\n    <div class=\"row-fluid\">\n        <div class=\"span24\">\n            <div class=\"control-group inline-block\">\n                <form class=\"form-inline no-bottom-margin\">\n                    &nbsp;<span class=\"label label-default\">Filter</span>\n                    &nbsp;&nbsp;\n                    <select ng-model=\"filter.values.field\" id=\"filter.values.field\">\n                        <option ng-repeat=\"option in filter.fieldOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <select ng-model=\"filter.values.operation\" id=\"filter.values.operation\">\n                        <option ng-repeat=\"option in filter.operationOptions\" value=\"{{option.id}}\">{{option.name}}\n                        </option>\n                    </select>\n                    <input class=\"search-query\" type=\"text\" ng-model=\"filter.values.value\" placeholder=\"Value\">\n                    <button class=\"btn\" ng-click=\"refresh()\"\n                            title=\"Filter\">\n                        <i class=\"fa fa-search\">&nbsp;&nbsp;</i>\n                    </button>\n                    &nbsp;&nbsp;\n                    <button class=\"btn pull-right\" ng-click=\"reset()\"\n                            title=\"Reset\">\n                        <i class=\"fa fa-refresh\">&nbsp;&nbsp;Reset</i>\n                    </button>\n                </form>\n            </div>\n            <div class=\"pull-right\">\n                <form class=\"form-inline\">\n                    <button class=\"btn-danger\" ng-show=\"showClose\"\n                            ng-click=\"deleteDialog = true\"\n                            title=\"Close the selected Session\">\n                        <i class=\"fa fa-remove\"></i> Close\n                    </button>\n                    &nbsp;&nbsp;&nbsp;\n                </form>\n            </div>\n        </div>\n    </div>\n    <div hawtio-confirm-dialog=\"deleteDialog\"\n          ok-button-text=\"Close\"\n          cancel-button-text=\"Cancel\"\n          on-ok=\"closeSession()\">\n       <div class=\"dialog-body\">\n         <p>You are about to close the selected session: {{gridOptions.selectedItems[0].id}}\n         </p>\n         <p>Are you sure you want to continue.</p>\n       </div>\n    </div>\n    <div class=\"row-fluid\">\n        <table class=\"table table-striped table-bordered table-hover activemq-browse-table\" hawtio-simple-table=\"gridOptions\"></table>\n    </div>\n\n</div>\n\n\n\n");}]); hawtioPluginLoader.addModule("hawtio-artemis-template");