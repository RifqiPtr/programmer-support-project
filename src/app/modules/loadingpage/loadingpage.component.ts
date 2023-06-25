import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loadingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public title: string
  ){}
}
