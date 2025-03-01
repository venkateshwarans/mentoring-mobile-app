import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonRoutes } from 'src/global.routes';
import { PrivateGuard } from './core/guards/private.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[PrivateGuard]
  },
  {
    path: CommonRoutes.AUTH,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: CommonRoutes.SESSIONS,
    loadChildren: () => import('./pages/sessions/sessions.module').then(m => m.SessionsPageModule)
  },
  {
    path: CommonRoutes.FEEDBACK,
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: CommonRoutes.SESSIONS_DETAILS,
    loadChildren: () => import('./pages/session-detail/session-detail.module').then( m => m.SessionDetailPageModule)
  },
  {
    path: CommonRoutes.CREATE_SESSION,
    loadChildren: () => import('./pages/create-session/create-session.module').then( m => m.CreateSessionPageModule)
  },
  {
    path: CommonRoutes.CREATED_BY_ME,
    loadChildren: () => import('./pages/created-by-me/created-by-me.module').then( m => m.CreatedByMePageModule)
  },
  {
    path: CommonRoutes.EDIT_PROFILE,
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: CommonRoutes.HOME_SEARCH,
    loadChildren: () => import('./pages/home-search/home-search.module').then( m => m.HomeSearchPageModule)
  },
  {
    path: CommonRoutes.MENTOR_DETAILS,
    loadChildren: () => import('./pages/mentor-details/mentor-details.module').then( m => m.MentorDetailsPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
