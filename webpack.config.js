const path = require('path');

module.exports = {
    mode : 'development',
    entry : {
        customapp : './src/customapp.jsx'
    },
    module : {
        rules : [
            {test :/\.(js|jsx)$/, use : ['babel-loader'] }
        ]
    },
    output : {
        filename : '[name].bundle.js',
        path : path.resolve(__dirname ,'dist')
    }
}