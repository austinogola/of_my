chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  console.log(request,'NOW');

  if(request.addUi){
    let parent=document.querySelector('#parent')
    if(!parent){
      addInterface()
    }
    
  }
  if(request.addFrame){
    let autos_frame=document.querySelector('#autos_frame')
    if(!autos_frame){
      createIFrame()
    }
    
  }

  if(request.finishScan){
    if(request.expCount){
      updateBtns(request.expCount)
      // getExpiredIds(request.expCount)
      // changeUnfollowed(request.unFollowed)
    }
  }

  if(request.expiredCounter){
    expiredAll=request.expiredCounter
    console.log('Expired count is',expiredAll);
  }
  
})

let expiredAll
let profile_pic
let user_name
let our_status

const initiateExt=()=>{
  addInterface()
  let myPort = chrome.runtime.connect({name:"data_Port"});
  myPort.postMessage({getDetails:true})
  myPort.onMessage.addListener(async(message,port)=>{
      
  })
}


const createMainDiv=()=>{
  
  const mainDiv=document.createElement('div')
  mainDiv.setAttribute('id','mainDiv')
  const clip=document.createElement('div')
  clip.setAttribute('id','clip')

  clip.style.height='75px'
  clip.style.backgroundColor='#6FB4EA'
  clip.style.width='40px'
  clip.style.position='absolute'
  clip.style.left='-15px'
  clip.style.borderRadius='5px 0px 0px 5px'
  clip.style.top='300px'
  clip.style.display='flex'
  clip.style.justifyContent='center'
  clip.style.alignItems='center'
  clip.style.color='white'

  clip.style.cursor='pointer'
  clip.addEventListener('click',e=>{
    bringMainBack()
  })

  let back=document.createElement('div')
  back.setAttribute('id','back')
  back.style.height='30px'
  back.style.backgroundColor='#6FB4EA'
  back.style.width='80px'
  back.style.position='absolute'
  back.style.top='0px'
  back.style.left='0px'
  back.style.marginBottom='10px'
  back.style.display='flex'
  back.style.justifyContent='center'
  back.style.alignItems='center'
  back.style.fontSize='30px'
  back.style.fontWeight='bold'
  back.style.color='white'
  back.innerHTML='&#8594;'
  back.style.cursor='pointer'

  back.addEventListener('click',e=>{
    takeMainBack()
  })


  mainDiv.style.height='450px'
  mainDiv.style.transition='all .4s'
  mainDiv.style.width='400px'
  mainDiv.style.backgroundColor='#FFFFFF'
  mainDiv.style.position='fixed'
  mainDiv.style.border='1px solid #6FB4EA'
  mainDiv.style.borderRadius='5px'
  mainDiv.style.boxShadow = "5px 10px 15px blue"
  mainDiv.style.top='30px'
  mainDiv.style.right='10px'
  mainDiv.style.zIndex='100'

  mainDiv.appendChild(clip)
  mainDiv.appendChild(back)


  document.body.appendChild(mainDiv);

  return mainDiv
}

const updateButtons=(count,target)=>{
  let followBtn=document.querySelector('#followBtn')

  if(followBtn){
    console.log('Follow Button found');
  }
  else{
    console.log('Follow not fond');
  }
  target.disabled=false

  target.innerHTML='SCAN ALL EXPIRED FANS'
  target.style.backgroundColor='#6FB4EA';

  followBtn.style.backgroundColor='#14A800'
  followBtn.disabled=false

  result=document.querySelector('#result')

  if(count>20){
    console.log('Warning.You have more than 20 expired fans');
    followBtn.innerHTML=`FOLLOW 20 EXPIRED FANS`
    result.innerHTML=`<p>Finished scan. You have ${count} new expired fans you aren't following! You can follow 20 right now.Click the "FOLLOW" button above to start following them. Don't worry, we'll only follow the free ones</p>`


  }else{
    followBtn.innerHTML=`FOLLOW ${count} EXPIRED FANS`
    result.innerHTML=`<p>Finished scan. You have ${count} new expired fans you aren't following!! Click the "FOLLOW" button above to start following them. Don't worry, we'll only follow the free ones</p>`

  }

  

  
}

