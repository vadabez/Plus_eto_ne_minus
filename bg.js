chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
    if (request.name === "Plus_eto_ne_minus") {
        if (request.question == 'get_devjira') {
            fetch(request.id, {
                mode: 'no-cors',
                method: 'get',
                credentials: "include"
              })              
              .then(response => response.text())
              .then(text => { 
                let A=text.match("key-val.*");
                let B=A[0].match("key-val.*");
                let C=B[0].match("rel.*");
                var issueID = C[0].split("\"")[1];                        
                console.log("Я нашел твой IssueID через фон =",issueID );

                let page = document.createElement('html');
                document.body.append(page);
                page.innerHTML = text; //Эта функция успешно отрисовывает весь код в body bg проверено

                
                let  supportTabOld = document.getElementById("customfield_15410-val").textContent;
                supportTabOld = parseInt(supportTabOld);
                console.log("Слышь, тут support tab =", supportTabOld);
                
                var supportTabNew = supportTabOld+1;

                var token = document.getElementsByTagName("input")[2].value;
                

                fetch("https://jira.skyeng.tech/secure/AjaxIssueAction.jspa?decorator=none", {  
                "headers": {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                "body": `customfield_15410=${supportTabNew}&issueId=${issueID}&atl_token=${token}`, //https://jira.skyeng.tech/browse/VIM-11161/
                "method": "POST",
                "credentials": "include"
                })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error))
                .then(text =>{
                    text = "";
                    let page = document.createElement('html');
                    document.body.append(page);
                    page.innerHTML = text; 
                    window.location.reload(); 
                    })

                // let A1=text.match("customfield_15410-val.*");
                // let customfield=A1[0].split("\"")[8]; //Не работает и выдает в конце undef
                
                sendResponse({answer: supportTabNew, issueID, token}) 
                })
          return true;
        }
	}
});


// chrome.runtime.onMessage.addListener(function (request, supportTabNew, issueID, token, sender, sendResponse) { //Не работает
//     if (request.name === "Plus_eto_ne_minus") {
//         if (request.question == 'plus_support_tab') {
//         fetch("https://jira.skyeng.tech/secure/AjaxIssueAction.jspa?decorator=none", {  
//         "headers": {
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//                         },
//             "body": `customfield_15410=${supportTabNew}&issueId=${issueID}&atl_token=${token}`, //https://jira.skyeng.tech/browse/VIM-11161/
//             "method": "POST",
//             "credentials": "include"
//         })
//          .then(response => response.text())
//          .then(result => console.log(result))
//         .catch(error => console.log('error', error))
//     }
//     return true;
// };
// });






/* Работает в 100% случае
chrome.extension.onMessage.addListener(function(request){
	if(request=='некий объект в фон') //проверяется, от того ли окна и скрипта отправлено
		console.log('1. Принято: ', request);
});
chrome.extension.onMessage.addListener(function(request, sender, f_callback){
	if(request=='запрос backMsg'){ //проверяется, от того ли окна и скрипта отправлено
		console.log('2. прошло через фон: ', request);
		f_callback('backMsg'); //обратное сообщение
	}
});*/

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
// 	if(request.name === 'Plus_eto_ne_minus') {
//         if (request.question == 'get_devjira') {
//             (async () => {
//                 let response = await fetch(request.id, {
//                     mode: 'no-cors', method: 'get',credentials: "include", async: true
//                 });
                
//                 response;
                

//                 let text = await response.text(); // прочитать тело ответа как текст
//                 if (response.status == 200) {
//                     let page = document.createElement('html');
//                     page.innerHTML = text;

//                     let findissueID = text.getElementById("key-val");

//                     if (findissueID!=null) {
//                         var issueID;
//                         issueID = findissueID.getAttribute('rel');
//                         console.log("Я нашел твой IssueID через фон =",issueID );
//                     } 
//                     else {
//                         console.log('Status != 200');
//                         sendResponse(response);
//                         };
//                         sendResponse(response);
//                 } 
//             });
//             return true;
//         }
//     }
// })