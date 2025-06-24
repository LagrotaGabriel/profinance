import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelViewComponent } from './painel-view/ts/painel-view.component';

const routes: Routes = [
  {
    path: '',
    component: PainelViewComponent,
    children: [
      {
        path: 'listagem',
        loadChildren: () => import('./modules/listagem/listagem.module').then(m => m.ListagemModule)
      },
      {
        path: 'cadastro',
        loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule)
      },
      {
        path: '**',
        redirectTo: 'listagem'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }