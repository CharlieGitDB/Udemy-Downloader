  chrome.webRequest.onCompleted.addListener((details) => {
  if (details.url.includes('m3u8')) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {url: details.url}, (response) => {})
    })
  }
}, { urls: ['*://www.udemy.com/*', '*://udemy.com/*'] })

console.log('ran!')