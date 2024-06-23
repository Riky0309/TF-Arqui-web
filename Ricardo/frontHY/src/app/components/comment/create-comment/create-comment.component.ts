import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { user } from '../../../models/user';
import { CommentService } from '../../../services/comment.service';
import { UserrService } from '../../../services/userr.service';
import { Comment } from '../../../models/Comment';


@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  coment:Comment=new Comment();
  ListarUser: user[] = [];

  constructor(
    private postService: CommentService,
    private forumService: UserrService,
    private router: Router,
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
      idC: [''],
      desciption: ['', Validators.required],
      idUser: ['', Validators.required]
    });

    this.forumService.list().subscribe((data) => {
      this.ListarUser = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.coment.idComment = this.form.value.idC;
      this.coment.descriptionComment = this.form.value.desciption;
      this.coment.user = { id: this.form.value.idUser } as user
      

      if (this.edicion) {
        this.postService.update(this.coment).subscribe(() => {
          this.postService.list().subscribe((data) => {
            this.postService.setList(data);
          });
          this.router.navigate(['comments']);
        });
      } else {
        this.postService.insert(this.coment).subscribe(() => {
          this.postService.list().subscribe((data) => {
            this.postService.setList(data);
          });
          this.router.navigate(['comments']);
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.postService.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idC: data.idComment,
          desciption: data.descriptionComment,
          forum: data.user.id
        });
      });
    }
  }
}