import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models/Comment';




const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = `${base_url}/comments`;
  private listaCambio = new Subject<Comment[]>();

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Comment[]>(this.url);
  }

  insert(p: Comment) {
    return this.httpClient.post(this.url, p);
  }

  setList(listaNueva: Comment[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Comment>(`${this.url}/${id}`);
  }

  update(p: Comment) {
    return this.httpClient.put(this.url, p);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
