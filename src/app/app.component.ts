import { Component } from '@angular/core'
import { MatIconAnchor } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink, RouterOutlet } from '@angular/router'


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterLink,
        MatIconAnchor,
        MatIcon,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {

}
