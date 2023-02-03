chrome.webRequest.onHeadersReceived.addListener(info=>{
    console.log('Received headers');
    var headers = info.responseHeaders;
    for (var i=headers.length-1; i>=0; --i) {
        var header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options') {
            headers.splice(i, 1); // Remove header
        }
    }
    console.log(headers);
    return {responseHeaders: headers};

},{
    urls: ['https://onlyfans.com/*']
},["responseHeaders"])
