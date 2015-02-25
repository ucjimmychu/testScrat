
'use strict';

var cluster = require('cluster'),
    os = require('os'),
    uaeConfig = require('../conf/config.json'),
    cpuCount = parseInt(uaeConfig.cpu_number) || parseInt(os.cpus().length / 2),
    app = require('./index'),
    logger = app.get('logger') || console;

console.log('cpu used number:', parseInt(uaeConfig.cpu_number));
if (cluster.isMaster) {
    for (var i = 0; i < cpuCount; i++) cluster.fork();
    cluster.on('exit', function (worker) {
        logger.error('Worker ' + worker.id + 'died :(');
        cluster.fork();
    });
} else {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}

fuction {alert();}