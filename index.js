const app = require('./src/app.js');

const pool = require('./src/pool');

pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'postgres',
    password: 'root'
})
    .then(()=>{
        app().listen(3005,()=>{
            console.log('Server running on port 3005');
        });
    })
    .catch((err)=>
        console.log(err));