const startScan=async(targ)=>{
  let result=document.createElement('div')
  result.setAttribute('id','result')

  result.style.cssText=`
  background-color:#D6FAD3;
  height:40px;
  border-radius:2px;
  padding:5px;
  margin-top:15px;
  margin-left:5px;
  margin-right:5px;
  font-size:12px;
`
  let result_text=document.createTextNode('Scanning your expired fans. Please wait')
  result.appendChild(result_text)

  console.log('Scanning...');
  targ.style.backgroundColor='#BDD9F0'
  targ.innerHTML='SCANNING...'
  targ.disabled=true

  btnContainer=document.querySelector('#btnContainer')

  btnContainer.appendChild(result)



  while(!expiredAll){
    await sleep(300)
  }

  updateButtons(expiredAll,targ)

  // chrome.runtime.sendMessage({listen:true})
  // let autos_frame=document.querySelector('#autos_frame')
  // autos_frame.contentWindow.location.reload()
  
  // const rules=await fetchRules()
  // fetchExpired(rules)

}

let xbc
let user_id

const startFollowing=()=>{
  chrome.runtime.sendMessage({startFollowing: 'true'}, function(response) {
    console.log('Sent signal to begin following');
  });
}




const makeParent=()=>{
  console.log('making parent');
  const parent=document.createElement('div')
  parent.setAttribute('id','parent')
  document.body.appendChild(parent);
}

const makeProfile=(pic_path,username,status)=>{

  const parent=document.querySelector('#parent')

  let profile=document.querySelector('#profile')

  if(!profile){
    profile=document.createElement('div')
    profile.setAttribute('id','profile')
  }
  else{
    while (profile.firstChild) {
      profile.removeChild(profile.firstChild);
    }
  }



  //pofile img
  const profile_img=document.createElement('img')
  profile_img.setAttribute('src',pic_path)
  profile.appendChild(profile_img)
  
  //profile
  let user_profile=document.createElement('div')
  let name_text=document.createElement('p')
  name_text.setAttribute('id','name_text')
  name_text.innerHTML=username
  user_profile.appendChild(name_text)
  profile.appendChild(user_profile)


  //status
  let user_status=document.createElement('div')
  user_status.setAttribute('id','user_status')
  let status_text=document.createElement('p')
  status_text.setAttribute('id','status_text')

  let upgradeBtn=document.createElement('button')
  upgradeBtn.setAttribute('id','upgrade_btn')

  if(!status || status=='Free'){
    status_text.innerHTML='Free'
    upgradeBtn.innerHTML='UPGRADE NOW'
  }
  else{
    status_text.innerHTML='Pro'
    upgradeBtn.innerHTML='Great'
  }

  user_status.appendChild(status_text)
  user_status.appendChild(upgradeBtn)

  profile.appendChild(user_status)

  // if(!status || status=='Free'){
   

  // }
  // else{
  //   status_text.innerHTML='Pro'
  //   
  //   upgradeBtn.innerHTML='&#10003'

  // }

  // user_status.appendChild(user_status)
  // user_status.appendChild(upgradeBtn)

  // profile.appendChild(user_status)
  // console.log(profile);
  

  parent.appendChild(profile)
  
}

const makeTabs=()=>{
  const parent=document.querySelector('#parent')

  let tabs_title=['EXPIRED FANS','NEW FANS','CURRENT','SETTINGS']
  const tabs=document.createElement('div')
  tabs.setAttribute('id','tabParent')

  tabs_title.forEach(tab=>{
    let tabBtn=document.createElement('button')
    tabBtn.setAttribute('class','tablinks')
    tabBtn.innerHTML=tab
  
    tabBtn.addEventListener('click',e=>{
      e.preventDefault()
      const tablinks=document.querySelectorAll('.tablinks')
      tablinks.forEach(btn=>{
        // btn.style.backgroundColor='white'
        btn.classList.remove('active')

      })
      e.target.classList.add('active')
    })
    tabs.appendChild(tabBtn)
  })

  console.log(tabs); 
  parent.appendChild(tabs)

}

