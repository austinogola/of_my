chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
    if(request.getUnsubbed){
        // getUnsubbed()
        initiate(sender)
        console.log('request received');
        
    }
})

let allCookies={}
let userAgent
let others={}



const initiate=async(sender)=>{
    console.log('Received initition from',sender.id);
    // fetchEx()
    // fetchSubs()
}



const fetchSubs=async()=>{
    console.log('Running fetchsubs');

    let u = 'https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=20&offset=0&sort=desc&field=last_activity&type=expired'

    // let headers=await createHeaders(allCookies,others,
    //     u,"https://onlyfans.com/my/subscribers/expired")

    // let headers2=await createHeaders(allCookies,others,
    //     u,"https://onlyfans.com/my/subscribers/expired")

    let alU='https://onlyfans.com/api2/v2/subscriptions/count/all'

    let headers2=await createHeaders(allCookies,others,
        alU,"https://onlyfans.com/my/subscribers/expired")
    
    console.log('About to run fetchsubs');

    fetch(
        alU,
        {headers:headers2}
    )
    .then(async res=>{
        if(res.status!==200){
            eRROR:"PLEASE REFRESH PAGE"
            console.log('Its not correct,rerunning');
            console.log(res.status);
            fetchSubs()
        }
        else{
            console.log('Gotten right');
            let response=await res.json()
            const expiredCount=response.subscribers.expired
            // getExpired(expiredCount)
            let re = await chrome.tabs.sendMessage(tabId, {
                make_frame: true
            });
            // fetchEx()
            console.log(response,expiredCount);
        }
    })

    // fetchEx()

    // let result=await res.json()
    // console.log(result);

}

// const getExpired=async (count)=>{
//     let url = `https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=20&offset=${count}&sort=desc&field=last_activity&type=expired`
//     let headers = await createHeaders(allCookies,others,url, 'https://onlyfans.com/my/subscribers/expired')

//     fetch(
//         url,
//         {headers:headers}
//     )
//     .then(res=>res.json())
//     .then(result=>{
//         console.log('Only expired');
//         console.log(result);
//     })
// }

const getExpired=async(count)=>{
    console.log('Running get expird');
    // let range = count => [...Array(n).keys()]
    // for (let i = 0; i < count; i+=10) {
    //     let response=await getSubscribers(0)
    //     console.log(response);
    // }
    // let ref='https://onlyfans.com/'
    // let ul='https://onlyfans.com/api2/v2/subscriptions/subscribers/recent-expired?skip_users=all'

    // let ref='https://onlyfans.com/my/subscribers/expired'
    let ul='https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=20&offset=0&sort=desc&field=last_activity&type=expired'
    // let ul2='https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=20&offset=10&sort=desc&field=last_activity&type=expired'

    let headers=await createHeaders(allCookies,others,ul,'https://onlyfans.com/my/subscribers/expired')

    fetch(ul,{headers:headers})
    .then(res=>{
        if(res.status!==200){
            console.log('2nd Incorrect,rerunning');
            console.log(res.status);
            // getExpired(1)
        }
    })
}



const getSubscribers=async offset=>{
    let u = `https://onlyfans.com/api2/v2/subscriptions/subscribes?limit=10&offset=${offset}&sort=desc&field=last_activity&type=expired`
    let heads = await createHeaders(allCookies,others,u, 'https://onlyfans.com/my/subscribers')

    fetch(u,{headers:heads})
    .then(async res=>{
        if(res.status!==200){
            console.log('Second not correct,rerunning');
            console.log(res);
            getSubscribers(10)
        }
        else{
            return res
        }
    })
}



const fetchEx=async()=>{
    let nn='https://onlyfans.com/api2/v2/subscriptions/count/all'
    let ppl='https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=10&offset=0&sort=desc&field=last_activity&type=all'
    let headers=await createHeaders(allCookies,others,nn,"https://onlyfans.com/my/subscribers/expired")
    console.log(headers);

    const res=await(fetch(
        "https://onlyfans.com/my/subscribers/expired",
        {headers:headers}
        ))

    console.log('Fetch 2',res);
}

async function createHeaders(cookieObj,othObj,url,ref) {
    console.log(cookieObj,othObj);
    let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()


    let uR=new URL(url)

    let path=uR.pathname
    let query=uR.query
    console.log(query);

    path=query?path+query:path


    const time = Date.now().toString();
    const hash = await sha1([response['static_param'], time, path, cookieObj['auth_id']].join('\n'));

    let fmt=response['format'].split(':')
    let prefix=fmt[0]
    let suffix=fmt[fmt.length-1]

    const checksum = response['checksum_indexes'].reduce((total, current) => total += hash[current].charCodeAt(0), 0) + response['checksum_constant'];

    const sign = [prefix, hash, checksum.toString(16), suffix].join(':');

    let cookieString=''

    delete cookieObj['Path']

    for ([key, value] of Object.entries(cookieObj)){
        cookieString+=`${key.toString()}=${value}; `

      }

    let allHeaders= {
        accept: 'application/json, text/plain, */*',
        'app-token': response['app_token'],
        cookie: cookieString,
        referer:ref?ref:url,
        sign: sign,
        time: time,
        'user-id': cookieObj['auth_id'],
        'user-agent': othObj['userAgent'],
        'x-bc': othObj['xbc']
    };

    return allHeaders
}

