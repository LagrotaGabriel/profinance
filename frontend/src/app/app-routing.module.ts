import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'painel',
        loadChildren: () => import('./painel/painel.routes').then(m => m.PainelRoutingModule)
      },
      {
        path: '**',
        redirectTo: 'painel'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
