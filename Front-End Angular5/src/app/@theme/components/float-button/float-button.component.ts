import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {

  constructor(private router : Router,private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }
  Logout(){
    this.router.navigate(['/auth']);
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

}
