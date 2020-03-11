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
        const reportLink =`[${process.env.CI_JOB_URL || ''}/artifacts/download](${process.env.CI_JOB_URL || ''}/artifacts/download>)` 

        const data = JSON.stringify({
            text: `#### Test results for ${dateStr}\n<!channel> please review tests.\n
| STATUS           | ${status} ${icon}                                      |
|:---------------- |:-------------------------------------------------------|
| Report Link      | ${reportLink}                                          |
| Project Name     | ${process.env.CI_PROJECT_NAME || 'unit test'}          |
| Latest Commit    | ${process.env.CI_COMMIT_TITLE || ''}                   |
| Job ID           | ${process.env.CI_JOB_ID || ''}                         |
| Job Name         | ${process.env.CI_COMMIT_REF_NAME || ''}                |
| Total test cases | ${totalTestCase}                                       |
| Total passed     | ${totalPassed}                                         |
| Total failed     | ${totalFailed}                                         |
| Total error      | ${totalError}                                          |`
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
