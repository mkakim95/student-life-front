import {Injectable} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  @BlockUI() blockUI: NgBlockUI;

  constructor() {
  }

  blockStart() {
    this.blockUI.start('Подождите, идет загрузка...');
  }

  blockStop() {
    if (this.blockUI.isActive) {
      this.blockUI.stop();
    }
  }
}
