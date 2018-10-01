import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  chatUser: string;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  goToChat() {
    this.router.navigate(['/chat'], { queryParams: { name: this.chatUser } });
  }
}
