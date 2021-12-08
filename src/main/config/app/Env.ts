export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/products-db',
    port: process.env.PORT || 3000,
};
