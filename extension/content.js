console.log('Running this in the background');

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if(request.run){
    runScript(request.run)

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

var frame = document.createElement('iframe');
frame.sandbox = 'allow-scripts';
frame.src = 'https://onlyfans.com/my/subscriptions/expired?order_field=expire_date/';
document.body.appendChild(frame);