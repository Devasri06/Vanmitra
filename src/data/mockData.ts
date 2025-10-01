export const schemes = [
  {
    id: 1,
    name: "PM-Kisan Samman Nidhi",
    description: "Direct income support to farmers",
    eligibility: "Small & marginal farmers",
    amount: "₹6,000 per year",
    category: "Agriculture"
  },
  {
    id: 2,
    name: "Jal Jeevan Mission",
    description: "Piped water supply to every rural household",
    eligibility: "Rural households",
    amount: "₹3.60 lakh crore allocation",
    category: "Water & Sanitation"
  },
  {
    id: 3,
    name: "Forest Rights Act (FRA)",
    description: "Recognition of forest rights of forest dwelling communities",
    eligibility: "Scheduled Tribes & Traditional Forest Dwellers",
    amount: "Land ownership rights",
    category: "Forest Rights"
  },
  {
    id: 4,
    name: "MGNREGA",
    description: "100 days of guaranteed employment",
    eligibility: "Rural households",
    amount: "₹200-300 per day",
    category: "Employment"
  },
  {
    id: 5,
    name: "Pradhan Mantri Awas Yojana",
    description: "Housing for all by 2024",
    eligibility: "EWS, LIG, MIG families",
    amount: "₹2.5 lakh subsidy",
    category: "Housing"
  }
];

export const tribalGroups = [
  "Gond", "Santhal", "Bhil", "Oraon", "Mina", "Khond", "Sahariya", "Baiga", "Korku", "Halba"
];

export const states = [
  "Madhya Pradesh", "Chhattisgarh", "Odisha", "Jharkhand", "Maharashtra", 
  "Rajasthan", "Gujarat", "Andhra Pradesh", "Telangana", "Karnataka"
];

export const districts = {
  "Madhya Pradesh": ["Dindori", "Mandla", "Balaghat", "Seoni", "Chhindwara"],
  "Chhattisgarh": ["Bastar", "Dantewada", "Sukma", "Bijapur", "Narayanpur"],
  "Odisha": ["Mayurbhanj", "Keonjhar", "Sundargarh", "Sambalpur", "Kalahandi"]
};

export const villages = [
  "Amarpur", "Bamhangaon", "Chandrapur", "Dhanora", "Ghughari", 
  "Jamgaon", "Karanjia", "Lanjhi", "Mohgaon", "Narotara"
];

export const claimHolders = [
  {
    id: 1,
    name: "Ramesh Kumar Gond",
    fatherName: "Suresh Kumar Gond",
    village: "Amarpur",
    district: "Dindori",
    state: "Madhya Pradesh",
    tribalGroup: "Gond",
    claimType: "Individual Forest Rights (IFR)",
    landArea: "2.5 hectares",
    status: "Approved",
    submittedDate: "2024-01-15",
    documents: ["Ration Card", "Tribal Certificate", "Land Survey"],
    gpsCoordinates: "22.7196° N, 81.3469° E"
  },
  {
    id: 2,
    name: "Sita Devi Bhil",
    fatherName: "Mohan Lal Bhil",
    village: "Bamhangaon",
    district: "Bastar",
    state: "Chhattisgarh",
    tribalGroup: "Bhil",
    claimType: "Community Forest Resources (CFR)",
    landArea: "15.0 hectares",
    status: "Pending",
    submittedDate: "2024-02-20",
    documents: ["Ration Card", "Community Certificate"],
    gpsCoordinates: "19.0653° N, 81.9615° E"
  },
  {
    id: 3,
    name: "Arjun Singh Oraon",
    fatherName: "Birsa Singh Oraon",
    village: "Chandrapur",
    district: "Mayurbhanj",
    state: "Odisha",
    tribalGroup: "Oraon",
    claimType: "Community Rights (CR)",
    landArea: "8.5 hectares",
    status: "Under Review",
    submittedDate: "2024-03-10",
    documents: ["Ration Card", "Tribal Certificate", "Land Photos"],
    gpsCoordinates: "21.9288° N, 86.4985° E"
  },
  {
    id: 4,
    name: "Kamla Bai Sahariya",
    fatherName: "Ram Singh Sahariya",
    village: "Dhanora",
    district: "Dindori",
    state: "Madhya Pradesh",
    tribalGroup: "Sahariya",
    claimType: "Individual Forest Rights (IFR)",
    landArea: "1.8 hectares",
    status: "Rejected",
    submittedDate: "2024-01-28",
    documents: ["Ration Card"],
    gpsCoordinates: "22.8514° N, 81.2074° E"
  },
  {
    id: 5,
    name: "Prakash Mina",
    fatherName: "Lakhan Mina",
    village: "Ghughari",
    district: "Balaghat",
    state: "Madhya Pradesh",
    tribalGroup: "Mina",
    claimType: "Community Forest Resources (CFR)",
    landArea: "12.3 hectares",
    status: "Approved",
    submittedDate: "2024-02-05",
    documents: ["Ration Card", "Tribal Certificate", "Land Record", "Community Photos"],
    gpsCoordinates: "21.8047° N, 80.1901° E"
  }
];

