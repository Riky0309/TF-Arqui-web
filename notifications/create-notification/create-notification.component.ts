import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { user } from '../../../models/user';
import { NotificationService } from '../../../services/notification.service';
import { UserrService } from '../../../services/userr.service';


import { noti } from '../../../models/noti';



@Component({
  selector: 'app-create-notification',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.css'
})
export class CreateNotificationComponent {

  notification: noti=new noti();
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  listarUser: user[]=[];

  



  statu:{ value: Boolean; viewValue: string }[] = [
    { value: true, viewValue: 'ACTIVO' },
    { value: false, viewValue: 'INACTIVO' }
  
  ];
  constructor(
    private sS:NotificationService,
    private router:Router,
    private shS:UserrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      
    });
    this.form= this.formBuilder.group({
      IdNotification:[''],
      title:['',Validators.required],
      description: ['',Validators.required],
      statu:['',Validators.required],
      username:['',Validators.required]
      
    });
    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
  }


  aceptar(): void {
    if (this.form.valid) {
      
      this.notification.idNotification= this.form.value.IdNotification;
      this.notification.titleNotification = this.form.value.title;
      this.notification.descriptionNotification = this.form.value.description;
      this.notification.statusNotification = this.form.value.statu;
      this.notification.user.id = this.form.value.username;
      this.sS.insert(this.notification).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate(['Notification']);
    }
  }

  

}
