// routes.js

//Landing Pages
import Intro from "./Pages/LandingPage/intro";
import CounselorIntro from "./Pages/LandingPage/counselorIntro";

import ContactUs from "./Pages/contact";

//User Login
import UserLogin from "./Pages/Logins/User/UserLogin";
import UserSignUp from "./Pages/Logins/User/UserForm";

//Counselor Login
import CounselorLogin from "./Pages/Logins/Counselor/CounselorLogin";
import CounselorSignUp from "./Pages/Logins/Counselor/CounselorForm";

//Pages
import Dashboard from "./Pages/Dashboard/dashboard";
import Temp from "./Pages/temp";
import Survey from "./Components/Survey/survey";
import Error404 from "./Pages/Error404";

const routes = [
  {
    path: "/",
    component: Intro,
    key: "intro",
  },
  {
    path: "/counselor",
    component: CounselorIntro,
    key: "counselor",
  },
  {
    path: "/contact-us",
    component: ContactUs,
    key: "contact",
  },

  {
    path: "/user-login",
    component: UserLogin,
    key: "user-login",
  },
  {
    path: "/user-signup",
    component: UserSignUp,
    key: "user-signup",
  },
  {
    path: "/counselor-login",
    component: CounselorLogin,
    key: "counselor-login",
  },
  {
    path: "/counselor-signup",
    component: CounselorSignUp,
    key: "counselor-signup",
  },

  {
    path: "/dashboard",
    component: Dashboard,
    key: "dashboard",
  },
  {
    path: "/temp",
    component: Temp,
    key: "temp",
  },
  {
    path: "/survey",
    component: Survey,
    key: "survey",
  },
  {
    path: "*",
    element: <Error404 />,
    key: "error-404",
  },
];

export default routes;