const makeContent=(text)=>{
  const parent=document.querySelector('#parent')
  
  const tabContent=document.createElement('div')
  tabContent.setAttribute('class','tabContent')
  tabContent.style.cssText=`
    margin-top:10px;
  `

  const tab_title=document.createElement('h2')
  tab_title.style.fontSize='15px'
  tab_title.style.fontWeight='bold'
  const tab_exp=document.createElement('p')
  tab_exp.style.fontSize='12px'
  let title_text
  let exp_text

  let bodyDiv=document.createElement('div')


  if(text=='expired fans'){
    title_text = document.createTextNode("FOLLOW YOUR EXPIRED FANS");
    exp_text=document.createTextNode('Follow people who used to be subscribed to you, but they left - get them back!')
    bodyDiv.style.cssText=`
      height:120px;
      background-color:#F1F2F4;
      padding-top:10px;
    `
    let btnContainer=document.createElement('div')
    let btnWrapper=document.createElement('div')

    btnContainer.setAttribute('id','btnContainer')
    btnWrapper.style.cssText=`
      display:flex;
      justify-content:center;
    `
    let scanBtn=document.createElement('button')
    scanBtn.setAttribute('id','scanBtn')
    scanBtn.innerHTML='SCAN ALL EXPIRED FANS'
    let followBtn=document.createElement('button')
    followBtn.setAttribute('id','followBtn')
    followBtn.innerHTML='FOLLOW EXPIRED FANS'
    followBtn.disabled=true

    btnWrapper.appendChild(scanBtn)
    btnWrapper.appendChild(followBtn)

    btnContainer.appendChild(btnWrapper)

    scanBtn.addEventListener('click',e=>{
      e.preventDefault()
      console.log('Clicked scan button');
      startScan(e.target)
      
    })
    followBtn.addEventListener('click',e=>{
      e.preventDefault()
      console.log('Clicked Follow button');
      startFollowing()
      
    })

    btnWrapper.childNodes.forEach(btn=>{
      btn.style.cssText=`
        margin:5px;
        height:34px;
        width:100%;
        padding:10px;
        color:white;
        font-size:12px;
        background-color:#6FB4EA;
        border-radius:999px;
      `
    })

    bodyDiv.appendChild(btnContainer)


  }


  //text 
  tab_title.appendChild(title_text)
  tabContent.appendChild(tab_title)
  tab_exp.appendChild(exp_text)
  tabContent.appendChild(tab_exp)

  //body
  tabContent.appendChild(bodyDiv)

  //parent
  parent.appendChild(tabContent)
}

const addInterface=()=>{
  makeParent()
  makeProfile()
  makeTabs()
  makeContent('expired fans')
  chrome.runtime.sendMessage({update:'Added UI'})

}
initiateExt()

// addInterface()

const addUi=()=>{
  

  let mainDiv=createMainDiv()

  let nav=makeNewNav(mainDiv)

  
  let expired=addToNewNav(nav,'EXPIRED FANS')
  let fanInfo=addToNewNav(nav,'NEW FANS')
  
  let billing=addToNewNav(nav,'SETTINGS')

  let expiredBody=addToBody(mainDiv,'EXPIRED','FOLLOW YOUR EXPIRED FANS')

  let fanInfoBody=addToBody(mainDiv,'NEW FANS','COMING SOON')

  let billingBody=addToBody(mainDiv,'SETTINGS','YOUR SETTINGS INFO')

}

// addUi()


const takeMainBack=()=>{
  let mainDiv=document.querySelector('#mainDiv')
  mainDiv.style.right='-360px'
}

const bringMainBack=()=>{
  let mainDiv=document.querySelector('#mainDiv')
  mainDiv.style.right='-10px'
}


const sleep=(ms)=> {
  return new Promise(resolve => setTimeout(resolve, ms));
}



const sha1=async(data)=>{
  const dataBuffer=new TextEncoder().encode(data)
  const hashBuffer=await crypto.subtle.digest('SHA-1',dataBuffer)

  // To hex string
  const hashArray=Array.from(new Uint8Array(hashBuffer))
  const hex=hashArray.map(val=>val.toString(16).padStart(2,'0')).join('')

  return hex

}

