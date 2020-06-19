"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oss_1 = require("./utils/oss");
const aliyunOSS = new oss_1.default();
class AliyunossPostObjectWebpackPlugin {
    constructor(options) {
        this.options = {
            prefixUrl: '/',
            signatureUrl: ''
        };
        this.options = Object.assign(this.options, options);
    }
    apply(compiler) {
        compiler.hooks.done.tap('AliyunossPostObjectWebpackPlugin', (stats) => {
            const outputPath = compiler.options.output.path;
            aliyunOSS.uploadFile(outputPath, this.options);
        });
    }
}
module.exports = AliyunossPostObjectWebpackPlugin;
