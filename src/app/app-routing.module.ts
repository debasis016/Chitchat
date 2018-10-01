import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { NameComponent } from './components/name/name.component';

const routes: Routes = [
  { path: '', component: NameComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', component: NameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
