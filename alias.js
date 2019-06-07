const path = require('path');

module.exports = {
  api: path.resolve(__dirname, 'src/api/'),
  appStorage: path.resolve(__dirname, 'src/appStorage/'),
  assets: path.resolve(__dirname, 'src/assets/'),
  components: path.resolve(__dirname, 'src/components/'),
  hooks: path.resolve(__dirname, 'src/hooks/'),
  _firebase: path.resolve(__dirname, 'src/firebase.js'),
  styles: path.resolve(__dirname, 'src/styles/'),
  utils: path.resolve(__dirname, 'src/utils/'),
  views: path.resolve(__dirname, 'src/views/'),
};
