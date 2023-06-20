import { Component, Input } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
@Input() buttonLabel = ""
@Input() buttonColor = "var(--default-green)"
@Input() textColor = "var(--default-white)"
@Input() imgPath = ""
}
