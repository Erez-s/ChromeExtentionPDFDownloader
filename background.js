var pat = /^https?:\/\//i;
var url_to_download =""


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "download_all") {
        for(let i = 0; i < request.data.length; i++){
            if (pat.test(request.data[i]["href"])){
                url_to_download = request.data[i]["href"];
            }
            else{
                url_to_download = absolute(request.full,request.data[i]["href"]);
                //console.log(url_to_download);
            }
            chrome.downloads.download({
                url: url_to_download,
                saveAs: false
                })
            }         
        }       

    if (request.action === "download")
    {
        if (pat.test(request.data["href"])){
                url_to_download = request.data["href"]
            }
        else{
            url_to_download = absolute(request.full,request.data["href"]);
            //console.log(url_to_download);
        }
                chrome.downloads.download(
                {
                url: url_to_download,
                saveAs: false
                })}  
    }
);

function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}



    
