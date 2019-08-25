package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.ChatMessage;

@Controller
public class ChatController { //채팅방 기본 기능 구현
	private List<ChatMessage> messages;
	
	ChatController() {
		messages = new ArrayList<>();
	}
	
	@RequestMapping("/chat/main")
	public String showMain() {
		return "chat/main";
	}
	
	@RequestMapping("/chat/addMessage")
	@ResponseBody
	public Map addMessage(String writer, String body) {
		long id = messages.size();
		ChatMessage newMessage = new ChatMessage(id,writer,body);
		messages.add(newMessage);
		
		Map<String,Object> rs = new HashMap<>();
		
		rs.put("msg", "채팅 메세지가 추가되었습니다.");
		rs.put("resultCode", "S-1");
		rs.put("addedMessage", newMessage);
		
		return rs;
	}
	
	@RequestMapping("/chat/getAllMessages")
	@ResponseBody
	public List<ChatMessage> getAllMessages() {
		return messages;
	}
	
	@RequestMapping("/chat/getMessages")
	@ResponseBody
	public List<ChatMessage> getMessages(int from) {
		return messages.subList(from, messages.size());
	}
	
	@RequestMapping("/chat/clearMessage")
	@ResponseBody
	public Map clearMessage() {
		messages.clear();
		
		Map<String,Object> rs = new HashMap<>();
		
		rs.put("msg", "메세지가 모두 삭제되었습니다.");
		rs.put("resultCode", "S-1");
		
		return rs;
	}
}
