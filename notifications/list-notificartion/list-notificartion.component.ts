import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { noti } from '../../../models/noti';


@Component({
  selector: 'app-list-notificartion',
  standalone: true,
  imports: [MatButtonModule,
            MatTableModule,
            MatFormFieldModule,
            RouterLink,
            MatPaginatorModule,
            MatInputModule  ,
            MatIconModule],
  templateUrl: './list-notificartion.component.html',
  styleUrl: './list-notificartion.component.css'
})
export class ListNotificartionComponent implements OnInit{
  dataSource: MatTableDataSource<noti> = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdNotification',
    'title',
    'description',
    'statu',
    'idusers',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(private sS:NotificationService){}
ngOnInit(): void {
  this.sS.list().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    
  });
  this.sS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    
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
