chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    const ogpImage = document
      .querySelector('meta[property="og:image"]')
      .getAttribute("content");
    port.postMessage(ogpImage);
  });
});
