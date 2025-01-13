import { DataSharingService } from './../../data-sharing.service';
import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ButtonModule, GalleriaModule, CommonModule, CheckboxModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  urlData:any[]=[]

  constructor(private router: Router, private DataService: DataSharingService) { }

  ngOnInit(): void {
    this.DataService.fetchUrlData('./assets/hosny_urls.json').subscribe((data)=>{
      this.urlData=data.map((item,index)=>({
        id:index,
        isSelected:true,
        urls: item,
      }))
      console.log(this.urlData)
    })
  }


  //   { id: 2, alt: 'El-Sadat', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  //   { id: 3, alt: 'El-Sadat Memorial2', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  //   { id: 4, alt: 'El-Sadat Memorial3', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  //   { id: 5, alt: 'El-Sadat Memorial4', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  //   { id: 6, alt: 'El-Sadat Memorial5', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  //   { id: 7, alt: 'El-Sadat Memorial6', imgUrl: 'http://surl.li/myupkl', isSelected: true },
  // ];

  // Initialize displayCustom with a boolean value
  displayCustom: boolean = false;
  activeIndex: number = 0;
  isChecked: boolean = true;

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}

unSelected(id: number): void {
  this.urlData.forEach((item) => {
    if (item.id === id) {
      item.isSelected = false;
    }
  });
}


remove() {
  this.urlData = this.urlData.filter(item => item.isSelected);
  console.log("Updated Data:", this.urlData);
}


  onImagesChange(event: any) {
    this.urlData = event.value;
  }

  onVisibleChange(event: any) {
    this.displayCustom = event.value;
  }

      loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

  goToUpload() {
    this.router.navigate(['/upload']);
  }
}
