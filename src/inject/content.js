let count = 0
const CORRECT_M3U8_VIDEO_URL_REQUEST_INDEX = 3

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  count++

  if (count >= CORRECT_M3U8_VIDEO_URL_REQUEST_INDEX) {
    addDownloadButtonToPage(request.url)
  }

  sendResponse(200)
})

function addDownloadButtonToPage(videoLink) {
  const downloadButton = getDownloadButton(videoLink)
  const controlBar = document.querySelector('.control-bar--control-bar--MweER')
  const liveDownloadButton = document.querySelector('#udemy-downloader-btn')

  if (!document.body.contains(controlBar)) {
    waitForControlBarThenAppendDownloadButton(controlBar, downloadButton, liveDownloadButton)
  } else {
    if (!document.body.contains(liveDownloadButton)) {
      appendDownloadButton(downloadButton)
    }
  }
}

function waitForControlBarThenAppendDownloadButton(controlBar, downloadButton, liveDownloadButton) {
  const waitForControlBar = setInterval(() => {
    if (document.body.contains(controlBar) && !document.body.contains(liveDownloadButton)) {
      clearInterval(waitForControlBar)
      appendDownloadButton(downloadButton)
    }
  }, 100)
}

function getDownloadButton(videoLink) {
  const downloadButton = document.createElement('a')
  downloadButton.id = 'udemy-downloader-btn'
  downloadButton.href = videoLink
  downloadButton.setAttribute('class', 'progress-display--progress-display--B20-A')
  downloadButton.setAttribute('title', 'Download Udemy Video')
  downloadButton.innerHTML = 'UD'

  return downloadButton
}

function appendDownloadButton(downloadButton) {
  const addNoteButton = document.querySelector('[aria-label="Add note"]')
  const parentDiv = addNoteButton.parentNode
  parentDiv.insertBefore(downloadButton, addNoteButton.nextSibling) //appends the download button "after/next to" the addNote button
}