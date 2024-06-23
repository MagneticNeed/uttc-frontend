// export const getData = JSON.parse(sessionStorage.getItem('userData') || '{}');

// export type UserType = {
//     id: string;
//     username: string;
//     email: string;
//     password: string;
//     };

export type UserType = {
    id: string;
    email: string;
    username: string;
  };
  
  export const getData = (): UserType => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData) as UserType;
    }
    throw new Error('User data not found in sessionStorage');
  };
  