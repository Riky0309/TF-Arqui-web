import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { Forum } from '../../../models/forum';

@Component({
  selector: 'app-list-forum',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './list-forum.component.html',
  styleUrl: './list-forum.component.css'
})
export class ListForumComponent  implements OnInit{

  dataSource: MatTableDataSource<Forum> = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdForum',
    'name',
    'descripcion',
    'idusers',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private sS:ForumService){}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  eliminar(id: number) {
    this.sS.eliminar(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
  
}
