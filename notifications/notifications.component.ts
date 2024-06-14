import { Component, OnInit } from '@angular/core';
import { ListNotificartionComponent } from './list-notificartion/list-notificartion.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ListNotificartionComponent,RouterOutlet],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}

}
