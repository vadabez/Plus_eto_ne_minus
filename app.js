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
	

var win_html3 = `<div style="cursor: -webkit-grab; display: flex; ">
<button id="btn" type="button" onClick="onClick()"> Нажми на меня </button>
  <p>Количество обращений в Support tab: <a id="clicks">0</a></p> 
          </div>`;




var url = window.location.href;



if( url.includes('jira.skyeng.tech')){
  let wint3 = document.createElement('div');
  document.body.append(wint3);
  wint3.style = 'min-height: 20px; max-height: 750px; min-width: 35px; max-width: 370px; background: wheat; top:405px ; left:562px;   font-size: 14px; border: 1px solid rgb(56, 56, 56); color: white;position: absolute; background: black;';
  wint3.innerHTML = win_html3;
}
else{
  
                
  if(url.includes('skyeng.autofaq.ai')){
    var win_html4 = `<div style="display: flex;  ">
                  <span style="cursor: -webkit-grab;">
                    <input id='devjira' style="margin:5px;placeholder="Вставь таску с jira сюда"> </input>
                  </span>
                </div>`;


    let wint4 = document.createElement('div');
    document.body.append(wint4);
    wint4.style = 'min-height: 20px; max-height: 750px; min-width: 35px; max-width: 370px; back ground: wheat; top: 10px; left:500px; font-size: 14px; border: 1px solid rgb(56, 56, 56); color: white;position: absolute; z-index: 20; width: 10%; background: black;';
    wint4.innerHTML = win_html4;  
  }
  
}






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

  







