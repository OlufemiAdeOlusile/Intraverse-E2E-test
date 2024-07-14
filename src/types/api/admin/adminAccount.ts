type PasswordRetry = {
  numberOfRetry: number;
  timestamp: string;
};

type UserData = {
  passwordRetry?: PasswordRetry;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  googleId: string | null;
  paystackId?: string | null;
  accountStatus: string;
  roles: string[];
  reference?: string;
  automaticLogout?: number;
  passwordExpiry?: string;
  hasPassword?: boolean;
  isLive?: boolean;
  isEmailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  detail?: string;
  userType?: string;
};

export type AccountResponse = {
  message: string;
  data: {
    token?: string;
    account: UserData;
  };
};

export type adminActivatedResponse = {
  message: string;
  data: UserData;
};
