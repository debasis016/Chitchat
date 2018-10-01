import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Message } from '../../model/message';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chatUser: string;
  inputMessage: string;
  @ViewChild('chatContainer') private chatContainer: ElementRef;
  messages: Observable<Message[]>;
  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((param: any) => {
      this.chatUser = param.params['name'];
      console.log(param.params['name']);
    });

    this.messages = this.chatService.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));
  }

  ngAfterViewChecked() {
    this.scrollDown();
  }

  scrollDown() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.chatService.post(this.inputMessage, this.chatUser);
    this.inputMessage = '';
  }
}
