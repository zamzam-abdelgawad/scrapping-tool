import { Routes } from '@angular/router';
import { UploadComponent } from './common/upload/upload.component';
import { GalleryComponent } from './common/gallery/gallery.component';
import { HomeComponent } from './common/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent},
  { path: 'upload', component: UploadComponent },
  { path: 'gallery', component: GalleryComponent },
];
