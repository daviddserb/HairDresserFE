export interface MyToken {
    username: string;
    password: string;
    //Microsoft claim URI for role (e.g. admin/employee/customer).
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}