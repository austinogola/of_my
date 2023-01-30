chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
    if(request.getUnsubbed){
        getUnsubbed()
        // showShesh()
        // subDue()


        // let tabId=sender.tab.id

        // console.log(tabId);

        // chrome.webNavigation.getAllFrames(
        //     {tabId:tabId},
        //     (details)=>{
        //         console.log(details);
        //     }
        //   )
        // loadem(tabId)
        
    }
})

let already=false

    
let auth_id
let app_token
let csrf
let fp
let sess
let st
let ref_src
let cookiesAccepted

const loadem=(tabId)=>{
    
    if(!already){
        chrome.debugger.attach({tabId:tabId},"1.3",(info)=>{
            console.log('Debugger attached');
        })
    
        already=true
    }
    

    // chrome.debugger.sendCommand({tabId:tabId},"Network.dataReceived",(requestId,tt,dL,EDD)=>{
    //     console.log(requestId);
    // })
    console.log(chrome.debugger);

    console.log('Here is working2589');

    chrome.webRequest.onBeforeRequest.addListener(details=>{
        console.log(details);
        console.log('Adding listener');
        if(details.url=='https://onlyfans.com/api2/v2/users/me'){
            let reqId=details.requestId
            console.log(reqId);
                
            chrome.debugger.sendCommand({tabId:tabId},"Network.getResponseBody",({requestId:reqId})=>{
                console.log(reqId);
                console.log('Recorded');
            })
        }
    },{urls:['https://onlyfans.com/https://onlyfans.com/api2/v2/users/me']})

    source={tabId:tabId}


    chrome.debugger.onEvent.addListener((kkk,nn,kk)=>{
        console.log(us);
    })
    chrome.debugger.getTargets(
        (all)=>{
            console.log(all);
        }
      )

    // chrome.debugger.sendCommand({tabId:tabId},'Network.searchInResponseBody',{
    //     requestId:'1009',
    //     // url:"https://onlyfans.com/my/subscriptions/expired?order_field=expire_date",
    //     query:'users'
    //     // options:{includeCredentials:true,disableCache:false}
    // },(info)=>{
    //     console.log(info);
    // })
}

const rule={

}


// chrome.webRequest.onResponseStarted.addListener(details=>{
//     console.log(details);
// },{urls:['https://onlyfans.com/*']})

// const listen=(url)=>{
//     const xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = () => {
//        console.log(xhr);
//       }
// }

// listen('https://onlyfans.com/my/subscriptions/expired?order_field=expire_date/')

// chrome.webRequest.onHeadersReceived.addListener(
//     function(info) {
//         var headers = info.responseHeaders;
//         for (var i=headers.length-1; i>=0; --i) {
//             var header = headers[i].name.toLowerCase();
//             console.log(header);
//             if (header == 'x-frame-options' || header == 'frame-options') {
//                 headers.splice(i, 1); // Remove header
//             }
//         }
//         return {responseHeaders: headers};
//     }, {
//         urls: [
//             '*://*/*', // Pattern to match all http(s) pages
//             // '*://*.example.org/*', // Pattern to match one http(s) site
//         ], 
//         types: [ 'sub_frame' ]
//     }, [
//         'responseHeaders',
//         // Modern Chrome needs 'extraHeaders' to see and change this header,
//         // so the following code evaluates to 'extraHeaders' only in modern Chrome.
//         chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS,
//     ].filter(Boolean)
// )

// chrome.declarativeNetRequest.onRequest.addRules([

// ])

// chrome.devtools.panels.create('Siis','save_tweet-50.png','panel.html',()=>{
//     console.log('Seeet');
// })

// chrome.devtools.network.getHAR(harLog=>{
//     console.log(harLog);
// })

// chrome.devtools.network.onRequestFinished.addListener(
//     function(request) {
//         console.log(request);
//       if (request.response.bodySize > 40*1024) {
//         chrome.devtools.inspectedWindow.eval(
//             'console.log("Large image: " + unescape("' +
//             escape(request.request.url) + '"))');
//       }
//     }
//   );

