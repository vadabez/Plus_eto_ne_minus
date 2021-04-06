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

var docWidth, docHeight, docRatio, div = document.getElementsByTagName('div')[0];

onresize = function()
{
  docWidth = document.body.clientWidth;
  docHeight = document.body.clientHeight;
  // ширина и высота вьюпорта

  docRatio = docWidth / docHeight;
  // соотношение сторон вьюпорта

  fullScreenProportionalElem(div, 1920, 1080); // элемент, ширина, высота
  resizeFont(div, 1920, 1080, 200); // элемент, ширина, высота, размер шрифта
  // размер шрифта зависит от выставленной ширины и высоты
}

function fullScreenProportionalElem(elem, width, height)
{
  var ratio = width / height;
  // соотношение сторон элемента

  if (docRatio < ratio)
  {
    elem.style.width = docWidth + 'px';
    elem.style.height = Math.round(docWidth / ratio) + 'px';
    elem.style.top = Math.round(docHeight / 2 - elem.offsetHeight / 2) + 'px';
    elem.style.left = '0px';
    // высота вьюпорта больше чем высота элемента
    // ширину элемента приравниваем к ширине вьюпорта, высоту вычисляем, центрируем элемент по высоте
  }
  else if (docRatio > ratio)
  {
    elem.style.width = Math.round(docHeight * ratio) + 'px';
    elem.style.height = docHeight + 'px';
    elem.style.top = '0px';
    elem.style.left = Math.round(docWidth / 2 - elem.offsetWidth / 2) + 'px';
    // ширина вьюпорта больше чем ширина элемента
    // высоту элемента приравниваем к высоте вьюпорта, ширину вычисляем, центрируем элемент по ширине
  }
  else
  {
    elem.style.width = docWidth + 'px';
    elem.style.height = docHeight + 'px';
    elem.style.top = '0px';
    elem.style.left = '0px';
    // соотношение сторон вьюпорта равно соотношению сторон элемента
    // приравниваем стороны элемента к сторонам вьюпорта, обнуляем значения top и left
  }
}

function resizeFont(elem, width, height, size)
{
  var ratio = width / height;
  // соотношение сторон элемента
  
  if (docRatio < ratio) elem.style.fontSize = height * size / 14062 + 'vw';
  else if (docRatio > ratio) elem.style.fontSize = width * size / 14062 + 'vh';
  // число 14062 можно менять и подстраивать под себя, будет меняться размер шрифта
}


	

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
  
  var win_html4 = `<div id="devjira" style="background-color: black; cursor: -webkit-grab; display: flex; position: absolute; ">
  <input type="text" id="task" style="border-color: black;" placeholder="Напиши таску в jira здесь" onfocus="clearField(this);" > </input>
  <button id="btn_1" type="button" style="
  position: relative;
  display: inline-block;
  font-size: 15px;
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
  transition: .2s ease-in-out;" onclick="handleButtonClick3()"> +1 </button>

  <button id="search_task" type="button" style="
  position: relative;
  display: inline-block;
  font-size: 15px;
  font-weight: 700;
  color: rgb(209,209,217);
  text-decoration: none;
  margin-left: 5px;
  text-shadow: 0 -1px 2px rgba(0,0,0,.2);
  padding: .5em 1em;
  outline: none;
  border-radius: 3px;
  background: linear-gradient(rgb(110,112,120), rgb(81,81,86)) rgb(110,112,120);
  box-shadow:
  0 1px rgba(255,255,255,.2) inset,
  0 3px 5px rgba(0,1,6,.5),
  0 0 1px 1px rgba(0,1,6,.2);
  transition: .2s ease-in-out;" onclick="searchTask()"> Find </button>
  </div>
  <div>
    <table id="tablediv">
    </table>
  </div>
  `;

  var win_html5 = `<div id="devjora" style="cursor: -webkit-grab; display: flex; position: absolute; ">
  <input type="text" id="task_2" placeholder="Напиши таску в jira здесь" onfocus="clearField(this);" > </input>
  <button id="btn_2" type="button" style="
  position: relative;
  display: inline-block;
  font-size: 15px;
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
  transition: .2s ease-in-out;" onclick="handleButtonClick4()"> +1 </button>
  </div>`;

var url = window.location.href;


