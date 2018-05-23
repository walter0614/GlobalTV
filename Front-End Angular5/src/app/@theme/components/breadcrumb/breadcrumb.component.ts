import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

  @Input() data: string;
  options: Breadcrumb[] = [];

  constructor(private router : Router) { }

  ngOnInit() {
    var splitted = this.data.split(",", 10);
    for (let entry of splitted) {
      this.options.push({
        Name: entry.split(":", 10)[0],
        Url: entry.split(":", 10)[1],
        //Icon: entry.split(":", 10)[2]
      });
    }
  }

}


class Breadcrumb {
  public Name: string;
  public Url: string;
  //public Icon: string;
}
