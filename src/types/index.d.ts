declare interface IOptions {
  signatureUrl: string
  prefixUrl: string
}

declare interface IAliyunossPostObjectWebpack {
  options: IOptions
  apply(compiler: any): void
}

declare interface IAliyunOSS {
  uploadFile(outputPath: string, options: IOptions): void
  getSignature(url: string)
}

declare interface ISignature {
  policy: string
  signature: string
  expire: string
  dir?: string
  accessid: string
  host: string
  bucket?: string
}
