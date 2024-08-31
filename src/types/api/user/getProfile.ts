export type AccountDetail = {
  address?: {
    businessLocation?: string;
    location?: any[];
  };
  legalInfo?: {
    taxIdentification?: string;
    companyNumber?: string;
  };
  contact?: {
    firstName?: string;
    lastName?: string;
    position?: string;
    email?: string;
    phoneNumber?: string;
  };
  crmData?: {
    hero?: {
      images?: any[];
    };
    aboutUs?: {
      sections?: any[];
      values?: any[];
    };
    contact?: {
      categories?: any[];
      workingDays?: any[];
      holidays?: any[];
      socials?: any[];
    };
    destinations?: any[];
    quickInfo?: any[];
    banners?: any[];
  };
  _id?: string;
  agencyLogo?: string;
  agencyName?: string;
  agencyType?: string;
  registeredBusinessName?: string;
  tradingName?: string;
  businessPhone?: string;
  businessEmail?: string;
  commissionRate?: number;
  typeOfBusiness?: string;
  goalsWithMiles?: any[];
  interestedIn?: any[];
  haveScheduledTraining?: boolean;
  members?: any[];
  otherDocs?: any[];
  isProfileComplete?: boolean;
  numberOfIssuedTickets?: number;
  numberOfBookings?: number;
  isVerified?: boolean;
  requestedVerification?: boolean;
  createdAt?: string;
  updatedAt?: string;
  CACC07Doc?: string;
  CACCO2Doc?: string;
  CACCertificateDoc?: string;
  identityVerificationDoc?: string;
};

export type Account = {
  passwordRetry?: {
    numberOfRetry?: number;
    timestamp?: string;
  };
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userType?: string;
  googleId?: string | null;
  paystackId?: string;
  accountStatus?: string;
  roles?: string[];
  reference?: string;
  automaticLogout?: number;
  passwordExpiry?: string;
  hasPassword?: boolean;
  isLive?: boolean;
  isEmailVerified?: boolean;
  detail?: AccountDetail;
  createdAt?: string;
  updatedAt?: string;
};

export type SubscriptionPlan = {
  subscriptionId?: string;
  emailToken?: string;
  _id?: string;
  account?: string;
  paystackId?: string;
  transaction?: string;
  plan?: {
    _id?: string;
    name?: string;
    paystackId?: string;
    mode?: string;
    description?: string;
    durationInDays?: number;
    initialSetupFee?: number;
    price?: number;
    pricePerTeamMember?: number;
    applyBookingFee?: boolean;
    color?: string;
    features?: string[];
    privileges?: string[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  startDate?: string;
  isSubscriptionActive?: boolean;
  needsAttention?: boolean;
  isOnFreeTrial?: boolean;
  amount?: number;
  isAnnual?: boolean;
  isOldSubscription?: boolean;
  pendingCancellation?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Profile = {
  message?: string;
  data?: {
    account?: Account;
    subscriptionPlan?: SubscriptionPlan;
  };
};
