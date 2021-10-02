
const baseUrl = 'http://projectsshowcase.com:9002';
const base = baseUrl;
export const environment = {
  production: true,
  urlAddress: baseUrl,
   baseImageUrl:base,
  endPoints: {
    // auth: { signIn: `${baseUrl}/signIn` },
    auth:{master:`${baseUrl}/masterlogin`},
    Supervisor:{suplogin:`${baseUrl}/suplogin`},
    employee: {
      createEmployee: `${baseUrl}/path/to/create`,
      loginEmoployee: `${baseUrl}/login`,
    },
  },
};