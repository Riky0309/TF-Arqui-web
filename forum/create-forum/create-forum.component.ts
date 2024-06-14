import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { Router } from '@angular/router';
import { UserrService } from '../../../services/userr.service';
import { Forum } from '../../../models/forum';
import { user } from '../../../models/user';
import moment from 'moment';

@Component({
  selector: 'app-create-forum',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
],
  templateUrl: './create-forum.component.html',
  styleUrl: './create-forum.component.css'
})
export class CreateForumComponent {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  forum: Forum= new Forum();
  listarUser: user[]=[];


  constructor(
    private sS:ForumService,
    private router:Router,
    private shS:UserrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form= this.formBuilder.group({
      IdForum:[''],
      name:['',Validators.required],
      descripcion: ['',Validators.required],
      username:['',Validators.required]
      
    });
    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
}


aceptar(): void {
  if (this.form.valid) {
    
    this.forum.idForum= this.form.value.IdForum;
    this.forum.nameForum = this.form.value.name;
    this.forum.descriptionForum = this.form.value.descripcion;
    this.forum.user.id = this.form.value.username;
    this.sS.insert(this.forum).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });

    this.router.navigate(['forum']);
  }
}

init() {
  if (this.edicion) {
    this.sS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        IdForum: new FormControl(data.idForum),
        name: new FormControl(data.nameForum),
        descripcion: new FormControl(data.descriptionForum),
        username: new FormControl(data.user.id)
        
      });
    });
  }
}



}
