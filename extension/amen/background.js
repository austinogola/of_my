chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
    if(request.getUnsubbed){
        // getUnsubbed()
        console.log('request received');
        // if(!already){
        //     console.log('Making new one');
        //     already=true
        //     makeNewandTrack()
        // }
        
        
    }
})

const spring=async()=>{
    let time = new Date().getTime()
    let path='https://onlyfans.com/api2/v2/users/me'
    R = await _y(time, path);
}

let _y=async(time,path)=>{

    let u = new URL(i),
    pathN = u.pathname,
    query = u.search;

    query && (pathN = `${pathN}${query}`);

    let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()
    console.log(response);

    let msg= [response.static_param, time.toString(), pathN, "0"].join(``)

    let signa = (0, cp.default)(msg),
    signb = vy(response, signa);

    return [response.first_number, signa, signb, response.suffix].join(":")

}

// const cp=rt(ep())

// const ep=()
const vy = (resp, sign) => {
    let arr = Array.from(sign, msg => msg.charCodeAt(0)),
        d = resp.checksum_indexes.map(m => arr[m])
        .reduce((m, v) => m + v) + resp.checksum_constant;

    return Math.abs(d)
        .toString(16)
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