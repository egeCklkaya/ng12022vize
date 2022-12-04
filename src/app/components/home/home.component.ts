import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ad: string = "Akdeniz";
  sayi: number = 10;

  islem: boolean = false;
  
  ackapa: boolean = false;
  
  gunler: Array<string> = ["Pazartesi", "Salı", "Çarşamba"]
  secGun: string = "Gün Seçiniz";
  constructor() { }

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

GunBelirle(g: string) {
  this.secGun = g;
}



}
