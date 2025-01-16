import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeAr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    const storedLang = localStorage.getItem('lang');

    this.translate.use(storedLang || browserLang || 'en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
