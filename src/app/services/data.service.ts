import { Tip } from './../models/Tip';
import { Ev } from './../models/Ev';
import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();;
  constructor(
    public http: HttpClient
  ) { }

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }
  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }

  
  TipListele() {
    return this.http.get<Tip[]>(this.apiUrl + "types");
  }
  TipById(id: number) {
    return this.http.get<Tip>(this.apiUrl + "types/" + id);
  }
  TipEkle(tip: Tip) {
    return this.http.post(this.apiUrl + "types/", tip);
  }
  TipDuzenle(tip: Tip) {
    return this.http.put(this.apiUrl + "types/" + tip.id, tip);
  }
  TipSil(id: number) {
    return this.http.delete(this.apiUrl + "types/" + id);
  }

  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }


  EvListele() {
    return this.http.get<Ev[]>(this.apiUrl + "houses");
  }
  EvListeleByTipId(TipId: number) {
    return this.http.get<Tip[]>(this.apiUrl + "categories/" + TipId + "/lessons");
  }
  EvById(id: number) {
    return this.http.get<Ev>(this.apiUrl + "houses/" + id);
  }
  EvEkle(Ev: Ev) {
    return this.http.post(this.apiUrl + "houses/", Ev);
  }
  EvDuzenle(Ev: Ev) {
    return this.http.put(this.apiUrl + "houses/" + Ev.id, Ev);
  }
  EvSil(id: number) {
    return this.http.delete(this.apiUrl + "houses/" + id);
  }
}