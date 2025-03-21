export type LoginResponseType = {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };