
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ListResolver } from './_resolvers/lists.resolver';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/Alertfy.service';
import { AuthService } from './_services/auth.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonsModule } from 'ngx-bootstrap/buttons/buttons.module';
import { MessagesResolver } from './_resolvers/message.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { TimeAgoPipe } from './_pipes/time-ago-pipe';


export function getAccessToken(): string {
return localStorage.getItem('token');
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
  whitelistedDomains: ['localhost:5000']
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),


  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ListResolver,
    MessagesResolver,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
