
export interface IPO {
  id: string;
  companyName: string;
  logo: string;
  priceRange: {
    min: number;
    max: number;
  };
  openDate: string;
  closeDate: string;
  lotSize: number;
  issueSize: string;
  issueType: string;
  listingDate: string;
  sector: string;
  rhpLink: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'closed' | 'listed';
  featured?: boolean;
  currentReturn?: number;
  listingGain?: number;
}

export const upcomingIPOs: IPO[] = [
  {
    id: '1',
    companyName: 'Nova Agritech Ltd.',
    logo: '🌱',
    priceRange: { min: 39, max: 41 },
    openDate: '2024-01-22',
    closeDate: '2024-01-24',
    lotSize: 143,
    issueSize: '143.81 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-30',
    sector: 'Agriculture',
    rhpLink: '#',
    description: 'Leading agriculture technology company focusing on sustainable farming solutions.',
    status: 'upcoming',
    featured: true
  },
  {
    id: '2',
    companyName: 'EPACK Durable Ltd.',
    logo: '📦',
    priceRange: { min: 218, max: 230 },
    openDate: '2024-01-19',
    closeDate: '2024-01-23',
    lotSize: 640,
    issueSize: '640.05 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-29',
    sector: 'Manufacturing',
    rhpLink: '#',
    description: 'Premier packaging solutions provider with innovative durable packaging products.',
    status: 'upcoming',
    featured: true
  },
  {
    id: '3',
    companyName: 'RK Swamy Ltd.',
    logo: '📈',
    priceRange: { min: 0, max: 0 },
    openDate: 'Not Issued',
    closeDate: 'Not Issued',
    lotSize: 0,
    issueSize: 'Not Issued',
    issueType: 'Book Built',
    listingDate: 'Not Issued',
    sector: 'Marketing',
    rhpLink: '#',
    description: 'Integrated marketing and advertising solutions company.',
    status: 'upcoming'
  },
  {
    id: '9',
    companyName: 'Aarvi Encon Ltd.',
    logo: '🏗️',
    priceRange: { min: 120, max: 125 },
    openDate: '2024-02-05',
    closeDate: '2024-02-07',
    lotSize: 80,
    issueSize: '320.50 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-15',
    sector: 'Construction',
    rhpLink: '#',
    description: 'Leading infrastructure and construction company with pan-India presence.',
    status: 'upcoming',
    featured: true
  },
  {
    id: '10',
    companyName: 'BharatRohan AgriTech',
    logo: '🚜',
    priceRange: { min: 75, max: 80 },
    openDate: '2024-02-10',
    closeDate: '2024-02-14',
    lotSize: 150,
    issueSize: '225.75 Cr.',
    issueType: 'Fixed Price',
    listingDate: '2024-02-22',
    sector: 'AgriTech',
    rhpLink: '#',
    description: 'Drone-based crop monitoring and precision farming solutions.',
    status: 'upcoming'
  },
  {
    id: '11',
    companyName: 'Tanya Solar Ltd.',
    logo: '☀️',
    priceRange: { min: 210, max: 220 },
    openDate: '2024-02-12',
    closeDate: '2024-02-16',
    lotSize: 65,
    issueSize: '450.20 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-25',
    sector: 'Renewable Energy',
    rhpLink: '#',
    description: 'Solar panel manufacturer with advanced thin-film technology.',
    status: 'upcoming',
    featured: true
  },
  {
    id: '12',
    companyName: 'Mannat Finance Ltd.',
    logo: '💰',
    priceRange: { min: 95, max: 100 },
    openDate: '2024-02-18',
    closeDate: '2024-02-22',
    lotSize: 120,
    issueSize: '180.90 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-03-01',
    sector: 'Financial Services',
    rhpLink: '#',
    description: 'NBFC specializing in MSME loans and rural financing.',
    status: 'upcoming'
  },
  {
    id: '13',
    companyName: 'Rasoi Magic Foods',
    logo: '🍛',
    priceRange: { min: 150, max: 160 },
    openDate: '2024-02-25',
    closeDate: '2024-02-29',
    lotSize: 100,
    issueSize: '300.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-03-08',
    sector: 'FMCG',
    rhpLink: '#',
    description: 'Ready-to-eat traditional Indian meals with modern packaging.',
    status: 'upcoming'
  }
];

