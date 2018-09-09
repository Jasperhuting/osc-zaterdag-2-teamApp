import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseCOnfig'
const firebaseApp = firebase.initializeApp (firebaseConfig)
const firestore = firebaseApp.firestore({ timestampsInSnapshots: true})
export default firestore