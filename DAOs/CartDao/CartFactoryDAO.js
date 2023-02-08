const CartMongo = require('./CartMongoDAO')

module.exports = class MyConnectionFactory {
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return CartMongo.returnSingleton()
    }
}
