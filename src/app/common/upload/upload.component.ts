import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [
    FileUploadModule,
    ButtonModule,
    BadgeModule,
    ToastModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [MessageService],
})
export class UploadComponent {
  files: any[] | null = null;
  uploadedFiles: any[] | null = null;
  totalSize: number = 0;
  readonly validExtensions = ['xlsx', 'xls'];
  readonly maxSize = 1_000_000; // 1MB in bytes

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router
  ) {}

  choose(event: any, callback: Function) {
    callback();
  }

  onRemoveTemplatingFile(
    event: any,
    file: any,
    removeFileCallback: Function,
    index: number
  ) {
    removeFileCallback(event, index);
    this.totalSize -= file.size;
    this.totalSize = Math.max(this.totalSize, 0); // Ensure totalSize is not negative
  }

  onClearTemplatingUpload(clear: Function) {
    clear();
    this.totalSize = 0;
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
    this.files = event.currentFiles.filter((file: File) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (this.isValidFile(fileExtension, file.size)) {
        this.totalSize += file.size;
        return true;
      } else {
        this.showInvalidFileMessage(file.name);
        return false;
      }
    });
  }

  private isValidFile(fileExtension: string | undefined, fileSize: number): boolean {
    return this.validExtensions.includes(fileExtension!) && fileSize <= this.maxSize;
  }

  private showInvalidFileMessage(fileName: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Invalid File',
      detail: `File "${fileName}" is not a valid Excel file.`,
    });
  }

  uploadEvent(callback: Function) {
    callback();
    console.log('First');
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

  goToHome() {
    this.router.navigate(['/']);
  }
}
