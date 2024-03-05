import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CheckboxItem } from 'src/app/models/general/checkbox-item.model';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent implements OnChanges {
  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues: string[];
  @Output() toggle = new EventEmitter<any[]>();

  constructor() {}

  onToggle() {
    const checkedOptions = this.options.filter((x) => x.checked);
    this.selectedValues = checkedOptions.map((x) => x.value);
    this.toggle.emit(checkedOptions.map((x) => x.value));
  }
  ngOnChanges() {
    if (this.selectedValues) {
      this.selectedValues.forEach((value) => {
        const element = this.options.find((x) => x.value === value);
        if (element) {
          element.checked = true;
        }
      });
    }
  }
}
