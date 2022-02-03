var pdfs = [];
full_url=""

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "get_pdfs"}, response => {
    if(response){
        pdfs = response.data;
        full_url = response.full_urls
    }
        for (let i = 0; i < pdfs.length; i++)
        {
            $('ol').append('<li>' +  pdfs[i]["href"].split('/').pop() +'</li><button id="'+(i+1)+'" type="button" class="btn btn-success" style="height:40px;width:100%">Download '+(i+1)+'</button>')
            document.getElementById(i+1).addEventListener('click',function(){
                chrome.runtime.sendMessage({action: "download", data: pdfs[i], full:full_url})})
        }
            document.getElementById("number_of_files").innerHTML = "The number of pdf files on this page is: " + pdfs.length
    
})
})

$(document).on('click', '#download_all', (e) => {

    chrome.runtime.sendMessage({action: "download_all", data: pdfs, full: full_url})
})

