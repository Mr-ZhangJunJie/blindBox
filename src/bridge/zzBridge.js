export default new class renderClass {
    render(option) {
        // this.WaitZEPETO(this._Render.call())
        return new Promise((resolve, reject) => {
            if (window.hasOwnProperty("ZEPETO") == false) {
                console.log('ZEPETOFalse')
                document.addEventListener("ZepetoLoaded", () => {
                    this._Render(option, resolve, reject);
                });
            } else {
                console.log('ZEPETOTrue')
                this._Render(option, resolve, reject);
            }
        })
    }

    _Render(message, resolve, reject) {

        // TODO : 제페토 인앱일 경우에는 앱에 있는걸 사용하도록..
        if (window.hasOwnProperty("ZEPETO")) {
            // message.characterHashCodes[0] = 'VLUFUV';
            // message.characterHashCodes[0] = 'OBWH8T';
            // message.characterHashCodes[0] = 'L8NKZB';
            ZEPETO.invoke("Render", message, function (result) {
                console.log('----',result)
                if (!result.isSuccess) {
                    reject(new Error('渲染失败'));
                    return;
                }
                // base64转blob

                // var bstr = window.atob(result.result);
                // var n = bstr.length, u8arr = new Uint8Array(n);
                // while (n--) u8arr[n] = bstr.charCodeAt(n);
                // var blob = new Blob([u8arr], {type: "image/png"});
                // var url = URL.createObjectURL(blob);

                // base64
                var url = 'data:image/png;base64,'+result.result;
                resolve(url);
            });
        }
    }
}

// 使用utf-8字符集解析base64字符串
// function atou(str) {
//     return decodeURIComponent(window.atob(str));
// }

// function invoke (func, parameters, callback) {
//     var invokeURL = 'zepeto://webview?f=' + func;
//     if (parameters) {
//         parameters = encodeURIComponent(JSON.stringify(parameters));
//         invokeURL += '&p=' + parameters;
//     }
//     var guid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
//     _callbacks[guid] = callback;
//     invokeURL += '&cb=' + guid;
//
//     document.location = invokeURL;
// }


// export default class zzBridge{
//     //
//     static Render(message, callback, error) {
//         if (window.hasOwnProperty("ZEPETO")) {
//             ZEPETO.invoke("Render", message, function (result) {
//                 if (!result.isSuccess) {
//                     error();
//                     return;
//                 }
//                 var bstr = window.atob(result.result);
//                 let n = bstr.length
//                 let u8arr = new Uint8Array(n)
//                 while (n--) u8arr[n] = bstr.charCodeAt(n);
//                 var blob = new Blob([u8arr], { type: "image/png" });
//
//                 var url = URL.createObjectURL(blob);
//                 callback(url);
//             });
//         }
//     }
//     static WaitZEPETO(callback) {
//         if (window.hasOwnProperty("ZEPETO") == false) {
//             document.addEventListener("ZepetoLoaded", callback);
//         } else {
//             callback();
//         }
//     }
// }


// export function Render(message, callback, error) {
//
//     if (window.hasOwnProperty("ZEPETO")) {
//         console.log('nihao')
//         ZEPETO.invoke("Render", message, function
//             (result) {
//             console.log('result',result)
//             if (!result.isSuccess) {
//                 error();
//                 return;
//             }
//            var url = 'data:image/png;base64,'+result.result;
//            callback(url);
//             // var bstr = window.atob(result.result);
//             // let n = bstr.length
//             // let u8arr = new Uint8Array(n)
//             // while (n--) u8arr[n] = bstr.charCodeAt(n);
//             // var blob = new Blob([u8arr], { type: "image/png" });
//             //
//             // var url = URL.createObjectURL(blob);
//             // callback(url);
//
//         });
//     }
// }

// export function WaitZEPETO(callback) {
//     if (window.hasOwnProperty("ZEPETO") == false) {
//         document.addEventListener("ZepetoLoaded", callback);
//     } else {
//         callback();
//     }
// }

/*
 获取用户动作形象
type: 目前固定photobooth
width、height 宽高
characterHashCodes: 崽崽Id
renderData：模板id
2GUPPPVatyMAia8AogyiOm       逢考必过崽
4qJxCsI8tm2qegEAbfowMl          金榜题名崽
4kJBi54behSBty8yfqoxBU            超常发挥崽
1YMo0aqH0fd1kcMnxa3bZm       一路开挂崽
6WumctNIOof7NfW9YZndjR        考神附体崽
2LHUzQklfz6er97P5b2ZZS          绝版幸运崽
3Y28J7
 */

// export
// WaitZEPETO(function () {
//     Render({
//         "type": "photobooth",
//         "renderData": "6DNT99uNuTqTjn6c0r9N6i",
//         // "renderData": "2LHUzQklfz6er97P5b2ZZS",//模板id
//         "width": 520,
//         "height": 520,
//         "bones": [],
//         // 崽崽id，可多人
//         "characterHashCodes": [
//             // "3Y28J7"
//             "MYKURU"
//         ]
//     }, url => {
//         console.log('url',url)
//         var img = new Image();
//         img.style.cssText = 'width:50%;border:1px red solid'
//         img.src = url;
//         console.log('zzBridge.Render ready');
//         document.body.appendChild(img);
//     }, error => {
//         alert(error);
//     })
//
// });


