var clicks = 0;
var jiraSupportTab;

let mstl = document.createElement('style');
document.body.append(mstl);
var style = `button:hover:not(:active) {
  background: linear-gradient(rgb(126,126,134), rgb(70,71,76)) rgb(126,126,134);
}

button:active {
  top: 1px;
  background: linear-gradient(rgb(76,77,82), rgb(56,57,62)) rgb(76,77,82);
  box-shadow:
   0 0 1px rgba(0,0,0,.5) inset,
   0 2px 3px rgba(0,0,0,.5) inset,
   0 1px 1px rgba(255,255,255,.1);
}`;

function plusClick() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks
  };

// function devJira() {
//     document.getElementById("devjira").innerHTML = jiraSupportTab
//     console.log("Ты написал = ", jiraSupportTab)
// };

	

var win_html3 = `<div id="draggable" style="cursor: -webkit-grab; display: flex; position: absolute; ">
<button id="btn" type="button" 
style="
  position: relative;
  display: inline-block;
  font-size: 90%;
  font-weight: 700;
  color: rgb(209,209,217);
  text-decoration: none;
  text-shadow: 0 -1px 2px rgba(0,0,0,.2);
  padding: .5em 1em;
  outline: none;
  border-radius: 3px;
  background: linear-gradient(rgb(110,112,120), rgb(81,81,86)) rgb(110,112,120);
  box-shadow:
  0 1px rgba(255,255,255,.2) inset,
  0 3px 5px rgba(0,1,6,.5),
  0 0 1px 1px rgba(0,1,6,.2);
  transition: .2s ease-in-out; "
  onclick="plusClick()"> Нажми на меня </button>
  <p 
    style="
    text-align: center;
    font-size: 90%;
    font-weight: 700;"> Количество обращений в Support tab: 
    <a style="text-decoration: none; cursor: default;" id="clicks">0</a></p> 
  </div>`;
  
  var win_html4 = `<div id="devjira" style="cursor: -webkit-grab; display: flex; position: absolute; ">
  <input type="text" id="task" placeholder="Напиши таску в jira здесь" onfocus="clearField(this);" > </input>
  <button id="btn_1" type="button" onclick="handleButtonClick3()"> +1 </button>
  </div>`;
 
  
  

var url = window.location.href;
let findComment = document.querySelector('[class = "chat-comment"]');



if( url.includes('skyeng.autofaq.ai')){
  let wint4 = document.createElement('div');
  document.body.append(wint4);
  wint4.style = 'min-height: 40px; max-height: 750px; min-width: 290px; max-width: 400px; background: wheat; top:16px ; left:400px;   font-size: 20px; font-weight: bold; border: 1px solid rgb(56, 56, 56); color: black;position: absolute; background: black;z-index:20;';
  wint4.innerHTML = win_html4; 

  var button2 = document.getElementById("btn_1")
  button2.onclick = handleButtonClick3;
  function handleButtonClick3() {
    var textInput = document.getElementById("task");
    var taskName = textInput.value;
    if(taskName == ""){
        console.log("Введите ссылку на задачу, пожалуйста");
    }else{
        var ul  =  document.getElementById("task");
        var li = document.createElement("li");
        li.innerHTML = taskName;
        ul.appendChild(li);


        console.log("Ты добавил новую таску " + taskName);
        // chrome.runtime.sendMessage({name: "Plus_eto_ne_minus", question: 'get_devjira', id: taskName}, function(response) {
        //   copyToClipboard(response.answer.data.link);
        // });
        chrome.runtime.sendMessage({name: "Plus_eto_ne_minus",question: 'get_devjira',id: taskName}, function(supportTabNew, issueID, token){
         chrome.runtime.sendMessage({name: "Plus_eto_ne_minus",question: 'plus_support_tab',id: supportTabNew, issueID, token});
        });


        textInput.value = "";
    }
  }
}


let findElement = document.querySelector('[data-fieldtypecompletekey="com.atlassian.jira.plugin.system.customfieldtypes:float"]');

var supportTabOld,supportTabNew;

if(findElement !== null )
{
  // console.log("Я нашел Support Tab");
  let wint3 = document.createElement('div');
  document.body.append(wint3);
  wint3.style = 'min-height: 50px; max-height: 750px; min-width: 370px; max-width: 400px; background: wheat; top:405px ; left:562px;   font-size: 14px; border: 1px solid rgb(56, 56, 56); color: white;position: absolute; background: black;z-index:20;';
  wint3.innerHTML = win_html3; 

  var drag = document.getElementById('draggable');
  var listener = function(e) {
    wint3.style.left =  Number(e.clientX - myX3) + "px";
    wint3.style.top =  Number(e.clientY - myY3) + "px";
  };
 
  drag.onmousedown = function (e) {
		window.myX3 = e.layerX; 
		window.myY3 = e.layerY; 
		document.addEventListener('mousemove', listener);
	}

  drag.addEventListener('mouseup', e => {
    document.removeEventListener('mousemove', listener);
  }); 
  
 
 

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
    .catch(error => console.log('error', error))
    window.location.reload();
    
  };

}

  

// Чтобы залить на jira через AF нужно это делать через fetch 
// отрисовать html страницу 
// Потом match и найти совпадение по reports..