const fetchExpired=async(rules)=>{
  const url='https://onlyfans.com/api2/v2/subscriptions/count/all'
  const ref='https://onlyfans.com/my/subscribers/expired'
  const headers=await createHeaders(rules,url,ref)

  fetch(url,{
      method:'GET',
      headers:headers,

  })
  .then(async res=>{
      if(res.status==200){
          
          const result=await res.json()
          console.log('Sucessfully gotten count',result['subscribers']['expired'])
          const expiredCount=result['subscribers']['expired']
          
          console.log('Expired count',expiredCount)
          getExpiredIds(expiredCount)
          // send_expired(expiredCount)
          return expiredCount
      }
      else{
          console.log('Failed to get subscribr count')
          return false
      }
  })
}

const getExpiredIds=async (count)=>{
  for(let offset=0;offset<count;offset+=20){
      const result=await getSubscribers(offset)

      console.log('Subscriber ids',result)
  }
}

const getSubscribers=async(num)=>{
  const rules=await fetchRules()
  let url = `https://onlyfans.com/api2/v2/subscriptions/subscribers?limit=10&offset=${num}&sort=desc&field=last_activity&type=expired`
  let headers = await createHeaders(rules,url, 'https://onlyfans.com/my/subscribers/expired')

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
          console.log(res)
          await sleep(2000)
          getSubscribers(num)
          
      }
  })
}


const createIFrame=()=>{
  var frame = document.createElement('iframe');
  frame.sandbox = 'allow-scripts allow-same-origin allow-forms';
  // https://onlyfans.com/
  frame.setAttribute('src','https://onlyfans.com/my/subscribers/expired/');
  frame.setAttribute('id','autos_frame');

  frame.style.width = "1000px";
  frame.style.height = "500px";
  frame.style.position="absolute"
  frame.style.zIndex=-50
  document.body.appendChild(frame);
  chrome.runtime.sendMessage({update:'Successfully added frame'})


  // let activeBtn=iFF.contentWindow.document.querySelector('a[href="/my/subscribers/expired"]')
  // activeBtn.click()
  console.log(frame);

}


const updateBtns=(count)=>{
  let scanBtn=document.querySelector('#scanBtn')
  scanBtn.style.backgroundColor='#6FB4EA'
  scanBtn.innerHTML='SCAN ALL EXPIRED'
  scanBtn.disabled=false
  scanBtn.cursor='pointer'

  let followBtn=document.querySelector('#followBtn')
  followBtn.style.backgroundColor='#6FB4EA'
  
  followBtn.innerHTML=`FOLLOW ${count} EXPIRED FANS`
  followBtn.style.disabled=false
  followBtn.style.cursor='pointer'

}











async function createHeaders(rules,url,ref) {
  // let response= await (await fetch('https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json')).json()


  let uR=new URL(url)

  let path=uR.pathname
  let query=uR.query
  // console.log(query);

  path=query?path+query:path


  const time = Date.now().toString();
  const hash = await sha1([rules['static_param'], time, path, user_id].join('\n'));

  let fmt=rules['format'].split(':')
  let prefix=fmt[0]
  let suffix=fmt[fmt.length-1]

  const checksum = rules['checksum_indexes'].reduce((total, current) => total += hash[current].charCodeAt(0), 0) + rules['checksum_constant'];

  const sign = [prefix, hash, checksum.toString(16), suffix].join(':');

  let cookieString=''

  // delete cookieObj['Path']

  // for ([key, value] of Object.entries(cookieObj)){
  //     cookieString+=`${key.toString()}=${value}; `

  //   }

  let allHeaders= {
      accept: 'application/json, text/plain, */*',
      'app-token': rules['app_token'],
      // cookie: cookieString,
      referer:ref,
      sign: sign,
      time: time,
      'user-id': user_id,
      'user-agent': navigator.userAgent,
      'x-bc': xbc
  };

  return allHeaders
}