// initialise firebase admin
const firebaseAdmin = require('firebase-admin')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

!firebaseAdmin.apps.length && initializeApp()

// initialise firestore
exports.firestore = getFirestore()

module.exports = firebaseAdmin
