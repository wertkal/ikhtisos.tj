interface Profession {
    professionId: string;
    professionName: string;
    createAt: string;
    notification: boolean;
  }
  
  interface User {
    userName: string;
    userEmail: string;
    userPhone: string;
    role: string;
    password: string;
    notification: any[];
  }
  
  interface DB {
    users: User[];
    data: {
      groupName: string;
      profession: Profession[];
    }[];
  }
  