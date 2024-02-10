import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PocketMonsterListComponent } from './pocket-monster-list/pocket-monster-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PocketMonsterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-poke-api';
}