const sha1=async(data)=>{
    const dataBuffer=new TextEncoder().encode(data)
    const hashBuffer=await crypto.subtle.digest('SHA-1',dataBuffer)

    // To hex string
    const hashArray=Array.from(new Uint8Array(hashBuffer))
    const hex=hashArray.map(val=>val.toString(16).padStart(2,'0')).join('')

    return hex

}

async function callAPI(path, rules) {
    rules = {
        ...rules,
        ...{
            'user-id': 'get from browser',
            'x-bc': 'get from browser',
            'cookie': 'get from browser',
            'user-agent': 'get from browser'
        }
    };

    const headers = createHeaders(path, rules);
    fetch(
        `https://onlyfans.com${path}`,
        { headers: headers }
    )
    .then(res=>res.json)
    .then(result=>{
        console.log(result);
    })
    
    return await response.json();
}

const subScribeToAll=(arr)=>{
    console.log('Subscribing to all users');

    arr.forEach(user=>{
        let subU = `https://onlyfans.com/api2/v2/users/${user.id}/subscribe`
    })
}






let already=false
let tabId=''

chrome.webNavigation.onBeforeNavigate.addListener(function(all) {
    // tabId=all.tabId
    // console.log(tabId);
    // let frameId=all.frameId
    console.log(all);
    console.log('Time to wke up');


    // chrome.debugger.attach({tabId:tabId},'1.3',()=>{
    //     chrome.debugger.sendCommand(
    //         {tabId:tabId},
    //         'Network.getResponseBody',
    //         {frameId:frameId.toString(),url:'https://onlyfans.com/my/subscribers/active'},
    //     (men)=>{
    //         console.log(men);
    //     }
    //         )
    // })
    console.log("Starting now!")
}, {
    url: [{
        hostContains: "onlyfans.com"
    }]
})
let allre=false

let xbc,sign,time,app_token

const updateExpiredCount=(arr)=>{
    console.log('Received arr',arr.length);
    // code to update ui (arr.length)
    if(arr.length!=0){
        chrome.tabs.query({url:'https://onlyfans.com/*'},(relTabs)=>{
            console.log(relTabs);
            relTabs.forEach(tab=>{
                chrome.tabs.sendMessage(tab.id,{updateCount:arr.length})
                chrome.tabs.sendMessage(tab.id,{stopScan:true})
            })
        })
    }else{
        chrome.tabs.query({url:'https://onlyfans.com/*'},(relTabs)=>{
            console.log(relTabs);
            relTabs.forEach(tab=>{
            chrome.tabs.sendMessage(tab.id,{stopScan:true})
            })
        })
    }

    // arr.forEach(user=>{
    //     subScribeToUser(user.id,user.name)
    // })
    // followExpired(arr)
}

// const subScribeToUser=(id,name)=>{

// }

const followExpired=async (arr)=>{
    arr.forEach(async user=>{
        if(user.subscribePrice!==0){
            console.log('This account is not free',user.username);
        }
        else{
            if(user.subscribedBy){
                console.log('Already following this user',user.username);
            }else{
                subScribeToSpecific(user.id)
                await sleep(650)
            }
        }


    })
}


const subScribeToSpecific=async id=>{
    let ur=`https://onlyfans.com/api2/v2/users/${id}/subscribe'`
    let heeders= await createHeaders(allCookies,others,ur,'https://onlyfans.com/my/subscribers/expired')

    fetch(ur,{headers:heeders})
    .then(res=>{
        if(res.status!=200){
            console.log(res);
            sleep(500)
            subScribeToSpecific(id)
        }else{
            console.log('Followed account with id',id);
        }
    })
}

const sleep=(ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let gotCookies=false

keepDuplicating=true

const duplicateRequest=(url,app_token,sign,time,allCookies,xbc)=>{
        fetch(url, {
            method: "GET",
            headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "app-token": app_token,
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sign": sign,
            "time": time,
            "user-id": allCookies.auth_id,
            "x-bc": xbc,
            
      },
      "referrer": "https://onlyfans.com/my/subscribers/expired/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "mode": "cors",
      "credentials": "include"
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.length==0){
            updateExpiredCount(result)
            console.log("Austine",result);
            allre=false
        }
        else if(result.length>=10){
            updateExpiredCount(result)
        }
        else{
            allre=true
            console.log("Austine",result);
            updateExpiredCount(result)
        }

        
        // subScribeToAll(result)
    })
    }