// chrome.devtools.network

const createFrame=async()=>{

    console.log('Creating frME');
    // var iframe=document.createElement('iframe')
    // iframe.src=chrome.extension.getURL('https://www.google.com/')
    let url='https://onlyfans.com/my/subscriptions/expired?order_field=expire_date/'

    // document.body.appendChild(iframe)
    let chromeCreate=await chrome.windows.create({
        focused:false,
        // type:'popup',
        //popup??
        height:400,
        width:400,
        left:10,
        top:10,
        url:url
      })

    let tabId=chromeCreate.tabs[0].id

    chrome.debugger.attach({tabId:tabId},"1.3",(info)=>{
        console.log('Debugger attached');
    })

    chrome.debugger.sendCommand({tabId:tabId},'Network.loadNetworkResource',{
        frameId :'ausuu99',
        url:"https://onlyfans.com/my/subscriptions/expired?order_field=expire_date",
        options:{includeCredentials:true,disableCache:false}
    },(info)=>{
        console.log(info);
    })
    

    // chrome.debugger.onEvent.addListener((source,method,params)=>{
    //     console.log(source);
    // })


    // chrome.pageCapture.saveAsMHTML(
    //     {tabId: tabId},
    //     (data)=>{
    //         console.log(data);
    //     }
    //   )
}

// createFrame()
// chrome.debugger.getTargets(
//     (info)=>{
//         console.log(info);
//     }
//   )

// "web_accessible_resources": [{
//     "resources": ["iframer.html"],
//     "matches": ["<all_urls>"]
//   }],
//   "devtools_page":"./panel.html",

