import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Injectable()
export class MytoasterService {

  public readonly config = new ToasterConfig({
    positionClass: 'toast-bottom-full-width',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'slideUp',
    limit: 5,
    showCloseButton: false,
  });

  constructor() { }

}
