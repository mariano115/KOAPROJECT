const UserMongo = require('./UserMongoDAO')

module.exports = class MyConnectionFactory {
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return UserMongo.returnSingleton()
    }
}
