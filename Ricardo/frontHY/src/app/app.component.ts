import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { user } from './models/user';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontHY';
  
  
  role: string = '';
  constructor(private loginService: LoginService, private router:Router) {}

  eliminar(){
    sessionStorage.clear();
  }

 

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

  isMod() {
    return this.role === 'MODERADOR';
  }

  isClient() {
    return this.role === 'CLIENTE';
  }
}
