import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAxHI7WyX87NMteyCvlflgY4UDCBn9zMwQ',
  authDomain: 'expenses-project-1e6c6.firebaseapp.com',
  databaseURL: 'https://expenses-project-1e6c6.firebaseio.com',
  projectId: 'expenses-project-1e6c6',
  storageBucket: 'expenses-project-1e6c6.appspot.com',
  messagingSenderId: '72101199043',
  appId: '1:72101199043:web:a9eee9e2b9f6e2e7653676',
  measurementId: 'G-G16MQ9P6TK'
})

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
