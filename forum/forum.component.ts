import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListForumComponent } from './list-forum/list-forum.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterOutlet,ListForumComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}

