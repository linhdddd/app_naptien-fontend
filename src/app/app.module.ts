import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { MatTableModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UsertableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule // <-- here
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
