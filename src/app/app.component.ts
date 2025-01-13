import { Component } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'scrapping-tool';

  constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || "en");
  }

  useLanguage(language: string): void {
    this.translate.use(language);
}
    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
