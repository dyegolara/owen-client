/*
* Persistir datos de la aplicación el almacenamiento local
*/

// Librerías
import store from 'store';

// Key names
const EMAIL = 'email';
const USER_NAME = 'userName';
const USER_ID = 'userId';

// Entradas que se tendrán en cuenta en el almacenamiento
const KEYS = [USER_NAME, USER_ID];

class AppStorage {
  // Inicializa el almacenamiento: si no hay algun dato hace una limpieza general
  init() {
    if (!KEYS.every(this.getValue)) KEYS.forEach(this.createKey);
  }

  // Crea una llave en el almacenamiento y le asigna un string vacío como valor
  createKey(key) {
    store.set(key, '');
  }

  // Limpia el almacenamiento local
  clearAll() {
    KEYS.forEach(this.removeKey);
  }

  // Borra una entrada del almacenamiento
  removeKey(key) {
    store.remove(key);
  }

  // Actualiza datos de almacenamiento en keyName
  insertIntoKey(key, value) {
    store.set(key, value);
  }

  // Guarda userId en almacenamiento
  setUserId(userId) {
    this.insertIntoKey(USER_ID, userId);
  }

  // Guarda nombre del usuario en el almacenamiento
  setUserName(userName) {
    this.insertIntoKey(USER_NAME, userName);
  }

  // Guarda email del usuario en el almacenamiento
  setEmail(email) {
    this.insertIntoKey(EMAIL, email);
  }

  // Regresa todos los datos de una key del almacenamiento
  getValue(keyName) {
    return store.get(keyName);
  }

  // Regresa valor de un atributo dentro de una key en almacenamiento
  getProperty(keyName, valueName) {
    return store.get(keyName)[valueName];
  }

  // Regresa el id del usuario
  getUserId() {
    return this.getValue(USER_ID);
  }

  // Regresa el nombre del usuario
  getUserName() {
    return this.getValue(USER_NAME);
  }

  // Regresa el email del usuario
  getEmail() {
    return this.getValue(EMAIL);
  }

  // Revisar si hay sesión, regresa boolean
  hasSession() {
    this.init();
    return !!this.getUserId();
  }
}

export default new AppStorage();
