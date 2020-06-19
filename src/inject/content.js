function createDownloadButton(videoLink) {
	const downloadButton = getDownloadButton(videoLink)
	const controlBar = document.querySelector('.control-bar--control-bar--MweER')
	const dlButton = document.querySelector('#udemy-downloader-btn')

	addDownloadButtonToPage(controlBar, dlButton, downloadButton)
}

function addDownloadButtonToPage(controlBar, dlButton, downloadButton) {
	if (!document.body.contains(controlBar)) {
		let waitForControlBar = setInterval(() => {
			if (document.body.contains(controlBar) && !document.body.contains(dlButton)) {
				clearInterval(waitForControlBar)
				appendDownloadButton(downloadButton)
			}
		}, 100)
	}
	else {
		if (!document.body.contains(dlButton)) {
			appendDownloadButton(downloadButton)
		}
	}
}

function getDownloadButton(videoLink) {
	const downloadButton = document.createElement('a')
	downloadButton.href = videoLink
	downloadButton.id = 'udemy-downloader-btn'
	downloadButton.setAttribute('class', 'progress-display--progress-display--B20-A')\
	downloadButton.innerHTML = 'UD'
	downloadButton.setAttribute('title', 'Download Udemy Video')

	return downloadButton
}

function appendDownloadButton(downloadButton) {
	const addNoteButton = document.querySelector('[aria-label="Add note"]')
	const parentDiv = addNoteButton.parentNode
	parentDiv.insertBefore(downloadButton, addNoteButton.nextSibling)
}

let count = 0
const CORRECT_M3U8_VIDEO_URL_REQUEST_INDEX = 3

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	count++
	
	if (count >= CORRECT_M3U8_VIDEO_URL_REQUEST_INDEX) {
		createDownloadButton(request.url)
	}

    sendResponse('received')
});