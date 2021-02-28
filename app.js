var clicks = 0;

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function onClick() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks
  };
	

var win_html3 = `<div style="display: flex;">
<button id="btn" type="button" onClick="onClick()"> Нажми на меня </button>
  <p>Количество обращений в Support tab: <a id="clicks">0</a></p> 
          </div>`;

let wint3 = document.createElement('div');
document.body.append(wint3);
wint3.style = 'min-height: 20px; max-height: 750px; min-width: 35px; max-width: 370px; background: wheat; top:405px ; left:562px;   font-size: 14px; z-index: 20; position: fixed; border: 1px solid rgb(56, 56, 56); color: black';
wint3.innerHTML = win_html3;

document.getElementById('btn').onclick = function (){
  clicks += 1;
  document.getElementById("clicks").textContent = clicks;

  function myFunc () {
    supportTabNew = clicks;
    supportTabOld = supportTabNew;


  }

  }


let findElement = document.querySelector('[data-fieldtypecompletekey="com.atlassian.jira.plugin.system.customfieldtypes:float"]');

var supportTabOld,supportTabNew;

if(findElement !== null )
{
  console.log("Я нашел Support Tab");
  findElement[1];
  supportTabOld = document.getElementById("customfield_15410-val").textContent;
  supportTabOld = parseInt(supportTabOld);
  console.log("Слышь, тут support tab =", supportTabOld);
  
  clicks = supportTabOld;
  document.getElementById("clicks").textContent = clicks;


  //supportTabNew = clicks;


}

  







