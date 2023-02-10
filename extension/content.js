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

const startScan=()=>{
  chrome.runtime.sendMessage({beginScan: 'true'}, function(response) {
    console.log('Sent signal to start scan');
  });
}

const startFollowing=()=>{
  chrome.runtime.sendMessage({startFollowing: 'true'}, function(response) {
    console.log('Sent signal to begin following');
  });
}

const makeNewNav=(mainDiv)=>{
  const nav=document.createElement('div')

  nav.style.height='60px'
  nav.style.position='relative'
  nav.style.top='30px'
  nav.style.padding='5px'

  const navWrapper=document.createElement('div')
  navWrapper.setAttribute('id','navWrapper')
  navWrapper.style.height='50px'
  navWrapper.style.borderBottom='2px solid #BBCAE7'
  navWrapper.style.display='flex'
  navWrapper.style.justifyContent='space-between'

  nav.appendChild(navWrapper)

  mainDiv.appendChild(nav)

  return navWrapper
}


const addToNewNav=(navWrapper,name)=>{
  const navItem=document.createElement('div')
  navItem.setAttribute('class','navItem')
  navItem.setAttribute('id',name)
  navItem.style.textAlign='center'
  navItem.style.padding='3px'
  navItem.style.cursor='pointer'
  if(navItem.id=='EXPIRED'){
    navItem.style.backgroundColor='#BBCAE7'
    navItem.style.borderBottom='2px solid #6FB4EA'
  }

  navItem.addEventListener('click',e=>{;
    e.stopPropagation()
    e.currentTarget.style.backgroundColor='#BBCAE7'
    let navItems=document.querySelectorAll(".navItem")
    navItems.forEach(item=>{
      item.style.backgroundColor='white'
      item.style.borderBottom='none'
    })
    e.currentTarget.style.backgroundColor='#BBCAE7'
    e.currentTarget.style.borderBottom='2px solid #6FB4EA'

    const bodyItems=document.querySelectorAll('.bodyItem')
    bodyItems.forEach(item=>{
      if(item.id==e.currentTarget.id){
        item.style.display='block'
      }
      else{
        item.style.display='none'
      }
    })
  })


  let navImg=document.createElement('img')
  if(name=='EXPIRED'){
    navImg.src=chrome.runtime.getURL('icons/expired-16.png')
  }else if(name=='TEMPLATES'){
    navImg.src=chrome.runtime.getURL('icons/message-24.png')
  }else if(name=='FAN INFO'){
    navImg.src=chrome.runtime.getURL('icons/user-24.png')
  }else if(name=='BILLING'){
    navImg.src=chrome.runtime.getURL('icons/template-24.png')
  }
  

  navItem.appendChild(navImg)

  let title=document.createElement('p')
  title.style.fontSize='14px'
  title.innerText=name
  navItem.appendChild(title)

  navWrapper.appendChild(navItem)

  return navItem
}

const addToBody=(mainDiv,name,titleText)=>{
  const bod=document.createElement('div')
  bod.setAttribute('id',name)
  bod.setAttribute('class','bodyItem')


  bod.style.padding='10px'
  bod.style.position='relative'
  bod.style.top='30px'

  let title=document.createElement('p')
  title.style.marginBottom='20px'
  title.innerText=titleText

  bod.appendChild(title)
  if(titleText=='COMING SOON' || titleText=='YOUR BILLING INFO'){
    bod.style.display='none'
  }else{
    const bg=document.createElement('div')
    bg.style.backgroundColor='#F1F2F4'
    bg.style.height='150px'
    bg.style.borderRadius='5px'
    bg.style.padding='5px'

    let intro=document.createElement('p')
    intro.style.fontSize='12px'
    intro.innerText=`Follow people who used to be subscribed to you, but they left - get them back!`

    bg.appendChild(intro)

      const btnBox=document.createElement('div')
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
      console.log('Clicked scan button');
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
    followBtn.style.disabled=true
    followBtn.style.cursor='pointer'
    followBtn.style.title='Please scan first'
    followBtn.addEventListener('click',e=>{
      e.preventDefault()
      console.log('Clicked autofollow button');
      startFollowing()
    })
  
    btnBox.appendChild(scanBtn)
    btnBox.appendChild(followBtn)
  
    bg.appendChild(btnBox)

    bod.appendChild(bg)
  }

  mainDiv.appendChild(bod)

  return bod

}

const addUi=()=>{
  

  let mainDiv=createMainDiv()

  let nav=makeNewNav(mainDiv)

  let fanInfo=addToNewNav(nav,'FAN INFO')
  let expired=addToNewNav(nav,'EXPIRED')
  let billing=addToNewNav(nav,'BILLING')

  let expiredBody=addToBody(mainDiv,'EXPIRED','FOLLOW YOUR EXPIRED FANS')

  let fanInfoBody=addToBody(mainDiv,'FAN INFO','COMING SOON')

  let billingBody=addToBody(mainDiv,'BILLING','YOUR BILLING INFO')

}

addUi()


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





