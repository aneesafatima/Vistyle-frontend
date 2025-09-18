type DesignHouse =
  | "theminimalist"
  | "thedreamer"
  | "therebel"
  | "theiconic"
  | "thetrendsetter"
  | "thevintagesoul"
  | "theexplorer"
  | "theromantic";
type userDataType = {
  name: string;
  email: string;
  interests: string[];
  username: string;
  description?: string;
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
  // cart: {
  //   code: string;
  //   title: string;
  //   url: string;
  //   price: number;
  //   size: string;
  // }[];
};
type updatedUserDataType = Pick<
  userDataType,
  "name" | "description" | "designHouse"
> & {
  password?: string | undefined;
  passwordConfirm?: string | undefined;
  newpassword?: string | undefined;
};
type EditProfileType = {
  label: string;
  placeholder?: string;
  type: "text" | "password";
  name: keyof updatedUserDataType;
};

type CartItemType = {
  code: string;
  title: string;
  url: string;
  price: number;
  size: string;
  img:string
}