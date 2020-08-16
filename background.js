chrome.app.runtime.onLaunched.addListener(handleLaunch);

function handleLaunch(){
    chrome.app.window.create('window.html', {
        outerBounds: {
            width: 800,
            height: 300
        }
    });
}