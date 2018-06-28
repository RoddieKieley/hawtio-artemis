# Apache ActiveMQ Artemis plugin for Hawtio

## Quickstart

*prereqs* - Install node and npm, ideally use an LTS version.  Run `npm install -g gulp bower` to install the necessary tools for development

After cloning run:

```
npm install
```

followed by:

```
bower install
```

then run:

```
gulp
```

to start the development server.  The development server is configured to proxy a jolokia instance running on localhost:8778, this is set in the gulpfile.js:

```
  hawtio.setConfig({
    port: 2772,
    staticProxies: [
    {
      port: 8778,
      path: '/jolokia',
      targetPath: '/jolokia'
    }

```
