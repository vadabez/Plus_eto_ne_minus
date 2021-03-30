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
                sendResponse({answer: supportTabNew, issueID, token}) 
                })
          return true;
        }
	}
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'search_that_task') {
          var requestText = request.id;
          fetch("https://jira.skyeng.tech/issues/?jql=project in (MV, ADULT, VIM, SS, CRM2PB, MATH, ST, TS, VID) AND issuetype = Bug AND text~"+requestText+" AND resolution = Unresolved", {
              mode: 'no-cors',
              method: 'get',
              credentials: "include"
            })              
            .then(response => response.text())
            .then(text => { 
              let page = document.createElement('html');
              document.body.append(page);
              page.innerHTML = text; //Эта функция успешно отрисовывает весь код в body bg проверено
              
              let issueKey = /data-issue-key="\w+[#\-]{0,1}\d{4,5}"/g; //Этот код ищет все таски через регулярные выражения, с учетом - букв и цифр
              
              let A2 = text.match(issueKey);
              let B2 = A2[0].split("\"");
              const array=[];

              for (var i = 0; i < A2.length; i++) {
                  B2 = A2[i].split("\"");
                  findIssue = B2[1];
                  array.push(findIssue); //Добавление в массив новой таски
                }

              console.log("Ты искал в jira и нашел = ", array);
              let response = array;

              sendResponse(response);
            }).catch(error => console.log('error', error))
            return true;
       }
    }
});