const getUnsubbed=async()=>{
    let auth
    let pathUrl='https://onlyfans.com/my/subscribers/expired'
    let url='https://onlyfans.com/api2/v2/subscriptions/subscribes?offset=0&type=expired&sort=desc&field=expire_date&limit=1'

    
    chrome.cookies.getAll({name:'auth_id'}, (theCookies) =>{
        auth_id = theCookies[0].value
        })
    
    chrome.cookies.getAll({name:'csrf'}, (theCookies) =>{
        csrf = theCookies[0].value
    })
    
    chrome.cookies.getAll({name:'fp'}, (theCookies) =>{
        fp = theCookies[0].value
    })
    
    chrome.cookies.getAll({name:'sess'}, (theCookies) =>{
        sess = theCookies[0].value
    })
    
    chrome.cookies.getAll({name:'ref_src'}, (theCookies) =>{
        ref_src = theCookies[0].value
    })
    
    chrome.cookies.getAll({name:'cookiesAccepted'}, (theCookies) =>{
        cookiesAccepted = theCookies[0].value
        console.log('Running cookies');
    })

    chrome.cookies.getAll({name:'st'}, (theCookies) =>{
        st = theCookies[0].value
        console.log('Running cookies');
    })
    

    const uRlX=new URL(url)
    let path=uRlX.pathname
    let query=uRlX.search
    path=query?path+query:path

    response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()
    console.log(response);
    let finalTime=Math.round((new Date().getTime())).toString()
    console.log(finalTime);

    let msg = [response["static_param"], finalTime, path, auth_id].join("\n")

    // let hash_object=message.hash('sha1')
    let sha_1_b
    fetch('http://localhost:3000/process',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({message:msg})
    })
    .then(res=>res.json())
    .then(result=>{

        
        sha_1_sign=result.hex

        console.log(sha_1_sign);

        const encoder2=new TextEncoder('ascii')

        let sha_1_b=encoder2.encode(sha_1_sign)

        console.log(sha_1_b);


        let sha1arr=response['checksum_indexes'].map(number=>parseInt(sha_1_b[number]))
        
        // response['checksum_indexes'].forEach(number=>{
        //     console.log();
        // })

        console.log(sha1arr);

        let sum=0
        sha1arr.forEach(element => {
            sum=sum+element   
        });
        
    
        let checksum=sum+response["checksum_constant"]

        console.log(checksum);

        fetchThem(sha_1_sign,checksum)

        // setTimeout(() => {
            
        // }, 500);

        

        

    })

   


    const fetchThem=async(sha_1_sign,checksum)=>{
        console.log('etching Fetchthem');
        let bcTokenSha
        chrome.storage.local.get(['bcTokenSha']).then(data=>{
            console.log(data);
            bcTokenSha=data
            console.log(bcTokenSha);
        })
        // console.log(bcTokenSha);
        let userAgent = navigator.userAgent;

        let sign=response["format"].replace('{}',sha_1_sign)
        checksum=checksum.toString(16)
        console.log(checksum);
        sign=sign.replace('{:x}',checksum)

        headers = {
            "Content-Type":'application/json',
            'accept': 'application/json, text/plain, */*',
            "app-token": response["app_token"],
            "cookie":`csrf=${csrf} fp=${fp} sess=${sess} auth_id=${auth_id} st=${st} cookiesAccepted=${cookiesAccepted} ref_src=`,
            "referer": "https://onlyfans.com/my/subscriptions/expired?order_field=expire_date",
            "time": finalTime,
            'accept-language': 'en-US,en;q=0.9',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            "sign": sign,
            'user-agent':userAgent,
            'user-id': auth_id,
            'x-bc': '210719f2dd71a943ca5a27a119520cb1e8a269f0'
        }

        console.log(headers);

        // let path='https://onlyfans.com/my/subscribers/expired'

        let url=`https://onlyfans.com/api2/v2/subscriptions/subscribes?offset=0&type=expired&sort=desc&field=expire_date&limit=10`

        function doIt(){
            fetch(url,{
                method:'GET',
                headers:headers,
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
            })
        }

        doIt()
        
    }

    // let sha1arr

    
    // for(let i=0;1<response['checksum_indexes'].length;i++){
    //     sha1arr.push(sha_1_b[i])
    // }




    // fetch(url,{
    //     method:'GET',
    //     headers:{
    //         "Content-Type":"application/json",
    //         "sign":"",
    //         "time":finalTime,
    //         "app_token":"",
    //         "x-bc":"",
    //         "user-id":""
    //     }
    // })

}

const showShesh=()=>{
          chrome.cookies.getAll({
            domain:'onlyfans.com'
        },(data)=>{
            console.log(data);
        })  

        // chrome.storage.local.getAll([""])
}

const subDue=()=>{
    
let auth_id
let app_token
let csrf
let fp
let sess
let st
let ref_src
let cookiesAccepted
chrome.cookies.getAll({name:'auth_id'}, (theCookies) =>{
    auth_id = theCookies[0].value
    })

chrome.cookies.getAll({name:'csrf'}, (theCookies) =>{
    csrf = theCookies[0].value
})

chrome.cookies.getAll({name:'fp'}, (theCookies) =>{
    fp = theCookies[0].value
})

chrome.cookies.getAll({name:'sess'}, (theCookies) =>{
    sess = theCookies[0].value
})

chrome.cookies.getAll({name:'ref_src'}, (theCookies) =>{
    ref_src = theCookies[0].value
})

chrome.cookies.getAll({name:'cookiesAccepted'}, (theCookies) =>{
    cookiesAccepted = theCookies[0].value
    console.log('Running cookies');
})

chrome.cookies.getAll({name:'st'}, (theCookies) =>{
    st = theCookies[0].value

    let cookies={auth_id,csrf,fp,sess,ref_src,cookiesAccepted,st}
    console.log(cookies);

    fetch('http://localhost:5000/getSubs',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(cookies)

    })
    .then(res=>{
        console.log(res);
    })
})

     

   
}