import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin'

admin.initializeApp()

export const getFeed = functions.https.onCall(async (req, res) => {
    const docs = await admin.firestore().collection('post').limit(10).get()
    return docs.docs.map( doc => doc.data())
})
