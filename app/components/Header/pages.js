export const navPages = [
    {
      name: "Home",
      url: "/",
    },
   {
      name: "Events",
      url:"/events"
    },
    {
      name:"Blog",
      url:"/blog"
    },
]

export const servicePages = [
    //Either drop down for services or just flat link to it.
    {
      name:"Library",
      url:"https://ces.library.com"
    },
   {
      name:"3DPrinting",
      url:"https://ces.3Dprinting.com"
    }
    
];


const homeURL = "http://localhost:3000";


export const LOGIN_PATH = homeURL + "/users/login";
export const REGISTER_PATH = homeURL + "/users/register";
export const USER_PROFILE_PATH = homeURL + "/account/:uid";
export const PATHS_PATH = "/paths";



