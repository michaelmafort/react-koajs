const app = require('./app');

const main = async () => {
    app.listen(3000);
    console.log('Server started!');
};

main().catch(err => console.log(err));