import { Component, inject, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  constructor(private modelService: NgbModal){}

  modal = inject(NgbActiveModal);

  open() {
    this.modelService.open(this, { ariaLabelledBy: 'modal-basic-title',  windowClass: 'custom-class' }).result.then(
      (result) => {
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
}

