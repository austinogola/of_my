chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)=>{
    if(request.beginScan){
        //Code for scanning in beginScan()
        beginScan()
        
    }

    if(request.startFollowing){
        //Code for initiating follow in beginFollowing
        beginFollow()
    }
})


const beginScan=()=>{
    console.log('Beginning Scan...');
}

const beginFollow=()=>{
    console.log('Beginning Following...');
}




let allCookies={}

let gotCookies=false

let xbc
let userAgent=navigator.userAgent

chrome.webRequest.onBeforeSendHeaders.addListener(async n => {
    if(n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc")){
        xbc = n.requestHeaders.find(u => u.name.toLowerCase() === "x-bc").value
        console.log('xbc value set to: ',xbc);
                if(gotCookies){
                    // duplicateRequest(n.url,app_token,sign,time,allCookies,xbc)
                }else{
                    chrome.cookies.getAll({domain:'onlyfans.com'},allCks=>{
                        console.log('Resetting cookies');
                        gotCookies=true
        
                        allCookies=allCks
                        
                    })
                }  
            }       
                
    }

, {
    urls: ['https://onlyfans.com/api2/*']
}, ["requestHeaders",'extraHeaders']
);





  