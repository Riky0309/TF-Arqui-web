import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { CommentByUserDTO } from '../models/CommentByUserDTO';
import { UserBySubscriptionDTO } from '../models/UserBySubscriptionDTO';
import { UserByForumDTO } from '../models/UserByForumDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserrService {

  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<user[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<user[]>(this.url);
  }
  insert(p: user) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: user[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<user>(`${this.url}/${id}`);
  }
  update(c:user) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getCommentsByUser(): Observable<CommentByUserDTO[]> {
    return this.httpClient.get<CommentByUserDTO[]>(`${this.url}/comentarios-por-usuario`);
  }
  getUsersBySubscription(): Observable<UserBySubscriptionDTO[]> {
    return this.httpClient.get<UserBySubscriptionDTO[]>(`${this.url}/usuarios-por-suscripcion`);
  }
  getUserByForumDTO(): Observable<UserByForumDTO[]> {
    return this.httpClient.get<UserByForumDTO[]>(`${this.url}/cantidadusers`);
  }
}
