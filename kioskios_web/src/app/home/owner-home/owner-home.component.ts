import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  user$: Observable<User>;
  constructor(private authService: AuthService){
    this.user$ = this.authService.getUser();
  }
}
