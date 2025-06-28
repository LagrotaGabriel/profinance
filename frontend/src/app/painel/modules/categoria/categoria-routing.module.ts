import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'listagem',
        // loadChildren: () => import('./listagem/listagem.module').then(m => m.ListagemModule)
    },
    {
        path: '**',
        redirectTo: 'listagem'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }
