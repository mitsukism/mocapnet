/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./popup.js ***!
  \******************/
$(function() {
    // アクティブなタブの情報を取得
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      var activeTabUrl = activeTab.url; // アクティブなタブのURLを取得
  
      // ストレージから保存されているURLの配列を取得
      chrome.storage.local.get("urls", function(result) {
        var urls = result.urls ? result.urls : [];
        urls.push(activeTabUrl); // 新しいURLを追加
  
        // URLの配列が3を超えた場合、最も古いURLを削除
        while (urls.length > 3) {
          urls.shift(); // 配列の先頭要素（最も古いURL）を削除
        }
  
        // ストレージに更新されたURLの配列を保存
        chrome.storage.local.set({"urls": urls}, function() {
          // HTMLにURLを表示（最新の3つ）
          $("#title").html(urls.join("<br>")); // 配列の要素を<br>で結合して表示
        });
      });
    });
  });

  $(document).ready(function() {
    chrome.storage.local.get(['urls'], function(result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        console.log('urls', result.urls);
        const urls = result.urls;
        const data = JSON.stringify({ urls });

        $.ajax({
            url: 'https://dhsge5zjrc.execute-api.us-east-1.amazonaws.com/openai_and_linkpreview',
            type: 'POST',
            contentType: 'application/json',
            data: data,
            success: function(response) {
                console.log(response);
                // APIレスポンスを扱う前にレスポンスオブジェクトを配列に変換
                let items = Object.values(response); // オブジェクトの値から配列を生成
                chrome.storage.local.set({ 'api-response': items }, function() {
                    if (items && items.length > 0) {
                        items.forEach(function(item, index) {
                            // 各要素にデータを割り当てる
                            $("#myimage" + (index + 1)).attr("src", item.image || '');
                            $("#mytitle" + (index + 1)).text(item.title || '');
                            $("#mydescription" + (index + 1)).text(item.description || '');
                            // URL を表示する場合は、リンクとして設定
                            $("#myurl" + (index + 1)).html(item.url ? `<a href="${item.url}" target="_blank">${item.url}</a>` : '');
                        });
                    } else {
                        console.log('No data received from API.');
                    }
                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});

/******/ })()
;
//# sourceMappingURL=index.js.map