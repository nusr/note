# meteor

## 下载

- meteor [windows](https://install.meteor.com/windows)
- https://github.com/meteor/docs/blob/version-NEXT/long-form/alternate-windows-installation.md

## 问题

- **MongoError: Authentication failed.** 

mongodb 连接缺少 **?authSource=admin** 参数

```json
// meteor create --react my-app
{
  "name": "server",
  "private": true,
  "scripts": {
    "dev": "set MONGO_URL=mongodb://<db_username>:<db_password>@<db_server_host>:<db_server_port>/<db_name>?authSource=admin&&meteor --port 9090 --allow-incompatible-update",
    "start": "meteor run",
    "test": "meteor test --once --driver-package meteortesting:mocha",
    "test-app": "TEST_WATCH=1 meteor test --full-app --driver-package meteortesting:mocha",
    "visualize": "meteor --production --extra-packages bundle-visualizer"
  },
  "dependencies": {
    "@babel/runtime": "7.0.0-beta.55",
    "bcrypt": "^3.0.4",
    "meteor-node-stubs": "^0.4.1"
  },
  "meteor": {
    "mainModule": {
      "server": "server/main.js"
    },
    "testModule": "tests/main.js"
  }
}

```