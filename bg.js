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
          fetch("https://jira.skyeng.tech/issues/?jql=project%20in%20(VIM%2C%20MV%2C%20KGL%2C%20SS%2C%20ADULT%2C%20CRM2PB%2C%20DSTR%2C%20KG%2C%20C0%2C%20MATH%2C%20ST%2C%20TS%2C%20VID)%20AND%20issuetype%20in%20(Bug%2C%20Epic)%20AND%20resolution%20%3D%20Unresolved%20AND%20text~"+requestText, {
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

              for (var i = 0; i < A2.length; i=i+3) { //Специально увеличиваю цикл на 3, чтобы избежать повторений
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'search_that_summary') {
          var nameTask = request.id;
          var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project+in+%28VIM%2C+MV%2C+KGL%2C+SS%2C+ADULT%2C+CRM2PB%2C+DSTR%2C+KG%2C+C0%2C+MATH%2C+ST%2C+TS%2C+VID%29+AND+issuetype+%3D+Bug+AND+resolution+%3D+Unresolved+AND+text+%7E+%22"+nameTask+"%22+ORDER+BY+priority+ASC";
          fetch("https://jira.skyeng.tech/rest/api/2/user/columns", {
          "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
          },
          "referrer": day_djoby,
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"columns\":[\"issuekey\",\"summary\"]}",
          "method": "PUT",
          "mode": "cors",
          "credentials": "include"
        })
        .then(
          fetch(day_djoby, {
            mode: 'no-cors',
            method: 'get',
            credentials: "include"
          })   
          .then(response => response.text())
          .then((data) => {
            
            let page = document.createElement('html');
                document.body.append(page);
                page.innerHTML = data;
                
                var findTable = document.getElementById("issuetable").innerHTML;// Найдем таблицу на странице
                let responсe = findTable;
                page.innerHTML ="";
                sendResponse(responсe); return true;})
                
                .then(()=>
                  fetch("https://jira.skyeng.tech/rest/api/2/user/columns", {
                  "headers": {
                  "accept": "application/json, text/javascript, */*; q=0.01",
                  "accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7",
                  "content-type": "application/json",
                  "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest"
                  },
                  "referrer": day_djoby,
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": "{\"columns\":[\"issuetype\",\"issuekey\",\"summary\",\"resolution\",\"priority\",\"created\",\"assignee\",\"updated\"]}",
                  "method": "PUT",
                  "mode": "cors",
                  "credentials": "include"
                })));
                return true;
      }
  }
});   

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'search_that_vim') {
          var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project+%3D+VIM+AND+issuetype+%3D+Bug+AND+status+%21%3D+Closed+AND+Reports+%21%3D+EMPTY+ORDER+BY+cf%5B15410%5D+DESC";
          
          fetch(day_djoby, {
            mode: 'no-cors',
            method: 'get',
            credentials: "include"
          })   
          .then(response => response.text())
          .then((data) => {
            
            let page = document.createElement('html');
                document.body.append(page);
                page.innerHTML = data;
                
                var findTable = document.getElementById("issuetable").innerHTML;// Найдем таблицу на странице
                let responсe = findTable;
                page.innerHTML ="";
                sendResponse(responсe); })                          
      }
      return true;
  }
});   


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'search_that_last_vim') {
          var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project%20in%20(%22Vimbox%20Platform%22%2C%20%22Video%20Platform%22%2C%20%22Student%20Cabinet%22)%20AND%20issuetype%20%3D%20Bug%20AND%20status%20!%3D%20Closed%20AND%20created%20%3E%3D%20-4w%20ORDER%20BY%20created%20DESC%2C%20cf%5B11107%5D%20ASC";
          
        
          fetch(day_djoby, {
            mode: 'no-cors',
            method: 'get',
            credentials: "include"
          })   
          .then(response => response.text())
          .then((data) => {
            
            let page = document.createElement('html');
                document.body.append(page);
                page.innerHTML = data;
                
                var findTable = document.getElementById("issuetable").innerHTML;// Найдем таблицу на странице
                let responсe = findTable;
                page.innerHTML ="";
                sendResponse(responсe); });                           
      }
      return true;
  }
}); 

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'columns_jira') {
          var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project%20in%20(TS%2C%20VIM%2C%20BILL%2C%20CONV%2C%20DSTR%2C%20EDU%2C%20KGL%2C%20KIDS%2C%20C0%2C%20ST%2C%20STUDCAB)%20AND%20issuetype%20%3D%20Bug%20AND%20resolution%20%3D%20Unresolved%20AND%20updated%20>%3D%20-1w%20ORDER%20BY%20updated%20DESC";
          fetch("https://jira.skyeng.tech/rest/api/2/user/columns", {
          "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
          },
          "referrer": day_djoby,
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"columns\":[\"issuekey\",\"summary\"]}",
          "method": "PUT",
          "mode": "cors",
          "credentials": "include"
        });
      };
    };
  });


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'search_recently_task') {
          var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project%20in%20(TS%2C%20VIM%2C%20BILL%2C%20CONV%2C%20DSTR%2C%20EDU%2C%20KGL%2C%20KIDS%2C%20C0%2C%20ST%2C%20STUDCAB)%20AND%20issuetype%20%3D%20Bug%20AND%20resolution%20%3D%20Unresolved%20AND%20updated%20>%3D%20-1w%20ORDER%20BY%20updated%20DESC";
          
          fetch(day_djoby, {
            mode: 'no-cors',
            method: 'get',
            credentials: "include"
          })   
          .then(response => response.text())
          .then((data) => {
            
            let page = document.createElement('html');
                document.body.append(page);
                page.innerHTML = data;
                
                var findTable = document.getElementById("issuetable").innerHTML;// Найдем таблицу на странице
                let responсe = findTable;
                page.innerHTML ="";
                sendResponse(responсe); });                
      }
      return true; 
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { //Функция отрисовки html в bg + get запрос
  if (request.name === "Plus_eto_ne_minus") {
      if (request.question == 'close_columns_jira') {
        var day_djoby = "https://jira.skyeng.tech/sr/jira.issueviews:searchrequest-html-current-fields/temp/SearchRequest.html?jqlQuery=project+%3D+VIM+AND+issuetype+%3D+Bug+AND+status+%21%3D+Closed+AND+Reports+%21%3D+EMPTY+ORDER+BY+cf%5B15410%5D+DESC";
        fetch("https://jira.skyeng.tech/rest/api/2/user/columns", {
        "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
        },
        "referrer": day_djoby,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"columns\":[\"issuetype\",\"issuekey\",\"summary\",\"resolution\",\"priority\",\"created\",\"assignee\",\"updated\"]}",
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
        });
        return true;
      }
  }
});
