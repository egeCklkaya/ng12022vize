import { EvComponent } from "./components/ev/ev.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guard/auth.guard";
import { MytoastService } from "./services/mytoast.service";
import { DataService } from "./services/data.service";
import { UyeComponent } from "./components/uye/uye.component";
import { TipComponent } from "./components/tip/tip.component";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from "@ngneat/hot-toast";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TipComponent,
    UyeComponent,
    LoginComponent,
    EvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
  ],
  providers: [DataService, MytoastService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }