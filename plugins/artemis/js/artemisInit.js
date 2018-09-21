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
var ARTEMIS = (function (ARTEMIS) {

  // one-time initialization happens in the run function
  // of our module
  function init(HawtioNav, workspace, viewRegistry, helpRegistry, preferencesRegistry, localStorage, jolokia, ARTEMISService, $rootScope, preLogoutTasks, $templateCache) {
    'ngInject';

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
      .title(function () { return 'Artemis' })
      .defaultPage(
        {
          rank: 15,
          isValid: function (yes, no) {
            var name = 'ArtemisDefaultPage';
            workspace.addNamedTreePostProcessor(name, function (tree) {
              workspace.removeNamedTreePostProcessor(name);
              if (workspace.treeContainsDomainAndProperties(artemisJmxDomain)) {
                yes();
              }
              else {
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
      title: function () { return '<i class="fa fa-plus"></i> Create' },
      tooltip: function () { return "Create a new address" },
      show: function () { return isBroker(workspace, artemisJmxDomain) || isAddressFolder(workspace, artemisJmxDomain); },
      href: function () { return "/artemis/createAddress" }
    });

    subLevelTabs.push({
      id: 'artemis-delete-address',
      title: function () { return '<i class="fa fa-remove"></i> Delete' },
      tooltip: function () { return "Delete an address" },
      index: 4,
      show: function () { return isAddress(workspace, artemisJmxDomain); },
      href: function () { return "/artemis/deleteAddress"; }
    });

    subLevelTabs.push({
      id: 'artemis-create-queue',
      title: function () { return '<i class="fa fa-plus"></i> Create' },
      tooltip: function () { return "Create a new queue" },
      show: function () { return isAddress(workspace, artemisJmxDomain) },
      href: function () { return "/artemis/createQueue" }
    });

    subLevelTabs.push({
      id: 'artemis-delete-queue',
      title: function () { return '<i class="fa fa-remove"></i> Delete' },
      tooltip: function () { return "Delete or purge this queue" },
      show: function () { return isQueue(workspace, artemisJmxDomain); },
      href: function () { return "/artemis/deleteQueue" }
    });

    subLevelTabs.push({
      id: 'artemis-browse-queue',
      title: function () { return '<i class="fa fa-envelope"></i> Browse' },
      tooltip: function () { return "Browse the messages on the queue" },
      show: function () { return isQueue(workspace, artemisJmxDomain); },
      href: function () { return "/artemis/browseQueue" + workspace.hash(); }
    });

    subLevelTabs.push({
      id: 'artemis-send-message',
      title: function () { return '<i class="fa fa-pencil"></i> Send' },
      tooltip: function () { return "Send a message to this address" },
      show: function () { return isAddress(workspace, artemisJmxDomain) || isQueue(workspace, artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/sendMessage"; else return "/jmx/sendMessage"; }
      //href: function () { return "/artemis/sendMessage";}
    });

    subLevelTabs.unshift({
      id: 'artemis-view-diagram',
      title: function () { return '<i class="fa fa-picture-o"></i> Diagram&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|' },
      tooltip: function () { return "View a diagram of the producers, destinations and consumers" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/diagram"; else return "/jmx/diagram"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-queues',
      title: function () { return '<i class="fa fa-th-list"></i> Queues' },
      tooltip: function () { return "Manage Queues" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/queues"; else return "/jmx/queues"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-addresses',
      title: function () { return '<i class="fa fa-book"></i> Addresses' },
      tooltip: function () { return "Manage Addresses" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/addresses"; else return "/artemis/addresses"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-producers',
      title: function () { return '<i class="fa fa-upload"></i> Producers' },
      tooltip: function () { return "Manage Producers" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/producers"; else return "/jmx/producers"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-consumers',
      title: function () { return '<i class="fa fa-download"></i> Consumers' },
      tooltip: function () { return "Manage Consumers" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/consumers"; else return "/jmx/consumers"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-sessions',
      title: function () { return '<i class="fa fa-tasks"></i> Sessions' },
      tooltip: function () { return "Manage Sessions" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/sessions"; else return "/jmx/sessions"; }
    });

    subLevelTabs.unshift({
      id: 'artemis-manage-connections',
      title: function () { return '<i class="fa fa-signal"></i> Connections' },
      tooltip: function () { return "Manage Connections" },
      show: function () { return workspace.isTopTabActive("artemis") || workspace.selectionHasDomain(artemisJmxDomain); },
      href: function () { if (workspace.isTopTabActive("artemis")) return "/artemis/connections"; else return "/jmx/connections"; }
    });
    HawtioNav.add(tab);

    preLogoutTasks.addTask("clearArtemisCredentials", function () {
      localStorage.removeItem('artemisUserName');
      localStorage.removeItem('artemisPassword');
    });
  };

  function isBroker(workspace, domain) {
    return workspace.hasDomainAndProperties(domain, { 'broker': 'Broker' }, 3);
  }

  function isAddressFolder(workspace, domain) {
    return workspace.selectionHasDomainAndLastFolderName(domain, 'addresses');
  }

  function isAddress(workspace, domain) {
    return workspace.hasDomainAndProperties(domain, { 'component': 'addresses' }) && !workspace.hasDomainAndProperties(domain, { 'subcomponent': 'queues' }) && !workspace.hasDomainAndProperties(domain, { 'subcomponent': 'diverts' });
  }

  function isDivert(workspace, domain) {
    return workspace.hasDomainAndProperties(domain, { 'subcomponent': 'diverts' });
  }

  function isQueue(workspace, domain) {
    return workspace.hasDomainAndProperties(domain, { 'subcomponent': 'queues' });
  }

  ARTEMIS.module.run(init);

  return ARTEMIS;
}(ARTEMIS || {}));
