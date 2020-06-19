##aliyunoss-postobject-webpack-plugin
webpack 的插件，使用 PostObject 方式把生成的文件上传到阿里 oss
Installation

---

```shell
# npm
$ npm i aliyunoss-postobject-webpack-plugin -D
# yarn
yarn add aliyunoss-postobject-webpack-plugin -D
```

## Configuration

The plugin allowed values are as follows:

- `signatureUrl`: 获取 signature、policy 的接口地址
- `prefixUrl`: 上传到 oss 文件路径前缀，默认`/`
