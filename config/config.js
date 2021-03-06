//项目域名地址
const url = 'https://sh.szwfy.com.cn';


let ROOT;
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    ROOT = "/api"
} else {
    //生产环境下的地址
    ROOT = url;
}

exports.PROXYROOT = url; //代理指向地址
exports.ROOT = ROOT;