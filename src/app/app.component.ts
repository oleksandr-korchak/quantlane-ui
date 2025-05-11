import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterOutlet } from '@angular/router'


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined')
    }

}
