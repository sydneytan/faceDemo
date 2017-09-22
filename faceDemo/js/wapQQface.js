(function($,window,document,undefined){
    $.fn.facePackage = function(options){
        var setting = $.extend({
            src:'images/',
            editor:'reditor',
            faceBox:'faceBox'
        },options);

        //输入提示
        $('#'+setting.editor).focus(function(){
            $(this).attr('data-placeholder','');
        })
        $('#'+setting.editor).blur(function(){
            if($.trim($(this).html())==''){
                $(this).attr('data-placeholder','我要回复...(80个字以内)');
            }
        });

        //将表情内容添加到指定的表情div中
        var faceStr = '<div class="swiper-wrapper">';
        var tempStr = '';
        for(var i=0;i<4;i++){
            tempStr += '<div class="swiper-slide facePanel'+(i+1)+'"><div class="faceImg">'
            for (var j=0;j<21;j++){
                tempStr += '<button data-index="'+j+'" data-panel="'+i+'"></button>'
            }
            tempStr += '</div></div>';
        }
        faceStr = faceStr+tempStr+'</div><div class="swiper-pagination"></div>';
        $('#'+setting.faceBox).addClass('swiper-container').append(faceStr);

        $('#'+setting.faceBox +' button').unbind('click').bind('click',function(){
            var index = parseInt($(this).attr('data-index'));
            var panel = parseInt($(this).attr('data-panel'));
            var imgSrc = panel*21+index;
            $('#'+setting.editor).focus();
            insertHtmlAtCaret('<img src="'+setting.src+imgSrc+'.png" style="height:0.9rem;width: 0.9rem;"/>');
        });
        //点击表情按钮，显示表情内容
        $(this).click(function(){
            if($(this).hasClass('open')){
                $('#'+setting.faceBox).fadeOut('fast');
                $(this).removeClass('open');
            }else{
                po_Last_Div(setting.editor);
                if($(this).hasClass('initSwp')){
                    $('#'+setting.faceBox).show('fast');
                    $(this).addClass('open');
                }else{
                    $('#'+setting.faceBox).show();
                    var sp = new Swiper('.faceBox',{
                        speed:300,
                        pagination: '.swiper-pagination',
                    });
                    $('#'+setting.faceBox).addClass('initSwp');
                    $(this).addClass('open');
                }
            }
        });
    }
    //在div中编辑的光标位置后面插入表情图片
    function insertHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }
    //光标在所有内容最后
    function po_Last_Div(id) {
        var obj = document.getElementById(id);
        if (window.getSelection) {                  //ie11 10 9 ff safari
            obj.focus();                            //解决ff不获取焦点无法定位问题
            var range = window.getSelection();      //创建range
            range.selectAllChildren(obj);           //range 选择obj下所有子内容
            range.collapseToEnd();                  //光标移至最后
        }
        else if (document.selection) {                     //ie10 9 8 7 6 5
            var range = document.selection.createRange();  //创建选择对象
            range.moveToElementText(obj);                  //range定位到obj
            range.collapse(false);                         //光标移至最后
            range.select();
        }
    }

})(jQuery,window,document)