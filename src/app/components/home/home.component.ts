import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  islem: boolean = false;
  
  ackapa: boolean = false;
  
  gunler: Array<string> = ["Pazartesi", "Salı", "Çarşamba"]
  secGun: string = "Gün Seçiniz";
  constructor(
    public servis: DataService
  ) { }

  ngOnInit(): void {
  }


Goster() {
  this.islem = true;
}
Gizle() {
  this.islem = false;
}
GosterGizle() {
  this.islem = !this.islem;
}






}
