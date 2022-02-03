chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "get_pdfs"){
        let pdfs = $('a[href$=".pdf"]').map(function()
        {
            return {
                href: $(this).attr('href')
            }
        })
        sendResponse({data:pdfs,full_urls:window.location.href});
         
    }
});
