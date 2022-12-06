import { Ev } from './../../models/Ev';
import { ActivatedRoute } from '@angular/router';
import { Tip } from 'src/app/models/Tip';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ev',
  templateUrl: './ev.component.html',
  styleUrls: ['./ev.component.scss']
})
export class EvComponent implements OnInit {
  evler!: Ev[];
  tipler!: Tip[];
  modal!: Modal;
  modalBaslik: string = "";
  secEv!: Ev;
  tipId: number = 0;
  secTip: Tip = new Tip();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    tipi: new FormControl(),
    kat: new FormControl(),
    boyut: new FormControl(),
    mahalle: new FormControl(),
    odasayi: new FormControl(),
    fiyat: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.tipId) {
        this.tipId = p.tipId;
        this.TipGetir();

      }
    });
    this.TipListele();
  }
  TipSec(tipId: number) {
    this.tipId = tipId;
    this.TipGetir();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.tipId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ev Ekle";
    this.modal.show();
  }
  Duzenle(ev: Ev, el: HTMLElement) {
    this.frm.patchValue(ev);
    this.modalBaslik = "Ev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ev: Ev, el: HTMLElement) {
    this.secEv = ev;
    this.modalBaslik = "Ev Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  EvListele() {
    this.servis.EvListele().subscribe(d => {
      this.evler = d;
    });
  }
  TipListele() {
    this.servis.TipListele().subscribe(d => {
      this.tipler = d;
    });
  }
  TipGetir() {
    this.servis.TipById(this.tipId).subscribe(d => {
      this.secTip = d;
      this.EvListele();
    });
  }
  EvEkleDuzenle() {
    var ev: Ev = this.frm.value
    if (!ev.id) {
      var filtre = this.evler.filter(s => s.fiyat == ev.fiyat);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Ev Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {

        this.servis.EvEkle(ev).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Ev Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.EvListele();
          this.modal.toggle();
        });
      }
    } else {
      this.servis.EvDuzenle(ev).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ev Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.EvListele();
        this.modal.toggle();
      });
    }

  }
  EvSil() {
    this.servis.EvSil(this.secEv.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ev Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.EvListele();
      this.modal.toggle();
    });
  }
}