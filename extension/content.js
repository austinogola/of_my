console.log('Running this in the background');

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if(request.run){
    runScript(request.run)

  }
  if(request.make_frame){
    console.log('Received iframe request');
    // createIFrame()
  }
  if(request.moveHome){
    takeUsHome()
  }
  if(request.updateCount){
    changeCount(request.updateCount)
  }
  if(request.stopScan){
    stopScan()
  }
})

const runScript=(code)=>{
  // var script = document.createElement('script');
  // script.textContent = code;
  // (document.body || document.head || document.documentElement).appendChild(script);
  // script.remove()

  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('script.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}


chrome.runtime.sendMessage({getUnsubbed: 'true'}, function(response) {
  console.log('Sent');
});

let loc=window.location.href

if(loc=='https://onlyfans.com/my/subscriptions/expired?order_field=expire_date/'){
  console.log('We are good here');
  const div=document.querySelector('div.g-user-name')
  console.log(div);
  console.log('Here too');
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
  frame.style.zIndex=-10
  document.body.appendChild(frame);

  console.log(frame);

}



const takeUsHome=()=>{
  const iFF=document.querySelector('#autos_frame')

  if(iFF){
    console.log('Iff found');
    iFF.src='https://onlyfans.com/my/subscribers/expired'
  }
  else{
    console.log('Frame not yet created');
  }
}

const createMainDiv=()=>{
  const mainDiv=document.createElement('div')

  mainDiv.style.height='400px'
  mainDiv.style.width='350px'
  mainDiv.style.backgroundColor='#FFFFFF'
  mainDiv.style.position='fixed'
  mainDiv.style.border='1px solid #6FB4EA'
  mainDiv.style.borderRadius='5px'
  mainDiv.style.boxShadow = "5px 10px 15px blue"
  mainDiv.style.top='30px'
  mainDiv.style.right='15px'
  mainDiv.style.zIndex='100'

  document.body.appendChild(mainDiv);

  return mainDiv
}

const createNav=(mainDiv)=>{
  
  const nav=document.createElement('div')
  nav.style.borderBottom='2px solid #C5E1F6'
  nav.style.height='60px'
  nav.style.width='100%'
  nav.style.display='flex'
  nav.style.justifyContent='space-between'
  nav.style.padding='5px'
  nav.style.paddingRight='10px'
  nav.style.paddingLeft='10px'

  mainDiv.appendChild(nav)

  return nav
}


const addToNav=(nav,title)=>{
  let div=document.createElement('div')
  div.style.display='flex'
  div.style.height='40px'
  div.style.justifyContent='center'
  div.style.alignItems='center'
  if(title=='EXPIRED'){
    div.style.borderBottom='2px solid #4D7DA3'
    div.style.color='#4D7DA3'
  }else{
    div.style.color='#a8d2f2'
  }
  
  div.style.position='relative'
  div.style.top='16px'

  const p=document.createElement('p')
  p.innerText=`${title}`
  
  div.appendChild(p)

  nav.appendChild(div)

  return div
}

const startScan=()=>{
  refreshFrame()
}

const createBod=(mainDiv)=>{
  const bod=document.createElement('div')

  bod.style.padding='10px'

  const title=document.createElement('p')
  title.style.marginBottom='20px'
  title.innerText='FOLLOW YOUR EXPIRED FANS'

  bod.appendChild(title)

  const bg=document.createElement('div')
  bg.style.backgroundColor='#F1F2F4'
  bg.style.height='150px'
  bg.style.borderRadius='5px'
  bg.style.padding='5px'

  let intro=document.createElement('p')
  intro.style.fontSize='12px'
  intro.innerText=`Follow people who used to be subscribed to you, but they left - get them back!`

  bg.appendChild(intro)

  const btnsDiv=document.createElement('div')
  btnsDiv.style.height='100px'
  // btnsDiv.style.border='1px solid green'
  btnsDiv.style.display='grid'
  btnsDiv.style.gridTemplateRows='65% 35%'

  const btnBox=document.createElement('div')
  // btnBox.style.border='1px solid red'
  btnBox.style.display='flex'
  btnBox.style.justifyContent='space-between'

  const scanBtn=document.createElement('button')
  scanBtn.setAttribute('id','scanBtn')
  scanBtn.style.height='34px'
  scanBtn.style.width='150px'
  scanBtn.style.color='white'
  scanBtn.style.fontSize='12px'
  scanBtn.style.backgroundColor='#6FB4EA'
  scanBtn.style.justifyContent='center'
  scanBtn.style.marginTop='10px'
  scanBtn.style.borderRadius='999px'
  scanBtn.style.alignItems='center'
  scanBtn.innerHTML='SCAN ALL EXPIRED'

  scanBtn.addEventListener('click',e=>{
    e.preventDefault()
    e.target.innerHTML='SCANNING . . .'
    e.target.style.backgroundColor='#B7D9F4'
    e.target.disabled=true
    e.target.style.cursor='no-drop'
    startScan()
    
  })

  const followBtn=document.createElement('button')
  followBtn.setAttribute('id','followBtn')
  followBtn.style.height='34px'
  followBtn.style.width='150px'
  followBtn.style.color='white'
  followBtn.style.fontSize='12px'
  followBtn.style.backgroundColor='#6FB4EA'
  followBtn.style.justifyContent='center'
  followBtn.style.marginTop='10px'
  followBtn.style.borderRadius='999px'
  followBtn.style.alignItems='center'
  followBtn.innerHTML='AUTO FOLLOW ALL (0)'

  btnBox.appendChild(scanBtn)
  btnBox.appendChild(followBtn)




  const btnInfo=document.createElement('div')
  // btnInfo.style.border='1px solid blue'
  btnInfo.style.display='flex'
  btnInfo.style.justifyContent='space-between'
  btnInfo.style.paddingLeft='6px'
  btnInfo.style.paddingRight='6px'

  let inf=document.createElement('p')
  inf.setAttribute('id','inf')
  inf.style.fontSize='14px'
  inf.style.marginLeft='3px'
  inf.style.fontWeight='bold'
  inf.style.letterSpacing='1px'
  inf.innerText='Total expired: 0'
  btnInfo.appendChild(inf)

  let inf2=document.createElement('p')
  inf2.setAttribute('id','inf2')
  inf2.style.fontSize='14px'
  inf2.style.marginLeft='3px'
  inf2.style.fontWeight='bold'
  inf2.style.letterSpacing='1px'
  inf2.innerText='Not following: 0'
  btnInfo.appendChild(inf2)

  btnsDiv.appendChild(btnBox)
  btnsDiv.appendChild(btnInfo)

  bg.appendChild(btnsDiv) 






  bod.appendChild(bg)

  mainDiv.appendChild(bod)

  return bod

}

const addUi=()=>{
  

  let mainDiv=createMainDiv()
  let nav=createNav(mainDiv)

  let home=addToNav(nav,'EXPIRED')

  let msg=addToNav(nav,'FANS')
  let smt=addToNav(nav,'TEMPLATES')
  let bot=addToNav(nav,'AUTOS')


  let body=createBod(mainDiv)


  

  // const bod=document.createElement('div')
  // bod.style.borderBottom='1px solid #F1F2F4'
  // bod.style.backgroundColor='#F1F2F4'
  // bod.style.height='100px'
  // bod.style.width='100%'
  // bod.style.display='flex'
  // bod.style.justifyContent='space-around'
  // bod.style.padding='5px'
  // bod.style.marginTop='10px'

  

  // mainDiv.appendChild(bod)

  // const tab=document.createElement('div')
  // tab.style.border='1px solid #6FB4EA'
  // tab.style.height='60px'
  // tab.style.width='30%'
  // tab.style.display='flex'
  // tab.style.alignItems='center'
  // tab.style.justifyContent='center'

  // nav.appendChild(tab)


  // document.body.appendChild(mainDiv)
 
}

addUi()

createIFrame()

const refreshFrame=async ()=>{
  const iFF=document.querySelector('#autos_frame') 
  iFF.contentWindow.location.reload()
  // iFF.contentWindow.location.href='https://onlyfans.com/my/subscribers/expired'
  let activeBtn=iFF.contentWindow.document.querySelector('a[href="/my/subscribers/active"]')
  // activeBtn.click()
  // await sleep(800)
  // let expiredBtn=iFF.contentWindow.document.querySelector('a[href="/my/subscribers/expired"]')
  // expiredBtn.click()
}

const changeCount=(count)=>{
  currentCount=count
  let inf=document.querySelector('#inf')
  inf.innerText=`Total expired: ${count}`

  let inf2=document.querySelector('#inf2')
  
}

let currentCount

const stopScan=()=>{
  let scanBtn=document.querySelector('#scanBtn')
  scanBtn.innerHTML='SCAN ALL EXPIRED'
  scanBtn.style.backgroundColor='#6FB4EA'
  scanBtn.disabled=false
  scanBtn.style.cursor='pointer'

  let followBtn=document.querySelector('#followBtn')
  followBtn.innerText=`AUTO FOLLOW ALL (${currentCount})`
  followBtn.style.backgroundColor='#16C60C'
}



