import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { ListComponent } from './list/list.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

export const appRoutes: Routes = [
{  path: 'home', component: HomeComponent },
{  path: '',
   runGuardsAndResolvers: 'always',
   canActivate: [AuthGuard],
   children: [
    { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    { path: 'messages', component: MessagesComponent},
    { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    { path: 'lists', component: ListComponent},
   ]
},

{ path: '**', redirectTo: 'home', pathMatch: 'full' },

];
