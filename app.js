var clicks = 0;
var jiraSupportTab;

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function plusClick() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks
  };

// function devJira() {
//     document.getElementById("devjira").innerHTML = jiraSupportTab
//     console.log("Ты написал = ", jiraSupportTab)
// };

	

var win_html3 = `<div style="cursor: -webkit-grab; display: flex; ">
<button id="btn" type="button" onclick="plusClick()"> Нажми на меня </button>
  <p>Количество обращений в Support tab: <a id="clicks">0</a></p> 
          </div>`;




var url = window.location.href;
let findComment = document.querySelector('[class = "chat-comment"]');


if( url.includes('jira.skyeng.tech')){
  
}
else{
    if(findComment != null){
      console.log("Я нашел твой комментарий");

      // supportTabOld = document.getElementById("customfield_15410-val").textContent;
      // supportTabOld = parseInt(supportTabOld);
      // console.log("Слышь, тут support tab =", supportTabOld);
    };
  };

let findElement = document.querySelector('[data-fieldtypecompletekey="com.atlassian.jira.plugin.system.customfieldtypes:float"]');

var supportTabOld,supportTabNew;

if(findElement !== null )
{
  // console.log("Я нашел Support Tab");
  let wint3 = document.createElement('div');
  document.body.append(wint3);
  wint3.style = 'min-height: 20px; max-height: 750px; min-width: 35px; max-width: 370px; background: wheat; top:405px ; left:562px;   font-size: 14px; border: 1px solid rgb(56, 56, 56); color: white;position: absolute; background: black;';
  wint3.innerHTML = win_html3; 


  findElement[1];
  supportTabOld = document.getElementById("customfield_15410-val").textContent;
  supportTabOld = parseInt(supportTabOld);
  console.log("Слышь, тут support tab =", supportTabOld);
  
  clicks = supportTabOld;
  document.getElementById("clicks").textContent = clicks;

  document.getElementById('btn').onclick = function (){
    plusClick();
    supportTabNew = clicks;
    supportTabOld = supportTabNew;
    var token = document.cookie.match(/atlassian.xsrf.token=(.*?);/)[1];

    let findissueID = document.getElementById("key-val");


    if(findissueID!=null){
      var issueID;
      issueID = findissueID.getAttribute('rel');
      };
    
    fetch("https://jira.skyeng.tech/secure/AjaxIssueAction.jspa?decorator=none", {
      "headers": {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  },
      "body": `customfield_15410=${supportTabOld}&issueId=${issueID}&atl_token=${token}`, //https://jira.skyeng.tech/browse/VIM-11161/
      "method": "POST",
      "credentials": "include"
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  };

}

  

// Чтобы залить на jira через AF нужно это делать через fetch 
// отрисовать html страницу 
// Потом match и найти совпадение по reports..