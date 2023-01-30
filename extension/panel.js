console.log('Panel working fine');

chrome.devtools.panels.create(
    'my panel',
    'panel.png',
    'panel.html',
    (panel)=>{
        console.log(panel);
    }
  )

chrome.devtools.network.getHAR((logs,sisi)=>{
    console.log(logs);
})

console.log('Panel created');