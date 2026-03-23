import { Component, computed, effect, inject, input, output, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'pe-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  title = input<string>('');
  showModal = input<boolean>(false);
  dismiss = output<void>();
  modalRef = output<NgbModalRef>();

  private modalService = inject(NgbModal);

  hasTitle = computed(() => !isStringNullOrEmpty(this.title()));

  @ViewChild('modal')
  private modalTemplate!: TemplateRef<any>;

  constructor() {
    effect(() => {
      if (this.showModal()) this.open();
    })
  }

  open() {
    const modalReference = (
      this.modalService
          .open(
            this.modalTemplate, {
              ariaLabelledBy: 'modal-basic-title',
              centered: true
            })
    );
    this.modalRef.emit(modalReference);
  }
}
