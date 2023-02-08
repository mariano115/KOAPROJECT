const ProductMongo = require('./ProductMongoDAO')

module.exports = class MyConnectionFactory {
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return ProductMongo.returnSingleton()
    }
}
