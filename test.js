require('dotenv').config()
const mongoose = require('mongoose')


const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbnsy.mongodb.net/paper-trader?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const traderSchema = new mongoose.Schema({
    _id: String,
    content: String,
    date: Date,
    important: Boolean,
})

  const Trader = mongoose.model('Trader', traderSchema)

  const trader = new Trader({
    _id: "TESsssTID",
    content: 'HTML is Easy2',
    date: new Date(),
    important: true,
  })
  
//   trader.save().then(result => {
//     console.log('trader saved222!')
//     mongoose.connection.close()
//   })

  trader.save().then((result, err) => {
    if(err){
        console.log(err)
    }
    console.log('user saved!')
    mongoose.connection.close()
})
