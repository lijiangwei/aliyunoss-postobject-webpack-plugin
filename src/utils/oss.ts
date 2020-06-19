const glob = require('glob')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs-extra')
const colors = require('colors')

class AliyunOSS implements IAliyunOSS {
  async uploadFile(outputPath: string, options: IOptions) {
    let ossInfo: ISignature = await this.getSignature(options.signatureUrl)
    if (ossInfo) {
      let dir = path.join(outputPath, '/**/*')
      let rootPath = process.cwd()
      glob.sync(dir, { nodir: true }).forEach((filePath) => {
        let relativePath = path.relative(rootPath, filePath)
        let ossFilePath = path.join(ossInfo.dir, options.prefixUrl, relativePath)
        this.uploadFileToOss(relativePath, ossFilePath, ossInfo)
      })
    }
  }

  async uploadFileToOss(fileName: string, ossFileName, ossInfo: ISignature) {
    let form = new FormData()
    form.append('name', fileName)
    form.append('key', ossFileName)
    form.append('success_action_status', 200)
    form.append('OSSAccessKeyId', ossInfo.accessid)
    form.append('policy', ossInfo.policy)
    form.append('Signature', ossInfo.signature)
    form.append('file', fs.createReadStream(fileName))
    const res = await axios({
      method: 'post',
      url: ossInfo.host,
      data: form,
      headers: form.getHeaders()
    })
    if (res.status === 200) {
      console.log('upload ' + colors.blue(ossFileName) + ' to aliyunoss' + colors.green(' success'))
    } else {
      console.log('upload' + colors.blue(ossFileName) + ' to aliyunoss' + colors.red(' failed'))
    }
  }

  getSignature(url: string) {
    return axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            return res.data.data
          } else {
            throw new Error(res.data.msg)
          }
        } else {
          throw new Error(res.statusText)
        }
      })
      .catch((err) => {
        console.error(colors.red(err))
      })
  }
}

export default AliyunOSS