if( url.includes('skyeng.autofaq.ai')){
  if (localStorage.getItem('wint4TopAF') == null) {
    localStorage.setItem('wint4TopAF', '15');
    localStorage.setItem('wint4LeftAF', '400');
  }
  
  let wint4 = document.createElement('div');
  document.body.append(wint4);
  wint4.style = 'height: onresize(); width: onresize();  background: wheat; top: ' + localStorage.getItem('wint4TopAF') + 'px; left: ' + localStorage.getItem('wint4LeftAF') + 'px;   font-size: 15px; font-weight: bold; border: 1px solid rgb(56, 56, 56); color: black;position: absolute; background: black;z-index:20;';
  wint4.innerHTML = win_html4; 

  var listener2 = function(e , a) {
    wint4.style.left = Number(e.clientX - myX2) + "px";
    wint4.style.top = Number(e.clientY - myY2) + "px";
    localStorage.setItem('wint4TopAF', String(Number(e.clientY - myY2)));
    localStorage.setItem('wint4LeftAF', String(Number(e.clientX - myX2)));
  };

  wint4.onmousedown = function (a) {
    window.myX2 = a.layerX; 
    window.myY2 = a.layerY; 
    document.addEventListener('mousemove', listener2);
  }
  wint4.onmouseup = function () {document.removeEventListener('mousemove', listener2);}


  


  async function getInfo() {
    adr = document.location.href
    adr1 = document.location.pathname
    adr1 = adr1.split('/')
    adr1 = adr1[3]
    if(adr1 == undefined) {
      adr1 = ""
      sessionId = ""
    }
    else {
      a = await fetch("https://skyeng.autofaq.ai/api/conversations/"+adr1, {
    "headers": {
    "accept": "*/*",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
    },
    "referrer": adr,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  })
  .then(a => b = a.json()).then(b => {sessionId = b.sessionId; localStorage.setItem('serviceIdGlob', b.serviceId)});
    return [adr, adr1, sessionId]
  }}

  async function sendComment(txt){ 
    var values = await getInfo(0)
    adr = values[0]; adr1 = values[1]; uid = values[2]
    var txt2 = txt.split('\n').join('\\n') //экранирование текста
    var txt2 = txt2.split("\"").join("\\\"") //экранирование кавычек
    fetch("https://skyeng.autofaq.ai/api/reason8/answers", {
    "headers": {
    "accept": "*/*",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryH2CK1t5M3Dc3ziNW", //Показатель разделения строк
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
    },
    "referrer": adr,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "------WebKitFormBoundaryH2CK1t5M3Dc3ziNW\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n{\"sessionId\":\"" + uid + "\",\"conversationId\":\"" + adr1 + "\",\"text\":\"" + txt2 + "\",\"isComment\":true}\r\n------WebKitFormBoundaryH2CK1t5M3Dc3ziNW--\r\n",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
  }
  

  



  var button2 = document.getElementById("btn_1")
  button2.onclick = handleButtonClick3;
  function handleButtonClick3() {
    var textInput = document.getElementById("task");
    var taskName = textInput.value;
    if(taskName == ""){
        console.log("Введите ссылку на задачу, пожалуйста");
    }
    else{
        var ul  =  document.getElementById("task");
        var li = document.createElement("li");
        li.innerHTML = taskName;
        ul.appendChild(li);
        console.log("Ты добавил новую таску " + taskName);
        chrome.runtime.sendMessage({name: "Plus_eto_ne_minus",question: 'get_devjira',id: taskName});
        sendComment(document.getElementById('task').value);
        textInput.value = "";
        newTaggg(taskName);

        function newTaggg(tagName) {
          var chatId = document.location.pathname.split('/')[3]
          fetch("https://skyeng.autofaq.ai/api/conversation/" + chatId + "/payload", {
            "headers": {
            "content-type": "application/json",
            },
            "body": "{\"conversationId\":\"" + chatId + "\",\"elements\":[{\"name\":\"taskUrl\",\"value\":\"" + tagName + "\"}]}",
            "method": "POST",
            "credentials": "include"
          }); //Работает отлично, вот рекорд https://recordit.co/lvhOOVFr0O
        }
    }
  }
    var search_button = document.getElementById("search_task")
    search_button.onclick = searchTask;
    function searchTask(){
    var taskInput = document.getElementById("task");
    var nameTask = taskInput.value;
    if(nameTask == ""){
      console.log("Введите поисковый запрос, пожалуйста");
    }
    else{
      var ul2  =  document.getElementById("task");
      var li2 = document.createElement("li");
      li2.innerHTML = nameTask;
      ul2.appendChild(li2);
      console.log("Ты искал " + nameTask);
          chrome.runtime.sendMessage({name: "Plus_eto_ne_minus",question: 'search_that_summary',id: nameTask}, function(responсe){
            console.log("Summary таски = ", responсe);
            var table = document.getElementById("tablediv");
            table.style = 'color:white; overflow: scroll; background-color:black; width: 305px;';
            table.innerHTML = responсe; 
            table.children[0].style=`display: block;
            margin-top: 50px;`;
            table.children[1].style=`display: block;
            overflow: scroll;
            height: 417px;`;
          });  
      
      taskInput.value = "";
      
    }
  }   
}
else{
  if(url.includes('crm2.skyeng.ru')){
    if (localStorage.getItem('wint5TopAF') == null) {
      localStorage.setItem('wint5TopAF', '2');
      localStorage.setItem('wint5LeftAF', '840');
    }

    let wint5 = document.createElement('div');
    document.body.append(wint5);
    wint5.style = 'height: onresize(); width: onresize();  background: wheat; top: ' + localStorage.getItem('wint5TopAF') + 'px; left: ' + localStorage.getItem('wint5LeftAF') + 'px;   font-size: 15px; font-weight: bold; border: 1px solid rgb(56, 56, 56); color: black;position: absolute; background: black;z-index:20;';
    wint5.innerHTML = win_html5; 

    
    var listener3 = function(e , a) {
      wint5.style.left = Number(e.clientX - myX2) + "px";
      wint5.style.top = Number(e.clientY - myY2) + "px";
      localStorage.setItem('win5TopAF', String(Number(e.clientY - myY2)));
      localStorage.setItem('win5LeftAF', String(Number(e.clientX - myX2)));
    };
  
    wint5.onmousedown = function (a) {
      window.myX2 = a.layerX; 
      window.myY2 = a.layerY; 
      document.addEventListener('mousemove', listener3);
    }
    wint5.onmouseup = function () {document.removeEventListener('mousemove', listener3);}

    var button3 = document.getElementById("btn_2")
    button3.onclick = handleButtonClick4;
    function handleButtonClick4() {
    var textInput = document.getElementById("task_2");
    var taskName = textInput.value;
    if(taskName == ""){
        console.log("Введите ссылку на задачу, пожалуйста");
    }
    else{
        var ul  =  document.getElementById("task_2");
        var li = document.createElement("li");
        li.innerHTML = taskName;
        ul.appendChild(li);
        console.log("Ты добавил новую таску " + taskName);
        chrome.runtime.sendMessage({name: "Plus_eto_ne_minus",question: 'get_devjira',id: taskName});
        textInput.value = "";
      };
    };
  };
};


let findElement = document.querySelector('[data-fieldtypecompletekey="com.atlassian.jira.plugin.system.customfieldtypes:float"]');

var supportTabOld,supportTabNew;

if(findElement !== null )
{
  // console.log("Я нашел Support Tab");
  if (localStorage.getItem('TopAF') == null) {
    localStorage.setItem('TopAF', '348');
    localStorage.setItem('LeftAF', '750');
  }

  let wint3 = document.createElement('div');
  document.body.append(wint3);
  wint3.style = 'min-height: 50px; max-height: 750px; min-width: 370px; max-width: 400px; background: wheat; top: ' + localStorage.getItem('TopAF') + 'px; left: ' + localStorage.getItem('LeftAF') + 'px;  font-size: 15px; border: 1px solid rgb(56, 56, 56); color: white;position: absolute; background: black;z-index:20;';
  wint3.innerHTML = win_html3; 

  var listener = function(e , a) {
    wint3.style.left = Number(e.clientX - myX2) + "px";
    wint3.style.top = Number(e.clientY - myY2) + "px";
    localStorage.setItem('TopAF', String(Number(e.clientY - myY2)));
    localStorage.setItem('LeftAF', String(Number(e.clientX - myX2)));
  };

  wint3.onmousedown = function (a) {
    window.myX2 = a.layerX; 
    window.myY2 = a.layerY; 
    document.addEventListener('mousemove', listener);
  }
  wint3.onmouseup = function () {document.removeEventListener('mousemove', listener);}
  
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
