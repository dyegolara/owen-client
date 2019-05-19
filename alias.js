const path = require('path');

module.exports = {
  api: path.resolve(__dirname, 'src/api/'),
  appStorage: path.resolve(__dirname, 'src/appStorage/'),
  assets: path.resolve(__dirname, 'src/assets/'),
  components: path.resolve(__dirname, 'src/components/'),
  _firebase: path.resolve(__dirname, 'src/firebase.js'),
  shared: path.resolve(__dirname, 'src/components/shared/'),
  utils: path.resolve(__dirname, 'src/utils/'),
  views: path.resolve(__dirname, 'src/views/'),
};
