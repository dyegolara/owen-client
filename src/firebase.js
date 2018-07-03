import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB2f1C1wqfYfy_jtukGN6ntFQPdGQxfUJg',
  authDomain: 'owen-client.firebaseapp.com',
  databaseURL: 'https://owen-client.firebaseio.com',
  projectId: 'owen-client',
  storageBucket: 'owen-client.appspot.com',
  messagingSenderId: '620408412764'
}
firebase.initializeApp(config)

export const database = firebase.database()

export default firebase
