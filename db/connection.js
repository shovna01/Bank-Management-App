const mongoose = require('mongoose');

const DB_url = process.env.DATABASE;
mongoose.connect(DB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true,
    //useFindAndModify:false
}).then(() => {
    console.log('DB is Connected');
}).catch((err) => console.log(err));