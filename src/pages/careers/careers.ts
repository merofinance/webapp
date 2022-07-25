export const departments: string[] = ["Engineering", "Marketing", "Design", "Operations"];

export interface XOfType {
  x: string;
  requirements: string[];
}

export interface CareerType {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  responsibilities: string[];
  requirements: string[];
  xOf?: XOfType[];
  niceToHaves: string[];
}

export const careers: CareerType[] = [
  {
    id: "full-stack-engineer",
    title: "Full-stack engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    responsibilities: [
      "Develop off-chain components used for Mero",
      "Develop frontends, including Mero main UI as well as external and internal tools",
      "Help with smart contract development and testing",
    ],
    requirements: [
      "At least 3 years of Working experience implementing web application backends (preferably with Python, JS or Go but other languages would work too)",
      "At least 3 years of working experience implementing web application fontends (preferably experience with ReactJS, Redux and TypeScript)",
      "Experience implementing web3 applications and interacting with blockchain systems (this can be on personal projects)",
      "Understanding of how blockchain systems work (ideally Ethereum)",
      "Understanding of best testing practices",
    ],
    niceToHaves: [
      "Experience with Solidity",
      "Experience implementing off-chain systems such as arbitrage bots",
      "Degree in computer science",
      "Experience working with and contributing to open-source software",
    ],
  },
  {
    id: "software-engineer-intern",
    title: "Software engineer",
    department: "Engineering",
    type: "Internship",
    location: "Remote",
    responsibilities: [
      "Develop off-chain components used for Mero",
      "Develop frontends, including Mero main UI as well as external and internal tools",
      "Help with smart contract development and testing",
    ],
    requirements: ["Strong interest in blockchain systems and DeFi"],
    xOf: [
      {
        x: "two",
        requirements: [
          "Experience implementing web application backends (preferably with Python, JS or Go but other languages would work too)",
          "Experience implementing web application fontends (preferably experience with ReactJS, Redux and TypeScript)",
          "Experience implementing web3 applications and interacting with blockchain systems",
        ],
      },
    ],
    niceToHaves: [
      "Experience with Solidity",
      "Experience implementing off-chain systems such as arbitrage bots",
      "Experience working with and contributing to open-source software",
    ],
  },
];
