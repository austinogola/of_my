chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
    if(request.beginScan){
        //Code for scanning in beginScan()
        relTab=sender.tab.id
        beginScan()
        
    }
    if(request.update){
        console.log(request.update);
    }
    if(request.iframe){
        console.log('Set Iframe');
    }

    if(request.startFollowing){
        //Code for initiating follow in beginFollowing
        beginFollow()
    }

    if(request.listen){
        console.log('Received listenning');
        listening=true
    }

    if(request.fetchRelevants){
        let  rules= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()

        sendResponse(
            {
                auth_id:user_id,
                xbc:xbc,
                rule:rules

            }
        )
    }
})

let listening=true

chrome.runtime.onConnect.addListener((port)=>{
    console.log('Conection made',port)
    port.onMessage.addListener(async(message,port)=>{
        if(message.getDetails){
            console.log('Received get details request');
        }
    })
}
    
  )

let relTab=''
const beginScan=async()=>{
    console.log('Beginning Scan...');
    const count=await fetchExpired()
    
}

const beginFollow=()=>{
    console.log('Beginning Following...');
}

const getExpiredIds=async (count)=>{
    for(let offset=0;offset<count;offset+=20){
        const result=await getSubscribers(offset)

        console.log('Subscriber ids',result)
    }
}

const getSubscribers=async(num)=>{
    let url = `https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=10&offset=${num}&sort=desc&field=last_activity&type=expired`
    let headers = await createHeaders(url, 'https://onlyfans.com/my/subscribers/expired')

    fetch(url,{
        method:'GET',
        headers:headers
    })
    .then(async res=>{
        if(res.status==200){
            const result=await res.json()
            console.log('This is the result')
            return result
        }
        else{
            console.log('Failed to get subscriber ids.Retrying...')
            getSubscribers(num)
        }
    })
}


async function createHeaders(url,ref) {
    let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()


    let uR=new URL(url)

    let path=uR.pathname
    let query=uR.query
    // console.log(query);

    path=query?path+query:path


    const time = Date.now().toString();
    const hash = await sha1([response['static_param'], time, path, user_id].join('\n'));

    let fmt=response['format'].split(':')
    let prefix=fmt[0]
    let suffix=fmt[fmt.length-1]

    const checksum = response['checksum_indexes'].reduce((total, current) => total += hash[current].charCodeAt(0), 0) + response['checksum_constant'];

    const sign = [prefix, hash, checksum.toString(16), suffix].join(':');

    let cookieString=''

    // delete cookieObj['Path']

    // for ([key, value] of Object.entries(cookieObj)){
    //     cookieString+=`${key.toString()}=${value}; `

    //   }

    let allHeaders= {
        accept: 'application/json, text/plain, */*',
        'app-token': response['app_token'],
        // cookie: cookieString,
        referer:ref,
        sign: sign,
        time: time,
        'user-id': user_id,
        'user-agent': userAgent,
        'x-bc': xbc
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

const HEADERS_TO_STRIP_LOWERCASE = [
    'content-security-policy',
    'x-frame-options',
];


// chrome.webRequest.onHeadersReceived.addListener(
//     details => ({
//         responseHeaders: details.responseHeaders.filter(header =>
//             !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase()))
//     }), {urls: ['<all_urls>']},['responseHeaders', 'extraHeaders'])



// chrome.runtime.sendMessage({getUnsubbed: 'true'}, function(response) {
//     console.log('Sent');
//   });



let allCookies={}

let gotCookies=false

let xbc
let userAgent=navigator.userAgent
let auth_id
let user_id


if(gotCookies){
    // duplicateRequest(n.url,app_token,sign,time,allCookies,xbc)
}else{
    chrome.cookies.getAll({domain:'onlyfans.com'},allCks=>{
        console.log('Resetting cookies');
        gotCookies=true

        allCookies=allCks
        
    })
}  

// const fetchExpired=async()=>{
//     const url='https://onlyfans.com/api2/v2/subscriptions/count/all'
//     const ref='https://onlyfans.com/my/subscribers/expired'
//     const headers=await createHeaders(url,ref)

//     fetch(url,{
//         method:'GET',
//         headers:headers,

//     })
//     .then(async res=>{
//         if(res.status==200){
            
//             const result=await res.json()
//             console.log('Sucessfully gotten count',result['subscribers']['expired'])
//             const expiredCount=result['subscribers']['expired']
//             // getExpiredIds(expiredCount)
//             send_expired(expiredCount)
//             return expiredCount
//         }
//         else{
//             console.log('Failed to get subscribr count')
//             return false
//         }
//     })
// }

const send_expired=async(count)=>{
    const response=chrome.tabs.sendMessage(relTab,{expCount:count})
    console.log(count)
}

let yet

let changingHeaders


chrome.webRequest.onBeforeSendHeaders.addListener(async n => {
    if(n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc")){
            changingHeaders=n.requestHeaders
            xbc = n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc").value
    }
    if(true){
        if(n.requestHeaders.find(u => u.name.toLowerCase() === "user-id")){
            user_id = n.requestHeaders.find(u => u.name.toLowerCase() === "user-id").value
                 chrome.tabs.query({url:'*://*.onlyfans.com/*'},tabs=>{
                tabs.forEach(tabI=>{
                    chrome.tabs.sendMessage(tabI.id,{addUi:true})
                    chrome.tabs.sendMessage(tabI.id,{addFrame:true}) 
                })
            })
            } 
    }
    
    if(n.initiator.includes('extension')){

    }else{
        if(listening){
            if(n.url.includes('count/all')){
                let reqHeaders=n.requestHeaders
                let users=await duplicateThis(n.url,reqHeaders)
                
                //active
                let subs=users.subscribers
                let expired=subs.expired
                console.log('Fetching count',expired);
                chrome.tabs.query({
                    url:'*://*.onlyfans.com/*'
                },(tabs)=>{
                    tabs.forEach(tab=>{
                        chrome.tabs.sendMessage(tab.id,{expiredCounter: expired})
                    })
                })
                // chrome.storage.local.set({ expiredCount: active })
            }
        }
    }
    
                
    }

, {
    urls: ['https://onlyfans.com/api2/*']
}, ["requestHeaders",'extraHeaders']
);


const duplicateThis=async(url,reqHeaders)=>{
    return new Promise(async(resolve,reject)=>{
        let headersH={}
        reqHeaders.forEach(item=>{
            headersH[item.name]=item.value
        })

        let res=await fetch(url,{
            headers:headersH
        })

        if(res.status==200){
            console.log('Successfully duplicated');
            listening=false
            let response=await res.json()
            resolve(response);
            // let active_count=response.subscribers.active
            // let expired_count=response.subscribers.expired
            // console.log('Number of active ==',active_count);
            // updateCounts(active_count)
        }
        else{
            resolve('Error duplicating');
        }

    })
    
}

const updateCounts=(count)=>{
    let relTabs=[]
    chrome.tabs.query({url:'*://*.onlyfans.com/*'},tabs=>{
        tabs.forEach(item=>{
            relTabs.push(item.id)
        })

        console.log(relTabs);

        relTabs.forEach(id=>{
            try{
                chrome.tabs.sendMessage(id,{finishScan:true,expCount:count}) 
            }
            catch(err){
                console.log(err);
            }
        })


    })
}




  