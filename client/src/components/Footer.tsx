import { useState } from "react";
import NytLogo from "./NytLogo";

export function Footer() {
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        <div className="border border-zinc-300" />
        <div className="border-t border-zinc-300" />
      </div>
      <div className="mt-4">
        <h2 className="font-extrabold text-[21px] font-nyt-title">
          <NytLogo className="w-50"/>
        </h2>
      </div>
      <div className="mt-3">
        <FooterCategories />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
}

function FooterCategories() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Record<string, { label: string; url: string }[]> = {
    NEWS: [
      { label: "Home Page", url: "https://www.nytimes.com" },
      { label: "U.S.", url: "https://www.nytimes.com/section/us" },
      { label: "World", url: "https://www.nytimes.com/section/world" },
      { label: "Politics", url: "https://www.nytimes.com/section/politics" },
      { label: "New York", url: "https://www.nytimes.com/section/nyregion" },
      { label: "Education", url: "https://www.nytimes.com/section/education" },
      { label: "Sports", url: "https://www.nytimes.com/section/sports" },
      { label: "Business", url: "https://www.nytimes.com/section/business" },
      { label: "Tech", url: "https://www.nytimes.com/section/technology" },
      { label: "Science", url: "https://www.nytimes.com/section/science" },
      { label: "Weather", url: "https://www.nytimes.com/section/weather" },
      { label: "The Great Read", url: "https://www.nytimes.com/section/arts/design" },
      { label: "Obituaries", url: "https://www.nytimes.com/section/obituaries" },
      { label: "Headway", url: "https://www.nytimes.com/section/headway" },
      { label: "Visual Investigations", url: "https://www.nytimes.com/spotlight/visual-investigations" },
      { label: "The Magazine", url: "https://www.nytimes.com/section/magazine" },
    ],
    ARTS: [
      { label: "Book Review", url: "https://www.nytimes.com/section/books/review" },
      { label: "Best Sellers Book List", url: "https://www.nytimes.com/books/best-sellers" },
      { label: "Dance", url: "https://www.nytimes.com/section/arts/dance" },
      { label: "Movies", url: "https://www.nytimes.com/section/movies" },
      { label: "Music", url: "https://www.nytimes.com/section/arts/music" },
      { label: "Pop Culture", url: "https://www.nytimes.com/section/arts" },
      { label: "Television", url: "https://www.nytimes.com/section/arts/television" },
      { label: "Theater", url: "https://www.nytimes.com/section/theater" },
      { label: "Visual Arts", url: "https://www.nytimes.com/section/arts/design" },
    ],
    LIFESTYLE: [
      { label: "Health", url: "https://www.nytimes.com/section/health" },
      { label: "Well", url: "https://www.nytimes.com/section/well" },
      { label: "Food", url: "https://www.nytimes.com/section/food" },
      { label: "Restaurant Reviews", url: "https://www.nytimes.com/section/dining" },
      { label: "Love", url: "https://www.nytimes.com/section/fashion/weddings" },
      { label: "Travel", url: "https://www.nytimes.com/section/travel" },
      { label: "Style", url: "https://www.nytimes.com/section/style" },
      { label: "Fashion", url: "https://www.nytimes.com/section/fashion" },
      { label: "Real Estate", url: "https://www.nytimes.com/section/realestate" },
      { label: "T Magazine", url: "https://www.nytimes.com/section/t-magazine" },
    ],
    OPINION: [
      { label: "Today's Opinion", url: "https://www.nytimes.com/section/opinion" },
      { label: "Columnists", url: "https://www.nytimes.com/section/opinion/columnists" },
      { label: "Editorials", url: "https://www.nytimes.com/section/opinion/editorials" },
      { label: "Guest Essays", url: "https://www.nytimes.com/section/opinion" },
      { label: "Op-Docs", url: "https://www.nytimes.com/section/opinion/op-docs" },
      { label: "Letters", url: "https://www.nytimes.com/section/opinion/letters" },
      { label: "Sunday Opinion", url: "https://www.nytimes.com/section/opinion/sunday" },
      { label: "Opinion Video", url: "https://www.nytimes.com/section/opinion" },
      { label: "Opinion Audio", url: "https://www.nytimes.com/section/opinion" },
    ],
    MORE: [
      { label: "Audio", url: "https://www.nytimes.com/section/podcasts" },
      { label: "Games", url: "https://www.nytimes.com/games" },
      { label: "Cooking", url: "https://cooking.nytimes.com" },
      { label: "Wirecutter", url: "https://www.nytimes.com/wirecutter" },
      { label: "The Athletic", url: "https://theathletic.com" },
      { label: "Jobs", url: "https://www.nytimes.com/jobs" },
      { label: "Video", url: "https://www.nytimes.com/video" },
      { label: "Graphics", url: "https://www.nytimes.com/spotlight/graphics" },
      { label: "Trending", url: "https://www.nytimes.com" },
      { label: "Live Events", url: "https://www.nytimes.com/events" },
      { label: "Corrections", url: "https://www.nytimes.com/section/corrections" },
      { label: "Reader Center", url: "https://www.nytimes.com/section/readercenter" },
      { label: "TimesMachine", url: "https://timesmachine.nytimes.com" },
      { label: "The Learning Network", url: "https://www.nytimes.com/section/learning" },
      { label: "School of The NYT", url: "https://www.nytimes.com/school" },
      { label: "inEducation", url: "https://www.nytimes.com/school" },
    ],
  };

  const accountLinks = {
    main: [
      { label: "Subscribe", url: "https://www.nytimes.com/subscription" },
      { label: "Manage My Account", url: "https://myaccount.nytimes.com" },
      { label: "Home Delivery", url: "https://www.nytimes.com/subscription/homedelivery" },
      { label: "Gift Subscriptions", url: "https://www.nytimes.com/subscription/gift" },
    ],
    secondary: [
      { label: "Group Subscriptions", url: "https://www.nytimes.com/subscription/group" },
      { label: "Gift Articles", url: "https://www.nytimes.com/subscription" },
      { label: "Email Newsletters", url: "https://www.nytimes.com/newsletters" },
    ],
    tertiary: [
      { label: "NYT Licensing", url: "https://www.nytimeslicensing.com" },
      { label: "Replica Edition", url: "https://www.nytimes.com/subscription/replica" },
      { label: "Times Store", url: "https://store.nytimes.com" },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* MOBILE: accordion */}
      <div className="lg:hidden flex flex-col">
        {Object.entries(categories).map(([category, links]) => (
          <div key={category} className="border-b border-zinc-300">
            <button
              className="w-full flex items-center justify-between py-3 text-xs font-bold cursor-pointer"
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
            >
              {category}
              <span>{expandedCategory === category ? "▲" : "▼"}</span>
            </button>
            {expandedCategory === category && (
              <ul className="text-sm font-light flex flex-col gap-2 pb-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP: griglia */}
      <div className="hidden lg:grid grid-cols-6 gap-12">
        {Object.entries(categories).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-xs font-bold mb-3">{category}</h3>
            <ul className="text-sm font-light flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* ACCOUNT */}
        <div className="border-l border-zinc-300 pl-4">
          <h3 className="text-xs font-bold mb-3">ACCOUNT</h3>
          <ul className="text-sm flex flex-col gap-1 mb-5">
            {accountLinks.main.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-extrabold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="text-sm font-light flex flex-col gap-1">
            {accountLinks.secondary.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="text-sm font-light flex flex-col gap-1 border-t border-zinc-300 pt-3 mt-3">
            {accountLinks.tertiary.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-zinc-300 mt-4" />
    </div>
  );
}

function About() {
  const links = [
    { label: "NYTCo", url: "https://www.nytco.com" },
    { label: "Contact Us", url: "https://help.nytimes.com/hc/en-us/articles/115015385887" },
    { label: "Accessibility", url: "https://www.nytimes.com/accessibility" },
    { label: "Work with us", url: "https://www.nytco.com/careers" },
    { label: "Advertise", url: "https://advertising.nytimes.com" },
    { label: "T Brand Studio", url: "https://www.tbrandstudio.com" },
    { label: "Privacy Policy", url: "https://www.nytimes.com/privacy/privacy-policy" },
    { label: "Cookie Policy", url: "https://www.nytimes.com/privacy/cookie-policy" },
    { label: "Terms of Service", url: "https://help.nytimes.com/hc/en-us/articles/115014893428" },
    { label: "Terms of Sale", url: "https://help.nytimes.com/hc/en-us/articles/115014893968" },
    { label: "Site Map", url: "https://www.nytimes.com/sitemap" },
    { label: "Help", url: "https://help.nytimes.com" },
    { label: "Subscriptions", url: "https://www.nytimes.com/subscription" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mt-4 text-[10px] font-light">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <span>© 2026 The New York Times Company</span>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
      <a
        href="https://www.nytimes.com/privacy/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Manage Privacy Preferences
      </a>
    </div>
  );
}
