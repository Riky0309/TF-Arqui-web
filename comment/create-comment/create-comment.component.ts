import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { user } from '../../../models/user';
import { CommentService } from '../../../services/comment.service';
import { UserrService } from '../../../services/userr.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-create-comment',
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
    MatInputModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  comment: Comment= new Comment();
  listarUser: user[]=[];

  constructor(
    private sS:CommentService,
    private router:Router,
    private shS:UserrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idComment: [''],
      descripcion: ['', Validators.required],
      username: ['', Validators.required]
    });

    this.shS.list().subscribe((data) => {
      this.listarUser = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      console.log('Formulario:', this.form.value) // ver en consola
      this.comment.idComment = this.form.value.idComment;
      this.comment.descriptionComment = this.form.value.descripcion;
      this.comment.user.id = this.form.value.username;

      if (this.edicion) {
        this.sS.update(this.comment).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.comment).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }

      this.router.navigate(['/comments']);
    }
  }
  
  init(): void {
    if (this.edicion) {
      
      this.sS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idComment: data.idComment,
          descripcion: data.descriptionComment,
          username: data.user.id
        });
      });
    }
  }
}
