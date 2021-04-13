import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from './../../../shared/services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, public modalService: ModalService) { }

  ngOnInit() {
  }
  logout(): void {
    console.log('User is successfully logged out.')
    this.authService.signOut();
  }
  openAndLogout(logout){
    this.open(logout);
    this.logout();
  }
 open(content):void{
   this.modalService.open(content)
  }
}
