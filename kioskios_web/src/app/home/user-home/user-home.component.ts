import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  user: User | undefined;
  constructor(private authService: AuthService){
    
  }

  ngOnInit(): void {
    this.user = this.authService.getUserLoaded();
  }
}