export const mapLayers = {
  CR: [
    { id: 1, name: "Amarpur CR-001", coordinates: [81.3469, 22.7196], area: "25 hectares", status: "Approved" },
    { id: 2, name: "Chandrapur CR-002", coordinates: [86.4985, 21.9288], area: "18 hectares", status: "Pending" },
    { id: 3, name: "Mohgaon CR-003", coordinates: [80.5421, 22.1234], area: "32 hectares", status: "Under Review" }
  ],
  CFR: [
    { id: 1, name: "Bamhangaon CFR-001", coordinates: [81.9615, 19.0653], area: "150 hectares", status: "Approved" },
    { id: 2, name: "Ghughari CFR-002", coordinates: [80.1901, 21.8047], area: "123 hectares", status: "Approved" },
    { id: 3, name: "Karanjia CFR-003", coordinates: [85.2134, 20.7890], area: "89 hectares", status: "Pending" }
  ],
  IFR: [
    { id: 1, name: "Dhanora IFR-001", coordinates: [81.2074, 22.8514], area: "2.5 hectares", status: "Approved" },
    { id: 2, name: "Lanjhi IFR-002", coordinates: [79.8765, 21.5432], area: "1.8 hectares", status: "Rejected" },
    { id: 3, name: "Narotara IFR-003", coordinates: [82.1098, 23.0987], area: "3.2 hectares", status: "Under Review" }
  ],
  waterBodies: [
    { id: 1, name: "Narmada River", coordinates: [81.0000, 22.5000], type: "River" },
    { id: 2, name: "Mahanadi River", coordinates: [85.0000, 20.5000], type: "River" },
    { id: 3, name: "Indravati River", coordinates: [81.5000, 19.0000], type: "River" }
  ]
};

export const adminStats = {
  totalClaims: 2847,
  approved: 1823,
  pending: 687,
  rejected: 337,
  underReview: 156
};

export const analyticsData = {
  monthlyApprovals: [
    { month: "Jan", approvals: 145, rejections: 23 },
    { month: "Feb", approvals: 178, rejections: 34 },
    { month: "Mar", approvals: 203, rejections: 18 },
    { month: "Apr", approvals: 189, rejections: 28 },
    { month: "May", approvals: 234, rejections: 19 },
    { month: "Jun", approvals: 267, rejections: 25 }
  ],
  tribalDistribution: [
    { tribe: "Gond", claims: 856, percentage: 30 },
    { tribe: "Santhal", claims: 623, percentage: 22 },
    { tribe: "Bhil", claims: 512, percentage: 18 },
    { tribe: "Oraon", claims: 398, percentage: 14 },
    { tribe: "Others", claims: 458, percentage: 16 }
  ],
  landAreaDistribution: [
    { range: "0-2 hectares", count: 1245 },
    { range: "2-5 hectares", count: 867 },
    { range: "5-10 hectares", count: 423 },
    { range: "10+ hectares", count: 312 }
  ]
};

export const activityLogs = [
   {id: 1,
    timestamp: "2024-03-15 14:30:25",
    admin: "Admin User",
    action: "Approved claim",
    claimId: "FR-2024-001",
    details: "IFR claim for Ramesh Kumar Gond approved"
  },
  {
    id: 2,
    timestamp: "2024-03-15 11:15:42",
    admin: "Admin User",
    action: "Rejected claim",
    claimId: "FR-2024-002",
    details: "CFR claim rejected - Insufficient documentation"
  },
  {
    id: 3,
    timestamp: "2024-03-15 09:45:18",
    admin: "Admin User",
    action: "Updated claim status",
    claimId: "FR-2024-003",
    details: "Status changed to Under Review"
  },
  {
    id: 4,
    timestamp: "2024-03-14 16:20:55",
    admin: "Admin User",
    action: "Uploaded supporting document",
    claimId: "FR-2024-004",
    details: "Uploaded land ownership certificate"
  },
  {
    id: 5,
    timestamp: "2024-03-14 13:50:12",
    admin: "Admin User",
    action: "Created new claim",
    claimId: "FR-2024-005",
    details: "New claim submitted for Seema Sharma"
  },
  {
    id: 6,
    timestamp: "2024-03-13 18:10:37",
    admin: "Admin User",
    action: "Edited claim details",
    claimId: "FR-2024-006",
    details: "Updated applicant address"
  },
  {
    id: 7,
    timestamp: "2024-03-13 14:05:44",
    admin: "Admin User",
    action: "Deleted claim",
    claimId: "FR-2024-007",
    details: "Claim removed due to duplicate entry"
  },
  {
    id: 8,
    timestamp: "2024-03-12 11:22:09",
    admin: "Admin User",
    action: "Sent claim for review",
    claimId: "FR-2024-008",
    details: "Claim sent to senior officer for review"
  },
  {
    id: 9,
    timestamp: "2024-03-12 09:40:18",
    admin: "Admin User",
    action: "Approved claim",
    claimId: "FR-2024-009",
    details: "IFR claim for Arjun Singh approved"
  },
  {
    id: 10,
    timestamp: "2024-03-11 15:35:50",
    admin: "Admin User",
    action: "Uploaded supporting document",
    claimId: "FR-2024-010",
    details: "Uploaded caste certificate for verification"
  }
];