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
  description: string;
  designHouse: DesignHouse;
  id: string;
};
type updatedUserDataType = Pick<
  userDataType,
  "name" | "description" | "designHouse"
>;