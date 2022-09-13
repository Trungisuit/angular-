import { MasterPageComponent } from "./shared/components/master-page/master-page.component";
import { ProfileUserComponent } from "./features/profile-user/profile-user.component";
import { NotFoundComponent } from "./features/not-found/component/not-found/not-found.component";
import { UserListingComponent } from "./features/user-listing/user-listing.component";
import { CreateNewpassComponent } from "./features/forgot-password/components/create-newpass/create-newpass.component";
import { LoginComponent } from "./features/login/components/login.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as Guard } from "./shared/services/auth-guard.service";
import { LogoutComponent } from "./features/log-out/logout/logout.component";
import { CheckComponent } from "./features/check/check.component";
import { ForgotPasswordComponent } from "./features/forgot-password/components/forgot-password/forgot-password.component";
import { ListingUserComponent } from "./features/listing-user/listing-user.component";
import { ListingComponentsComponent } from "./features/listing/listing-components/listing-components.component";
import { ChangePasswordComponent } from "./features/change-password/change-password.component";

const router: Routes = [
  {
    path: "components",
    component: CheckComponent,
  },
  { path: "logout", component: LogoutComponent },
  {
    path: "login",
    component: LoginComponent,
    children: [],
  },
  {
    path: "listuser",
    component: UserListingComponent,
    canActivate: [Guard],
  },
  {
    path: "home",
    component: ListingComponentsComponent,
    canActivate: [Guard],
  },

  { path: "forgot-password", component: ForgotPasswordComponent },

  {
    path: "listing/:tagname",
    component: ListingUserComponent,
    canActivate: [Guard],
  },
  { path: "changepassword", component: ChangePasswordComponent },
  { path: "profile/:id", component: ProfileUserComponent },
  { path: "create-newpassword", component: CreateNewpassComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
