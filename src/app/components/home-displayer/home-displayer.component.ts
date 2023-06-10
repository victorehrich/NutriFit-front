import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-displayer',
  templateUrl: './home-displayer.component.html',
  styleUrls: ['./home-displayer.component.scss']
})
export class HomeDisplayerComponent {
@Input() title:string = ""
@Input() subtitle:string = ""
@Input() itens:string[] = []

}
