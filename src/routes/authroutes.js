import Register from "../views/authentication/register";
import Register2 from "../views/authentication/register2";
import Lockscreen from "../views/authentication/lockscreen";
import Recoverpwd from "../views/authentication/recover-pwd";
import Maintanance from "../views/authentication/maintanance";

//added new logins
import Login from "../views/authentication/login/login";
import ResetPassword from "../views/authentication/login/resetPassword";
import ChangePassword from "../views/authentication/login/changePassword";
import Subscription from "../views/authentication/subscription";
import StripeProvider from "../views/authentication/stripe/stripe";
import PatientSignup from "../views/authentication/patientSignup/patientSignup";
import ProviderSignup from "../views/authentication/providerSignup/providerSignup";

var authRoutes = [
  {
    path: "/authentication/register",
    name: "Register",
    icon: "mdi mdi-account-plus",
    component: Register
  },
  {
    path: "/authentication/register2",
    name: "Register with Firebase",
    icon: "mdi mdi-account-plus",
    component: Register2
  },
  {
    path: "/authentication/lockscreen",
    name: "Lockscreen",
    icon: "mdi mdi-account-off",
    component: Lockscreen
  },
  {
    path: "/authentication/recover-pwd",
    name: "Recover Password",
    icon: "mdi mdi-account-convert",
    component: Recoverpwd
  },
  {
    path: "/authentication/maintanance",
    name: "Maintanance",
    icon: "mdi mdi-pencil-box-outline",
    component: Maintanance
  },
  //added new login
  {
    path: "/authentication/subscription",
    name: "Subscription Plan",
    icon: "mdi mdi-account-plus",
    component: Subscription
  },
  {
    path: "/authentication/stripe",
    name: "Subscription Plan",
    icon: "mdi mdi-account-plus",
    component: StripeProvider
  },
  {
    path: "/authentication/login",
    name: "Provider Login",
    icon: "mdi mdi-account-key",
    component: Login
  },
  {
    path: "/authentication/resetPassword",
    name: "Provider Login",
    icon: "mdi mdi-account-key",
    component: ResetPassword
  },
  {
    path: "/api/user/resetForm",
    name: "Provider Login",
    icon: "mdi mdi-account-key",
    component: ChangePassword
  },
  {
    path: "/authentication/patientSignup",
    name: "Patient Signup",
    icon: "mdi mdi-account-plus",
    component: PatientSignup
  },
  {
    path: "/authentication/providerSignup",
    name: "providerSignup Signup",
    icon: "mdi mdi-account-plus",
    component: ProviderSignup
  }
];
export default authRoutes;
