const dotenv = require('dotenv')

function environment(){
    dotenv.config({path:".env-test"});
}

module.exports=environment;

