import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  user: User | undefined;
  constructor(private authService: AuthService){
    this.authService.getUser().subscribe(
      user => {
        this.user = user
      }
    );
  }
}
