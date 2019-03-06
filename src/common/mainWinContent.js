import path from 'path'
import url from 'url'

export default inDev => {
  return inDev
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
}
