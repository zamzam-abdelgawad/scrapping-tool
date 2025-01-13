import { Routes } from '@angular/router';
import { UploadComponent } from './common/upload/upload.component';
import { GalleryComponent } from './common/gallery/gallery.component';

export const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];
