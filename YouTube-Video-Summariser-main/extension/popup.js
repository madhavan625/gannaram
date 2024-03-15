const btn = document.getElementById("summarise");

btn.addEventListener("click", function () {
    btn.disabled = true;
    btn.innerHTML = "Summarising...";

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const url = tabs[0].url;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + encodeURIComponent(url), true);

        xhr.onload = function () {
            const data = JSON.parse(xhr.responseText);
            const text = data.map(entry => entry.text).join('\n');  // Extracting text

            const p = document.getElementById("output");
            p.innerHTML = text;
            btn.disabled = false;
            btn.innerHTML = "Summarise";
        }
        xhr.send();
    });
});