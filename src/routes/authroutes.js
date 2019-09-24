import Login from '../views/authentication/login';
import Login2 from '../views/authentication/login2';
import Register from '../views/authentication/register';
import Register2 from '../views/authentication/register2';
import Lockscreen from '../views/authentication/lockscreen';
import Recoverpwd from '../views/authentication/recover-pwd';
import Maintanance from '../views/authentication/maintanance';

//added new logins
import PatientLogin from '../views/authentication/patientLogin';
import Subscription from '../views/authentication/subscription';
import PatientSignup from '../views/authentication/patientSignup/patientSignup';
import ProviderSignup from '../views/authentication/providerSignup/providerSignup';

var authRoutes = [
    { path: '/authentication/login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },
    { path: '/authentication/login2', name: 'Login with Firebase', icon: 'mdi mdi-account-key', component: Login2 },
    { path: '/authentication/register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
    { path: '/authentication/register2', name: 'Register with Firebase', icon: 'mdi mdi-account-plus', component: Register2 },
    { path: '/authentication/lockscreen', name: 'Lockscreen', icon: 'mdi mdi-account-off', component: Lockscreen },
    { path: '/authentication/recover-pwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd },
    { path: '/authentication/maintanance', name: 'Maintanance', icon: 'mdi mdi-pencil-box-outline', component: Maintanance },
    //added new login
    { path: '/authentication/patientLogin', name: 'Patient Login', icon: 'mdi mdi-account-key', component: PatientLogin },
    { path: '/authentication/subscription', name: 'Subscription Plan', icon: 'mdi mdi-account-plus', component: Subscription },
    { path: '/authentication/patientSignup', name: 'Patient Signup', icon: 'mdi mdi-account-plus', component: PatientSignup },

    { path: '/authentication/providerSignup', name: 'providerSignup Signup', icon: 'mdi mdi-account-plus', component: ProviderSignup },
];
export default authRoutes; 