var Sntp = require('sntp');

// All options are optional

var options = {
    // host: 'nist1-sj.ustiming.org',  // Defaults to pool.ntp.org
    port: 123,                      // Defaults to 123 (NTP)
    resolveReference: true,         // Default to false (not resolving)
    timeout: 1000                   // Defaults to zero (no timeout)
};

// Request server time

export const exec = async function () {

    try {
        const time = await Sntp.time(options);
        console.log('Local clock is off by: ' + time.t + ' milliseconds');
        process.exit(0);
    }
    catch (err) {
        console.log('Failed: ' + err.message);
        process.exit(1);
    }
};
