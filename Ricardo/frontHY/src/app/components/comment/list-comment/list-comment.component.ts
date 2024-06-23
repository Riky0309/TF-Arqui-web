import { AfterViewInit, Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommentService } from '../../../services/comment.service';

import { AppComponent } from '../../../app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Comment } from '../../../models/Comment';


@Component({
  selector: 'app-list-comment',
  standalone: true,
  imports: [MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,NgIf,RouterOutlet],
  templateUrl: './list-comment.component.html',
  styleUrl: './list-comment.component.css'
})
export class ListCommentComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<Comment>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: CommentService, private aPP: AppComponent){}
  ngOnInit(): void {
    this.sS.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortSchedules(data));
    })
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortSchedules(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(this.sortSchedules(data));
      });
    });
  }

  sortSchedules(horariosss: Comment[]): Comment [] {
    return horariosss.sort((a, b) => a.idComment - b.idComment);
  }
  
  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }
  isMOD(): boolean {
    return this.aPP.isMod();
  }
  isCLIENT(): boolean {
    return this.aPP.isClient();
  }


}