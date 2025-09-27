import { Routes } from '@angular/router';
import { PredictionsComponent } from './components/predictions/predictions.component';

export const routes: Routes = [
  { path: '', component: PredictionsComponent },
  { path: '**', redirectTo: '' }
];
