import { DataSharingService } from './../../data-sharing.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
export interface PageEvent {
  first?: number;      // Index of the first record
  rows?: number;       // Number of rows per page
  page?: number;       // Current page number (zero-based index)
  pageCount?: number;  // Total page count
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    ButtonModule,
    GalleriaModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    PaginatorModule,
    RippleModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  urlData: any[] = [];
  paginatedData: any[] = [];  // Data for the current page
  first: number = 0;          // First record index for paginator
  rows: number = 8;           // Number of rows per page
  displayCustom: boolean = false;
  activeIndex: number = 0;
  isChecked: boolean = true;
  loading: boolean = false;

  // Define responsive options for gallery display
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  constructor(
    private router: Router,
    private DataService: DataSharingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.DataService.fetchUrlData('./assets/hosny_urls.json').subscribe((data) => {
      this.urlData = data.map((item, index) => ({
        id: index,
        isSelected: true,
        urls: item,
      }));
      this.updatePaginatedData(); // Initialize paginated data
    });
  }

  // Handles image click event to show custom gallery
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  // Marks an item as unselected
  unSelected(id: number): void {
    this.urlData.forEach((item) => {
      if (item.id === id) {
        item.isSelected = false;
      }
    });
  }

  // Removes selected items and updates paginated data
  remove() {
    this.urlData = this.urlData.filter((item) => item.isSelected);
    this.updatePaginatedData(); // Recalculate paginated data after removal
    console.log("Updated Data:", this.urlData);
  }

  // Updates urlData based on gallery image change event
  onImagesChange(event: any) {
    this.urlData = event.value;
  }

  // Toggles the visibility of the custom gallery
  onVisibleChange(event: any) {
    this.displayCustom = event.value;
  }

  // Success toast message
  showSucToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Downloaded successfully' });
  }

  // Failure toast message
  showFalToast() {
    this.messageService.add({ severity: 'error', summary: 'Fail', detail: 'Download Failed' });
  }

  // Download function to send data to the backend
  download() {
    this.loading = true;

    this.DataService.sendDataToBackend(this.urlData).subscribe({
      next: (response) => {
        console.log('Data sent successfully:', response);
        this.showSucToast();
      },
      error: (error) => {
        console.error('Error sending data:', error);
        this.showFalToast();
        this.loading = false;
      }
    });
  }

  // Handles page change event for paginator
  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
    this.updatePaginatedData(); // Update data for the current page
  }

  // Updates the paginated data based on the current page
  updatePaginatedData() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedData = this.urlData.slice(start, end);
  }

  // Navigates to the upload page
  goToUpload() {
    this.router.navigate(['/upload']);
  }
}
