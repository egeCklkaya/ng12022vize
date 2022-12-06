import { Tip } from 'src/app/models/Tip';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  tipler!: Tip[];
  modal!: Modal;
  modalBaslik: string = "";
  secTip!: Tip;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.TipListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Tip Ekle";
    this.modal.show();
  }
  Duzenle(tip: Tip, el: HTMLElement) {
    this.frm.patchValue(tip);
    this.modalBaslik = "Tip Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(tip: Tip, el: HTMLElement) {
    this.secTip = tip;
    this.modalBaslik = "Tip Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  TipListele() {
    this.servis.TipListele().subscribe(d => {
      this.tipler = d;
    });
  }
  TipEkleDuzenle() {
    var tip: Tip = this.frm.value
    if (!tip.id) {
      var filtre = this.tipler.filter(s => s.adi == tip.adi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Tip Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        this.servis.TipEkle(tip).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Tip Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.TipListele();
          this.modal.toggle();
        });
      }
    } else {
      this.servis.TipDuzenle(tip).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Tip Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.TipListele();
        this.modal.toggle();
      });
    }

  }
  TipSil() {
    this.servis.TipSil(this.secTip.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Tip Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.TipListele();
      this.modal.toggle();
    });
  }
}