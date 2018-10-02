import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  chatUser: string;
  form: any;
  submitted = false;
  constructor(private chatService: ChatService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  isValid(control: any) {
    return this.form.controls[control].invalid;
  }

  get frm() { return this.form.controls; }

  goToChat() {
    this.submitted = true;
    if (this.frm.name.valid) {
      this.router.navigate(['/chat'], { queryParams: { name: this.chatUser } });
    }
  }
}
