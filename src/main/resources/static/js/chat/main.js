var chatWriter = prompt('이름을 입력해 주세요.');

function Chat_sendMessages(){
	var 메세지 = $('#chat-room .input-box #text-input').val();
    
    메세지 = 메세지.trim(); // 메시지 양끝에 있는 공백제거
    
    // 메세지 변수에 들어있는 값이 ''와 같다면
    if ( 메세지 == '' ) {
        // 함수를 더 이상 진행시키지 않고 여기서 종료시킨다.
        $('#chat-room .input-box #text-input').val('');
        $('#chat-room .input-box #text-input').focus();
        return false;
    }
    
    $.post('./addMessage',{
    	writer : chatWriter,
    	body : 메세지
    },function(data){
    	
    },'json');
    
    $('#chat-room .input-box #text-input').val('');
    $('#chat-room .input-box #text-input').focus();
}

var Chat_lastreceiveId = - 1;

function Chat_loadNewMessages(){
	$.get('./getMessages',{
		from : Chat_lastreceiveId + 1
	},function(data){
		for(var i = 0; i < data.length; i++) {
			var message = data[i];
			
			Chat_lastreceiveId = message.id;
			Chat_drawNewMessage(message);
		}
		setTimeout(Chat_loadNewMessages,1000);
	},'json');
}

function Chat_drawNewMessage(message) {
	var 메세지 = message.body;
	var writer = message.writer;
    
	var whoClassName = 'mine';
	
	if ( writer != chatWriter ) {
		whoClassName = 'other';
	}
	
    var html = ``;
    html += `<div class="chat-message ${whoClassName}">
    	<section><i class="fa fa-user"></i></section>
        <span>${writer}</span>
        <div>${메세지}</div>
    </div>
    `;
    
    $('#chat-room .message-group:last-child').append(html);
    $('#chat-room .message-box').scrollTop(99999999999);
}

$(function(){
	$('#chat-room .input-box .btn-submit').click(Chat_sendMessages);

	// input 창에서 키보드 눌림 이벤트 발생시 함수를 실행하도록 예약
	$('#chat-room .input-box #text-input').keydown(function(e) {
	    // 만약 입력한 키코드가 13, 즉 엔터라면 함수를 실행한다.
	    if ( e.keyCode == 13 ) {
	    	Chat_sendMessages();
	    }
	});
	Chat_loadNewMessages();
});