chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const urls = tabs.map((tab) => tab.url);
      const searchHistory = urls.slice(0, 3);
      chrome.storage.local.set({ "searchHistory": searchHistory });
    });
  });
});

/*
chrome.action.onClicked.addListener((tab) => {
    console.log('clicked');
    chrome.storage.local.get(['searchHistory'], (result) => {
      const urls = result.searchHistory;
      const data = { urls };
  
      axios.post('https://dhsge5zjrc.execute-api.us-east-1.amazonaws.com/openai_and_linkpreview', data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
        // APIから受け取ったデータを処理
        const apiResponse = response.data;
        console.log('i got response from api', apiResponse);

        // ローカルストレージに保存
        chrome.storage.local.set({ 'api-response': apiResponse });
        })
        .catch(error => {
          // エラー処理
          console.error('Error:', error);
        });
    });
  });
*/
