import devConfig from './dev'
import testConfig from './test'
import preConfig from './pre'
import proConfig from './pro'
let config={};
// console.log('===',process.env)
if(process.env.MODE === 'dev'){
  config = devConfig
}else if(process.env.MODE === 'test'){
  config = testConfig
}else if(process.env.MODE === 'pre'){
  config = preConfig
}else {
  config = proConfig
}

export default config
