const path = require('path')

module.exports = {
  api: path.resolve(__dirname, 'src/api/'),
  appStorage: path.resolve(__dirname, 'src/appStorage/'),
  assets: path.resolve(__dirname, 'src/assets/'),
  components: path.resolve(__dirname, 'src/components/'),
  shared: path.resolve(__dirname, 'src/components/shared/'),
  utils: path.resolve(__dirname, 'src/utils/')
}
