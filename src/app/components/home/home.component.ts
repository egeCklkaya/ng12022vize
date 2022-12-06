import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Ev } from 'src/app/models/Ev';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  islem: boolean = false;

  
  ackapa: boolean = false;

  constructor(
    public servis: DataService
  ) { }

  ngOnInit(): void {
  }

GosterGizle() {
  this.islem = !this.islem;

}





}
