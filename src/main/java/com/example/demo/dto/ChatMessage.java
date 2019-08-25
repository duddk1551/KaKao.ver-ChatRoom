package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

//lombok을 사용하면 DTO,VO,Entity관련 작업을 손쉽게 할 수 있다.
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessage {
	private long id;
	private String writer;
	private String body;
}
