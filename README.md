Jest test results processor for posting to mattermost.

### Jest reporter

Using results of jest for posting to mattermost

### Installation

---

```shell
  npm install jest-html-reporters --save-dev
```

### Usage

---

Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):

```json
"jest": {
  ...,
  "reporters": [
    "default",
    ["jest-html-reporters", {
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
