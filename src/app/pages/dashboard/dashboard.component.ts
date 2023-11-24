import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private authService = inject(AuthService);
  
  public user = computed(() => this.authService.currentUser());
 
}
