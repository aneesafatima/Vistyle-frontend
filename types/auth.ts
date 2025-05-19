export type LoginResponseType = {
    token: string;
    user: {
      name: string;
      email: string;
      interests: string[]; 
      username: string; 
      description: string;
      designHouse: DesignHouse;
    };
  };