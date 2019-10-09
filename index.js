const dotenv = require('dotenv');
const { config } = require('./config');

dotenv.config({ path:config.hasOwnProperty(process.env.NODE_ENV)? config[process.env.NODE_ENV]:false});

const app = require('./app');

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log(`Express server listening on port running in ${app.get('env')}`);
    console.log(`Information on all available routes are at http://localhost:${app.get('port')}/`);
    }
);