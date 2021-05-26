const functions = require("firebase-functions");
const admin = require('firebase-admin');
const mongoose = require('mongoose')

const traderSchema = new mongoose.Schema({
    _id: String,
    email: String,
    dateCreated: Date,
})

const Trader = mongoose.model('Trader', traderSchema)


let serviceAccount = require("./serviceAccountKey.json");
require('firebase-functions/lib/logger/compat') //Makes logs easier to read in firebase console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.createUserDoc = functions.auth.user().onCreate(async (user) => {
    console.log('functions.config().mongo')
    console.log(functions.config().mongo['mongo-password'])
    console.log(functions.config().mongo['mongo-user'])

    try {
        const url = `mongodb+srv://${functions.config().mongo['mongo-user']}:${functions.config().mongo['mongo-password']}@cluster0.qbnsy.mongodb.net/paper-trader?retryWrites=true&w=majority`
        console.log(url)
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    } catch (err) {
        console.log(err)
    }

    const trader = new Trader({
        _id: user.uid,
        email: user.email,
        dateCreated: new Date(),
    })

    trader.save().then((result, err) => {
        if (err) {
            console.log(err)
        }
        console.log('user saved!')
        mongoose.connection.close()
    })

    // const db = admin.firestore()
    // let userData = {
    //     email: user.email
    // }
    // console.log(user)
    // const res = await db.collection('users').doc(user.uid).set(userData)
});
