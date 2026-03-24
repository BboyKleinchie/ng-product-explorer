import { Component, computed, input, output, signal } from '@angular/core';
import {
	NgbDropdown,
	NgbDropdownToggle,
	NgbDropdownMenu,
	NgbDropdownItem,
	NgbDropdownButtonItem,
} from '@ng-bootstrap/ng-bootstrap/dropdown';
import { isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'pe-dropdown',
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdownButtonItem],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class DropdownComponent {
  items = input.required<string[]>();
  label = input<string>();
  selected = output<string>();

  selectedItem$ = computed(() => {
    if (isStringNullOrEmpty(this.selectedItem())) return 'Select option';
    return this.selectedItem();
  });

  private selectedItem = signal<string>('');

  onItemSelected(item: string) {
    this.selectedItem.set(item);
    this.selected.emit(item);
  }
}
