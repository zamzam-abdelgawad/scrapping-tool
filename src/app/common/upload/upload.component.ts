import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule],
  providers: [MessageService]
})
export class UploadComponent {
  files: any[] | null = null;
  uploadedFiles: any[] | null = null;
  totalSize : number = 0;

  totalSizePercent : number = 0;

  constructor(private config: PrimeNGConfig, private messageService: MessageService, private router:Router) {}

  choose(event, callback) {
      callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onTemplatedUpload(event?: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Upload Successful',
      detail: 'Files have been uploaded successfully.',
    });

    if (event) {
      console.log('Uploaded files:', event.files);
    }
  }

  onSelectedFiles(event: any) {
    const validExtensions = ['xlsx', 'xls'];
    this.files = event.currentFiles.filter((file: File) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (validExtensions.includes(fileExtension!)) {
        this.totalSize += file.size;
        return true;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Invalid File',
          detail: `File "${file.name}" is not a valid Excel file.`,
        });
        return false;
      }
    });
  }

  uploadEvent(callback) {
    callback();
    console.log("first")
  }

  formatSize(bytes: number): string {
    const k = 1024;
    const dm = 2;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }
}
