import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() route : string = "";
  lastUrl : string = "";
  urlList: Array<string> = new Array<string> ();
  constructor() { }

  ngOnInit() {
     if(this.route){
        this.urlList =  this.route.split("/");
        this.lastUrl = this.urlList.pop();
     }
  }

}
