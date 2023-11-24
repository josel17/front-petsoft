import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './util/spinner/spinner.component';
import { SharedService } from './services/shared-services.service';


@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:
  [
    SpinnerComponent
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
