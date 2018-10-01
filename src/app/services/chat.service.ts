import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message, UserMessage } from '../model/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatService implements OnDestroy {
  chatBotUrl = 'http://messages.getsandbox.com/messages';
  chatBotName = 'Echo Bot';
  conversation = new BehaviorSubject<Message[]>([]);
  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    this.conversation.unsubscribe();
  }

  update(message: Message) {
    this.conversation.next([message]);
  }

  post(message: string, chatUser: string): any {
    const botMessage: UserMessage = {'message': message};
    const userMessage: Message = {'text': message, 'sentBy': chatUser};
    let result: Message;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.update(userMessage);
    this.http.post(this.chatBotUrl, botMessage, options)
      .subscribe((res: UserMessage) => {
        result = {text: res.message, sentBy: this.chatBotName};
        this.update(result);
      });
    return result;
  }
}

