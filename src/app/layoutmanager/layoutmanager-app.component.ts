import { Component, OnInit, } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layoutmanager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: []
})
export class LayoutmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon('Catalogos', (sanitizer.bypassSecurityTrustResourceUrl('assets/icons/avatars.svg')));
  }

  ngOnInit() {
    this.router.navigate(['/Configuracion/Usuarios']);
  }

}
