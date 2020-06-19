import AliyunOSS from './utils/oss'

const aliyunOSS = new AliyunOSS()

class AliyunossPostObjectWebpackPlugin implements IAliyunossPostObjectWebpack {
  options: IOptions = {
    prefixUrl: '/',
    signatureUrl: ''
  }

  constructor(options: IOptions) {
    this.options = Object.assign(this.options, options)
  }

  apply(compiler) {
    compiler.hooks.done.tap('AliyunossPostObjectWebpackPlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      const outputPath = compiler.options.output.path
      aliyunOSS.uploadFile(outputPath, this.options)
    })
  }
}

module.exports = AliyunossPostObjectWebpackPlugin
