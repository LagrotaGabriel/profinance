import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelViewComponent } from './painel-view/ts/painel-view.component';

const routes: Routes = [
  {
    path: '',
    component: PainelViewComponent,
    children: [
      {
        path: 'transacao',
        loadChildren: () => import('./modules/transacao/transacao-routing.module').then(m => m.TransacaoRoutingModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./modules/categoria/categoria-routing.module').then(m => m.CategoriaRoutingModule)
      },
      {
        path: '**',
        redirectTo: 'transacao'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }