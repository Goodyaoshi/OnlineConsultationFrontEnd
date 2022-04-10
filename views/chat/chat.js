var chatbox = document.querySelector('#chatbox'),chatInput = document.querySelector('#chat_input'),chatSend = document.querySelector('#chat_input_button');
function createInfo(name,value,position,headIcon)
{
    value=value.replace(/(((ht|f)tps?):\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g,function(content){
        return "<a href='http://"+content+"' class='chat-address' target='view_window' style='color:#6666cc '>"+content+'</a>';;
    });	
    var chatNode = document.createElement('div'),
    chatImg = document.createElement('img'),
    chatName = document.createElement('span'),
    chatContent = document.createElement('span');
    chatNode.classList.add('c'+position);
    chatNode.classList.add('cmsg');
    chatImg.classList.add('headIcon');
    chatImg.classList.add('radius');
    chatImg.src = headIcon;
    chatName.classList.add('name');
    chatName.innerHTML = name;
    chatContent.classList.add('content');
    chatContent.innerHTML =value;
    chatNode.appendChild(chatImg);
    chatNode.appendChild(chatName);
    chatNode.appendChild(chatContent);
    chatbox.appendChild(chatNode);
    chatbox.scrollTop = chatbox.scrollHeight;
}
createInfo('智能客服','您好','left','../../static/img/service.jpg');
var timer,timerId,flagInput=false,shiftDown = false;
/*检测是否输入空字符*/
function chatHintNull(chatHint){
    setTimeout(function(){
        chatHint.fadeIn();
        clearTimeout(timerId);
        timer = setTimeout(function() {
            chatHint.fadeOut();
        }, 1000);
    }, 10);
    timerId = timer;
};
/*监控是否按下enter*/
function isEnter(Input,Hint,type,e){
    e = e||window.event;
    /*按住shift键*/
     if (e.keyCode == 16) {
        shiftDown = true;
    }
    if(e.keyCode==13)
    {
        if(shiftDown==true)
        { 
            shiftDown=false; 
            return true;
        }
        else if(shiftDown==false&&Input.value == '')
        {
            Hint();
            return true;
        }
        else 
        {
            e.preventDefault();
            createInfo(type,Input.value,'right','../../static/img/service.jpg');
            submityouText(Input.value);
            Input.value = null;
            Input.focus();
        }
    }
}
/*输入框按enter*/
chatInput.addEventListener('keydown', function(e) {
    e = e||window.event;
    isEnter(chatInput,chatHintNull,'傻逼',e);
})
/*为按钮绑定事件*/
chatSend.click(function(){
    /*消息框发送*/
    if(chatInput.value!='')
    {
        createInfo('傻逼',chatInput.value,'right','../../static/img/service.jpg');
        submityouText(chatInput.value);
        chatInput.value = null;
        chatInput.focus();
        
    }
    else
    {
        chatHintNull(chatHint);
    }
});
/*提交问题得到回复*/
function submityouText(text) {
    // 后端回复
    var num = Math.random() * 10;
    // 模拟一些后端传输数据
    var serviceData = {
        'robot': {
            'chat': ['Google一下吗？www.google.com','这个网站您看一下https://www.grapecity.com.cn/career/challenge.htm', '稍等哦~','嘿嘿','百度一下？www.baidu.com','嗯嗯嗯'],
        }
    };
    if (num <= 7) {
        getServiceText(serviceData);
    }
}

function getServiceText(data) {/*已定义后台消息框*/
    var serviceText = data.robot.chat,
        i = Math.floor(Math.random() * serviceText.length);
    createInfo('智能客服',serviceText[i],'left','../../static/img/service.jpg');
}