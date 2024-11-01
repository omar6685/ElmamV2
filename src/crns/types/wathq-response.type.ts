export type TWathqInfoResponse = {
  crName: string;
  crNumber: string;
  crEntityNumber: string;
  issueDate: string;
  expiryDate: string;
  crMainNumber: string;
  crMainEntityNumber: string;
  businessType: {
    id: string;
    name: string;
  };
  fiscalYear: {
    month: number;
    day: number;
    calendarType: {
      id: number;
      name: string;
    };
  };
  status: {
    id: string;
    name: string;
    nameEn: string;
  };
  cancellation: {
    date: string;
    reason: string;
  };
  location: {
    id: string;
    name: string;
  };
  company: {
    period: string;
    startDate: string;
    endDate: string;
  };
  activities: {
    description: string;
    isic: [
      {
        id: string;
        name: string;
        nameEn: string | null;
      },
    ];
  };
};