export const ongoingIPOs: IPO[] = [
  {
    id: '4',
    companyName: 'Medi Assist Healthcare Services Ltd.',
    logo: '🏥',
    priceRange: { min: 218, max: 230 },
    openDate: '2024-01-19',
    closeDate: '2024-01-23',
    lotSize: 640,
    issueSize: '640.05 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-29',
    sector: 'Healthcare',
    rhpLink: '#',
    description: 'Leading healthcare services and insurance solutions provider.',
    status: 'ongoing'
  },
  {
    id: '14',
    companyName: 'Chakra Robotics',
    logo: '🤖',
    priceRange: { min: 480, max: 500 },
    openDate: '2024-01-25',
    closeDate: '2024-01-30',
    lotSize: 30,
    issueSize: '750.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-08',
    sector: 'Robotics',
    rhpLink: '#',
    description: 'Industrial robotics and automation solutions for manufacturing.',
    status: 'ongoing',
    featured: true
  },
  {
    id: '15',
    companyName: 'DesiCrew Solutions',
    logo: '👩‍💻',
    priceRange: { min: 180, max: 185 },
    openDate: '2024-01-26',
    closeDate: '2024-01-31',
    lotSize: 80,
    issueSize: '200.50 Cr.',
    issueType: 'Fixed Price',
    listingDate: '2024-02-09',
    sector: 'IT Services',
    rhpLink: '#',
    description: 'Rural BPO and digital services provider.',
    status: 'ongoing'
  },
  {
    id: '16',
    companyName: 'Greenlam Laminates',
    logo: '🌿',
    priceRange: { min: 320, max: 330 },
    openDate: '2024-01-28',
    closeDate: '2024-02-02',
    lotSize: 45,
    issueSize: '350.75 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-12',
    sector: 'Building Materials',
    rhpLink: '#',
    description: 'Eco-friendly decorative laminates and surfaces.',
    status: 'ongoing'
  },
  {
    id: '17',
    companyName: 'Bharat HealthCare',
    logo: '💉',
    priceRange: { min: 275, max: 290 },
    openDate: '2024-01-29',
    closeDate: '2024-02-03',
    lotSize: 50,
    issueSize: '425.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-14',
    sector: 'Healthcare',
    rhpLink: '#',
    description: 'Chain of affordable multi-specialty hospitals.',
    status: 'ongoing'
  },
  {
    id: '18',
    companyName: 'Udaan Logistics',
    logo: '✈️',
    priceRange: { min: 150, max: 155 },
    openDate: '2024-01-30',
    closeDate: '2024-02-04',
    lotSize: 100,
    issueSize: '600.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-02-15',
    sector: 'Logistics',
    rhpLink: '#',
    description: 'Drone-based last-mile delivery solutions.',
    status: 'ongoing'
  }
];

export const listedIPOs: IPO[] = [
  {
    id: '5',
    companyName: 'Jyoti CNC Automation Ltd.',
    logo: '⚙️',
    priceRange: { min: 370, max: 370 },
    openDate: '2024-01-15',
    closeDate: '2024-01-17',
    lotSize: 455,
    issueSize: '455.75 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-24',
    sector: 'Manufacturing',
    rhpLink: '#',
    description: 'Advanced CNC automation and precision engineering solutions.',
    status: 'listed',
    currentReturn: 37.69,
    listingGain: 11.78
  },
  {
    id: '6',
    companyName: 'Innova Captab Ltd.',
    logo: '💊',
    priceRange: { min: 448, max: 448 },
    openDate: '2023-12-29',
    closeDate: '2024-01-02',
    lotSize: 515,
    issueSize: '515 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-08',
    sector: 'Pharmaceuticals',
    rhpLink: '#',
    description: 'Innovative pharmaceutical company specializing in captab technology.',
    status: 'listed',
    currentReturn: 14.90,
    listingGain: 6.12
  },
  {
    id: '7',
    companyName: 'Azad Engineering Ltd.',
    logo: '🔧',
    priceRange: { min: 624, max: 624 },
    openDate: '2023-12-28',
    closeDate: '2024-01-01',
    lotSize: 663,
    issueSize: '663.25 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-08',
    sector: 'Engineering',
    rhpLink: '#',
    description: 'Leading engineering solutions provider for aerospace and defense.',
    status: 'listed',
    currentReturn: 26.57,
    listingGain: 37.4
  },
   {
    id: '8',
    companyName: 'Azad Engineering Ltd.',
    logo: '🔧',
    priceRange: { min: 624, max: 624 },
    openDate: '2023-12-28',
    closeDate: '2024-01-01',
    lotSize: 663,
    issueSize: '663.25 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-08',
    sector: 'Engineering',
    rhpLink: '#',
    description: 'Leading engineering solutions provider for aerospace and defense.',
    status: 'listed',
    currentReturn: 26.57,
    listingGain: 37.4
  },
  {
    id: '19',
    companyName: 'Vedant Fashions (Manyavar)',
    logo: '👔',
    priceRange: { min: 824, max: 824 },
    openDate: '2023-12-15',
    closeDate: '2023-12-18',
    lotSize: 18,
    issueSize: '3,149.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-12-28',
    sector: 'Retail',
    rhpLink: '#',
    description: 'Ethnic wear brand specializing in wedding and festive clothing.',
    status: 'listed',
    currentReturn: 42.35,
    listingGain: 18.75
  },
  {
    id: '20',
    companyName: 'Happiest Minds',
    logo: '🧠',
    priceRange: { min: 165, max: 165 },
    openDate: '2023-11-20',
    closeDate: '2023-11-23',
    lotSize: 90,
    issueSize: '702.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-12-05',
    sector: 'IT',
    rhpLink: '#',
    description: 'Digital transformation and AI solutions provider.',
    status: 'listed',
    currentReturn: 285.45,
    listingGain: 111.00
  },
  {
    id: '21',
    companyName: 'Zomato',
    logo: '🍽️',
    priceRange: { min: 72, max: 76 },
    openDate: '2023-11-10',
    closeDate: '2023-11-15',
    lotSize: 195,
    issueSize: '9,375.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-11-28',
    sector: 'Food Tech',
    rhpLink: '#',
    description: 'Online food delivery and restaurant discovery platform.',
    status: 'listed',
    currentReturn: 68.90,
    listingGain: 53.25
  },
  {
    id: '22',
    companyName: 'Nykaa',
    logo: '💄',
    priceRange: { min: 1085, max: 1125 },
    openDate: '2023-10-28',
    closeDate: '2023-11-02',
    lotSize: 12,
    issueSize: '5,352.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-11-15',
    sector: 'E-commerce',
    rhpLink: '#',
    description: 'Beauty and personal care omnichannel retailer.',
    status: 'listed',
    currentReturn: 32.40,
    listingGain: 79.65
  },
  {
    id: '23',
    companyName: 'Policybazaar',
    logo: '🛡️',
    priceRange: { min: 980, max: 980 },
    openDate: '2023-10-15',
    closeDate: '2023-10-18',
    lotSize: 15,
    issueSize: '5,710.00 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-11-01',
    sector: 'FinTech',
    rhpLink: '#',
    description: 'Online insurance comparison and purchase platform.',
    status: 'listed',
    currentReturn: 45.60,
    listingGain: 22.30
  }
];

