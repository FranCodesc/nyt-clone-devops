type Subsection = {
  label: string;
  url: string;
};

type Category = {
  label: string;
  section: string;
  subsections: Subsection[];
  newsletters: { title: string; description: string; url: string }[];
};

export const categories: Category[] = [
  {
    label: "U.S.",
    section: "us",
    subsections: [
      { label: "Politics", url: "https://www.nytimes.com/section/politics" },
      { label: "New York", url: "https://www.nytimes.com/section/nyregion" },
      { label: "Education", url: "https://www.nytimes.com/section/education" },
      { label: "Health", url: "https://www.nytimes.com/section/health" },
      { label: "Science", url: "https://www.nytimes.com/section/science" },
      { label: "Climate", url: "https://www.nytimes.com/section/climate" },
      { label: "Weather", url: "https://www.nytimes.com/section/weather" },
    ],
    newsletters: [
      {
        title: "The Morning",
        description: "What you need to know to start your day.",
        url: "https://www.nytimes.com/newsletters/morning-briefing",
      },
      {
        title: "Politics",
        description: "The latest in U.S. politics and government.",
        url: "https://www.nytimes.com/newsletters/politics",
      },
    ],
  },
  {
    label: "World",
    section: "world",
    subsections: [
      { label: "Africa", url: "https://www.nytimes.com/section/world/africa" },
      {
        label: "Americas",
        url: "https://www.nytimes.com/section/world/americas",
      },
      {
        label: "Asia Pacific",
        url: "https://www.nytimes.com/section/world/asia",
      },
      { label: "Europe", url: "https://www.nytimes.com/section/world/europe" },
      {
        label: "Middle East",
        url: "https://www.nytimes.com/section/world/middleeast",
      },
      { label: "Canada", url: "https://www.nytimes.com/section/world/canada" },
    ],
    newsletters: [
      {
        title: "The World",
        description: "Global news from our correspondents.",
        url: "https://www.nytimes.com/newsletters/the-world",
      },
    ],
  },
  {
    label: "Business",
    section: "business",
    subsections: [
      {
        label: "Economy",
        url: "https://www.nytimes.com/section/business/economy",
      },
      { label: "Markets", url: "https://www.nytimes.com/section/business" },
      {
        label: "DealBook",
        url: "https://www.nytimes.com/section/business/dealbook",
      },
      { label: "Tech", url: "https://www.nytimes.com/section/technology" },
      { label: "Media", url: "https://www.nytimes.com/section/business/media" },
      {
        label: "Your Money",
        url: "https://www.nytimes.com/section/business/your-money",
      },
      {
        label: "Energy",
        url: "https://www.nytimes.com/section/business/energy-environment",
      },
    ],
    newsletters: [
      {
        title: "DealBook",
        description: "The most crucial business and policy news.",
        url: "https://www.nytimes.com/newsletters/dealbook",
      },
      {
        title: "On Tech",
        description: "Our best tech reporting from the week.",
        url: "https://www.nytimes.com/newsletters/on-tech",
      },
    ],
  },
  {
    label: "Arts",
    section: "arts",
    subsections: [
      { label: "Books", url: "https://www.nytimes.com/section/books" },
      { label: "Dance", url: "https://www.nytimes.com/section/arts/dance" },
      { label: "Movies", url: "https://www.nytimes.com/section/movies" },
      { label: "Music", url: "https://www.nytimes.com/section/arts/music" },
      {
        label: "Television",
        url: "https://www.nytimes.com/section/arts/television",
      },
      { label: "Theater", url: "https://www.nytimes.com/section/theater" },
      {
        label: "Visual Arts",
        url: "https://www.nytimes.com/section/arts/design",
      },
    ],
    newsletters: [
      {
        title: "Watching",
        description: "Streaming picks and TV recommendations.",
        url: "https://www.nytimes.com/newsletters/watching",
      },
    ],
  },
  {
    label: "Lifestyle",
    section: "fashion",
    subsections: [
      { label: "Health", url: "https://www.nytimes.com/section/health" },
      { label: "Food", url: "https://www.nytimes.com/section/food" },
      { label: "Travel", url: "https://www.nytimes.com/section/travel" },
      { label: "Style", url: "https://www.nytimes.com/section/style" },
      {
        label: "Real Estate",
        url: "https://www.nytimes.com/section/realestate",
      },
      {
        label: "Love",
        url: "https://www.nytimes.com/section/fashion/weddings",
      },
    ],
    newsletters: [
      {
        title: "Well",
        description: "Living a healthy life — tips, recipes and more.",
        url: "https://www.nytimes.com/newsletters/well",
      },
      {
        title: "Cooking",
        description: "Daily recipes and cooking inspiration.",
        url: "https://www.nytimes.com/newsletters/cooking",
      },
    ],
  },
  {
    label: "Opinion",
    section: "opinion",
    subsections: [
      {
        label: "Columnists",
        url: "https://www.nytimes.com/section/opinion/columnists",
      },
      {
        label: "Editorials",
        url: "https://www.nytimes.com/section/opinion/editorials",
      },
      { label: "Guest Essays", url: "https://www.nytimes.com/section/opinion" },
      {
        label: "Letters",
        url: "https://www.nytimes.com/section/opinion/letters",
      },
      {
        label: "Sunday Opinion",
        url: "https://www.nytimes.com/section/opinion/sunday",
      },
    ],
    newsletters: [
      {
        title: "Opinion Today",
        description: "The latest opinions and arguments.",
        url: "https://www.nytimes.com/newsletters/opinion-today",
      },
    ],
  },
  {
    label: "Science",
    section: "science",
    subsections: [
      { label: "Climate", url: "https://www.nytimes.com/section/climate" },
      {
        label: "Space & Cosmos",
        url: "https://www.nytimes.com/section/science/space",
      },
      { label: "Health", url: "https://www.nytimes.com/section/health" },
      { label: "Well", url: "https://www.nytimes.com/section/well" },
    ],
    newsletters: [
      {
        title: "Climate Forward",
        description: "The latest on climate change and environment.",
        url: "https://www.nytimes.com/newsletters/climate-forward",
      },
    ],
  },
  {
    label: "Technology",
    section: "technology",
    subsections: [
      {
        label: "Artificial Intelligence",
        url: "https://www.nytimes.com/section/technology/artificial-intelligence",
      },
      {
        label: "Cybersecurity",
        url: "https://www.nytimes.com/section/technology",
      },
      { label: "Gaming", url: "https://www.nytimes.com/section/technology" },
      { label: "The Upshot", url: "https://www.nytimes.com/section/upshot" },
    ],
    newsletters: [
      {
        title: "On Tech",
        description: "How technology is changing your life.",
        url: "https://www.nytimes.com/newsletters/on-tech",
      },
    ],
  },
  {
    label: "Travel",
    section: "travel",
    subsections: [
      { label: "Destinations", url: "https://www.nytimes.com/section/travel" },
      { label: "36 Hours", url: "https://www.nytimes.com/column/36-hours" },
      { label: "Travel Tips", url: "https://www.nytimes.com/section/travel" },
    ],
    newsletters: [
      {
        title: "Tripped Up",
        description: "Your travel questions, answered.",
        url: "https://www.nytimes.com/newsletters/tripped-up",
      },
    ],
  },
];
