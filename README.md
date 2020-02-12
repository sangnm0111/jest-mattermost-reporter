### Jest reporter

Jest test results processor for posting to mattermost.

### Installation

---

```shell
  npm install jest-mattermost-reporter --save-dev
```

### Usage

---

Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):

```json
"jest": {
  ...,
  "reporters": [
    "default",
    ["jest-mattermost-reporter", {
      "url": "http://{your-mattermost-site}/hooks/xxx-generatedkey-xxx",
    }]
  ],
  ...
}

```

### Available Options

The options below are specific to the reporter.

| Option Name | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| `url`       | string | true     | ''          | specify the base path |
