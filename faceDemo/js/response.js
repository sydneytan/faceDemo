
//var cssResponse = document.createElement('style');
//document.documentElement.firstElementChild.appendChild(cssResponse);

function setPxPerRem(){
    var dpr = 1;
    var winWidth = window.screen.width<window.screen.height?window.screen.width:window.screen.height;
    var pxPerRem = winWidth*dpr/20;
    //alert(document.documentElement.clientHeight+'---'+document.documentElement.clientWidth+'---'+window.screen.availWidth+'---'+window.screen.width);
    if(winWidth>640){
        pxPerRem = 32;
    }
    //cssResponse.innerHTML = 'html{font-size:'+pxPerRem+'px!important;}';
    document.documentElement.style.fontSize = pxPerRem + 'px';
}

setPxPerRem();








