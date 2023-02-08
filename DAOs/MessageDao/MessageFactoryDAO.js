const MessageMongo = require('./MessageMongoDAO')

module.exports = class MyConnectionFactory {
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return MessageMongo.returnSingleton()
    }
}