chrome.webRequest.onBeforeSendHeaders.addListener(async n => {
    if(n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc")){
        let fullpatch=new URL(n.url)
        let query=fullpatch.search
        console.log(query);
        if(query.includes('expired')){
            console.log('Just received valid request');
            xbc = n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc").value
            app_token = n.requestHeaders.find(u => u.name.toLowerCase() === "app-token").value
            sign=n.requestHeaders.find(u => u.name.toLowerCase() === "sign").value
            time=n.requestHeaders.find(u => u.name.toLowerCase() === "time").value

            others["xbc"]=xbc
            others["userAgent"]=navigator.userAgent

            if(n.initiator.includes('chrome-extension')){

            }
            else{
                if(gotCookies){
                    duplicateRequest(n.url,app_token,sign,time,allCookies,xbc)
                }else{
                    chrome.cookies.getAll({domain:'onlyfans.com'},all=>{
                        console.log('Resetting cookies');
                        gotCookies=true
        
                        all.forEach(cookie=>{
                            allCookies[cookie.name]=cookie.value
                        })
                        // fetchSubs()
                        duplicateRequest(n.url,app_token,sign,time,allCookies,xbc)
                    })
                }  
            }

           
                 
        
        }
    }


    
    
    

    // execute(app_token,sign,time,allCookies.auth_id,xbc)

    // chrome.cookies.getAll({domain:'onlyfans.com'},all=>{
    //     console.log('Getting chrome cookies');
    //     all.forEach(cookie=>{
    //         allCookies[cookie.name]=cookie.value
    //     })
        

        // if(!allre){
        //     allre=true
        //     let burl='https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=10&offset=0&sort=desc&field=last_activity&type=expired'
        //     fetch(n.url, {
        //         method: "GET",
        //         headers: {
        //         "accept": "application/json, text/plain, */*",
        //         "accept-language": "en-US,en;q=0.9",
        //         "app-token": app_token,
        //         "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "empty",
        //         "sec-fetch-mode": "cors",
        //         "sec-fetch-site": "same-origin",
        //         "sign": sign,
        //         "time": time,
        //         "user-id": allCookies.auth_id,
        //         "x-bc": xbc,
                
        //   },
        //   "referrer": "https://onlyfans.com/",
        //   "referrerPolicy": "strict-origin-when-cross-origin",
        //   "mode": "cors",
        //   "credentials": "include"
        // })
        // .then(res=>res.json())
        // .then(result=>{
        //     console.log("Austine",result);
        //     // subScribeToAll(result)
        // })

        // // let response = await chrome.tabs.sendMessage(tabId, {
        // //     run: codee
        // //   });

        // }
        
    //     let ur1='https://onlyfans.com/api2/v2/subscriptions/count/all*'
    //     let url3='https://onlyfans.com/api2/v2/subscriptions/subscribers/recent-expired?skip_users=all'//Subs.Ids
    //     let url4='https://onlyfans.com/api2/v2/users/*'
    //     let ur2='https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=10&offset=0&sort=desc&field=last_activity&type=expired'
    // })

}, {
    urls: ['https://onlyfans.com/api2/v2/subscriptions/subscribers*']
}, ["requestHeaders"]
);


const execute=(app_token,sign,time,auth_id,xbc)=>{
    console.log((app_token,sign,time,auth_id,xbc));
    function justFetch() {
        fetch('https://onlyfans.com/api2/v2/subscriptions/count/all',{
            method: "GET",
            headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "app-token": app_token,
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sign": sign,
            "time": time,
            "user-id": auth_id,
            "x-bc": xbc,
            
            },
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
        })
    }

    chrome.scripting.executeScript(
        {
            target:{tabId:tabId},
            func:justFetch
        }
    )
    .then(()=>{
        console.log('Script executed');
    })
}


let auth_id
let csrf
let fp
let sess
let st
let ref_src
let cookiesAccepted

const makeNewandTrack=async()=>{
    url='https://onlyfans.com/my/subscribers/expired'
      

      let chromeCreate=await chrome.windows.create({
        focused:true,
        type:'popup',
        //popup??
        height:650,
        width:500,
        left:60,
        top:70,
        url:url
      })

      frameTabId=chromeCreate.tabs[0].id

      chrome.debugger.attach(
        {tabId: frameTabId},
        '1.3',
        ()=>{
            console.log('Debugger Attached');
            console.log('NetWORKING');
            // chrome.debugger.sendCommand(
            //     {tabId: frameTabId},
            //     "Network.loadNetworkResource",
            //     {urls:['https://onlyfans.com/my/subscribers/expired']},
            //     (cookies)=>{
            //         console.log(cookies);
            //     }
            //   )
            chrome.debugger.sendCommand(
                {tabId: frameTabId},
                "Network.loadNetworkResource",
                {url:'https://onlyfans.com/my/subscribers/expired'},
                {disableCache:false,
                includeCredentials:true },
                (e)=>{
                    console.log(e);
                }
              )
        }
      )
}
const usubbed2=async()=>{
    let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()
    const time = Date.now().toString();
}

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



// const HEADERS_TO_STRIP_LOWERCASE = [
//     'x-frame-options',
// ];

// chrome.webRequest.onHeadersReceived.addListener(
//     details => ({
//         responseHeaders: details.responseHeaders.filter(header =>
//             !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase()))
//     }), {
//         urls: ['<all_urls>']
//     },
//     ['responseHeaders', 'extraHeaders']);