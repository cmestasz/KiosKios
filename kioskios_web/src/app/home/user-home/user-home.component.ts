import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { EMPTY_USER } from '../../constants';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent{
  user: User = EMPTY_USER;
  constructor(private authService: AuthService){
    this.authService.getUser().subscribe(
      user => {
        console.log("Recibiendo usuario en el componente User: " + user);    
        this.user = user;
    });
  }

}
