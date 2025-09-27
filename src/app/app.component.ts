import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Sales Date Prediction App</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `mat-toolbar { font-weight: 600 }`
  ]
})
export class AppComponent {}