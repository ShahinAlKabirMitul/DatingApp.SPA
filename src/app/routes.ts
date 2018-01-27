import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { ListComponent } from './list/list.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes.guard';
import { ListResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
{  path: 'home', component: HomeComponent },
{  path: '',
   runGuardsAndResolvers: 'always',
   canActivate: [AuthGuard],
   children: [
    { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    { path: 'messages', component: MessagesComponent},
    { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'member/edit', component: MemberEditComponent,
         resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    { path: 'lists', component: ListComponent, resolve: {users: ListResolver}},
   ]
},

{ path: '**', redirectTo: 'home', pathMatch: 'full' },

];