export const ipoNews = [
  {
    id: '1',
    title: 'Biobrass Solutions files DRHP with SEBI',
    date: 'Dec 14, 2023',
    summary: 'Company plans to raise funds through public offering for expansion.'
  },
  {
    id: '2',
    title: 'Grelex Share Broking files DRHP with SEBI',
    date: 'Dec 12, 2023',
    summary: 'Financial services company prepares for stock market debut.'
  }
];

export const ipoAnalysis = [
  {
    id: '1',
    title: 'Euphoria Infotech India coming with IPO to raise upto Rs 9.60 crore',
    date: 'Dec 15, 2023',
    summary: 'Technology company announces IPO plans for business expansion.'
  },
  {
    id: '2',
    title: 'EPACK Durable coming with IPO to raise upto Rs 662.62 crore',
    date: 'Dec 13, 2023',
    summary: 'Packaging solutions provider targets significant fundraising.'
  },
  {
    id: '3',
    title: 'Oswal Labs coming with IPO to raise Rs 19.64 crore',
    date: 'Dec 10, 2023',
    summary: 'Pharmaceutical company plans modest public offering.'
  }
];

export const faqData = [
  {
    question: 'What is an IPO?',
    answer:
      'IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specific lot of internal and institutional investors via opening a Demat account.',
  },
  {
    question: 'How to invest in an IPO?',
    answer:
      'You can invest in an IPO by using your Demat account through ASBA (Applications Supported by Blocked Amount) via internet banking or broker platforms.',
  },
  {
    question: 'What is the benefit of an IPO?',
    answer:
      'The benefit of an IPO is the opportunity to invest in a company at an early stage of its public journey, often with potential for high returns.',
  },
  {
    question: 'What are the disadvantages of an IPO?',
    answer:
      'Disadvantages may include market volatility, uncertainty in share allotment, and risk of capital loss if the stock underperforms.',
  },
  {
    question: 'What is the difference between book building issue and fixed price issue?',
    answer:
      'In a book building issue, the price is determined based on investor bids within a price band, while in a fixed price issue, the price is pre-decided by the company.',
  },
  {
    question: 'Is it mandatory to have a PAN number to apply in an IPO?',
    answer:
      'Yes, it is mandatory to have a PAN number to apply for an IPO as per SEBI guidelines.',
  },
  {
    question: 'Where do I get an IPO application form?',
    answer:
      'IPO application forms are available through banks, brokers, or online through your Demat account provider.',
  },
  {
    question: 'How one can apply in IPO’s online?',
    answer:
      'You can apply online using ASBA through internet banking or via brokerage apps like Zerodha, Groww, etc.',
  },
  {
    question: 'How one can apply in IPO’s offline?',
    answer:
      'You can apply offline by filling the physical IPO form and submitting it to your bank or broker.',
  },
  {
    question: 'Can a minor apply in an IPO?',
    answer:
      'Yes, a minor can apply for an IPO through a Demat account operated under their guardian’s name.',
  },
  {
    question: 'What is the procedure to withdraw from an IPO?',
    answer:
      'You can withdraw your IPO application before the issue closes via your broker or bank platform.',
  },
  {
    question: 'How is IPO return calculated?',
    answer:
      'IPO return is calculated as: (Listing Price - Issue Price) ÷ Issue Price × 100.',
  },
  {
    question: 'Can one apply for an IPO from a sweep in/out saving bank account?',
    answer:
      'Yes, but ensure that sufficient funds are maintained in the account at the time of IPO application blocking.',
  },
  {
    question: 'What is the minimum and maximum investment one could do in the HNI category?',
    answer:
      'HNI (High Net-worth Individual) investors must apply for more than ₹2 lakhs. There is no maximum cap, but it depends on the IPO lot availability.',
  },
];
