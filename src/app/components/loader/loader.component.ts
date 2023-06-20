import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  @Input()
  condition: Boolean = true;
  
  @Input()
  size: number = 40
  
  @Input()
  color: string = document.documentElement.style.getPropertyValue('--spinner-color')
  constructor() {
    document.documentElement.style.setProperty('--spinner-color', this.color);
  }
  ngOnChanges(changes: SimpleChanges): void {
    document.documentElement.style.setProperty('--spinner-color', this.color);
  }
}
