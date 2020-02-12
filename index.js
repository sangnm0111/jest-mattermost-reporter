const os = require("os");
const https = require("https");

// my-custom-reporter.js
class MyCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunComplete(contexts, results) {
        const { url } = this._options;
        const status = results.numFailedTests === 0 ? "PASSED" : "FAILED";
        const icon = results.numFailedTests === 0 ? ":white_check_mark:" : ":x:";
        const totalTestCase = results.numTotalTests;
        const totalPassed = results.numPassedTests;
        const totalFailed = results.numFailedTests;
        const totalError = results.numRuntimeErrorTestSuites;
        const dateStr = new Date(results.startTime).toLocaleString();

        const data = JSON.stringify({
            text: `#### Test results for ${dateStr}\n<!channel> please review failed tests.\n
| STATUS           | ${status} ${icon}                 |
|:---------------- |:----------------------------------|
| Host name        | ${os.hostname()}                  |
| Total test cases | ${totalTestCase}                  |
| Total passed     | ${totalPassed}                    |
| Total failed     | ${totalFailed}                    |
| Total error      | ${totalError}                   |`
        });
        const req = https.request(
            url,
            {
                origin: "SAMEORIGIN",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": data.length
                }
            },
            res => {
                console.log(`statusCode: ${res.statusCode}`);

                res.on("data", d => {
                    process.stdout.write(d);
                });
            }
        );
        req.on("error", error => {
            console.error(error);
        });
        req.write(data);
        req.end();
    }
}

module.exports = MyCustomReporter;
