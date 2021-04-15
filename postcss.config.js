// module.exports = {
//   plugins: {
//     autoprefixer: {}
//   }
// }
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

module.exports = ({ file }) => {
    let rootValue
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        rootValue = 37.5
    } else {
        rootValue = 75
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                remUnit: rootValue,
                rootValue: rootValue,
                propList: ['*'],
                minPixelValue: 2
            })
        ]
    }
}
