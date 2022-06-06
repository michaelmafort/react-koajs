const app = require('./app');
const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {dbName: 'development'});
    app.listen(3000);
    console.log('Server started!');
};

main().catch(err => console.log(err));