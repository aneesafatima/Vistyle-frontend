export type LoginResponseType = {
  token: string;
  user: {
    name: string;
    email: string;
    interests: string[];
    username: string;
    description: string;
    designHouse: DesignHouse;
    id: string;
    stickers: {
      category: string;
      position: string;
      price: number;
      url: string;
      code: string;
      _id: string;
    }[];
    cart: {
      code: string;
      title: string;
      url: string;
      price: number;
      size: string;
      img:string;
    }[];
  };
};
