import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Story = {
  category: string;
  title: string;
  dek?: string;
  author?: string;
  time?: string;
  href?: string;
  image?: string;
};

const image = {
  hero: 'https://framerusercontent.com/images/FjcrzfIbeDzTkVE8Y63xnxZJ27c.jpg?width=1600&height=1067',
  world: 'https://framerusercontent.com/images/SsC2y9e8XKqkjXPrCw2IhN1msk.jpg?width=1600&height=1067',
  business: 'https://framerusercontent.com/images/HrzhdK951MdOyDYIuPkAA3FXQ.jpg?width=1600&height=1067',
  culture: 'https://framerusercontent.com/images/LsxfwkLQI2zL3JoIdmTCWDWXkws.jpg?width=1600&height=1067',
  technology: 'https://framerusercontent.com/images/TKGFuCy5HULhjiXl1pJoAes0SM.jpg?width=1600&height=1067',
  lifestyle: 'https://framerusercontent.com/images/VyfMTE72ySlgUsZlhWpHBmPH0.jpg?width=1600&height=1067',
  sports: 'https://framerusercontent.com/images/VWcXX2jIWHfre7wA0VpgeGbsh3I.jpg?width=1600&height=900',
  travel: 'https://framerusercontent.com/images/VaOo8A00g8VTEhGblwyjnLmK8pU.jpg?width=1600&height=1199',
};

const videoImage = {
  featured: 'https://framerusercontent.com/images/9DELZ9KqtDxGUunTANoMCrxlufE.jpg?width=1400&height=965',
  ideas: 'https://framerusercontent.com/images/l2ytpi6kgJqvVIDlnLPpCNJdM.jpg?width=1400&height=933',
  founders: 'https://framerusercontent.com/images/yRnwDFGJUBGZZDCzwNxv3C8pX3s.jpg?width=1400&height=933',
  city: 'https://framerusercontent.com/images/cADFdmW8lVdJIIGro3UZmtx1Zlw.jpg?width=1400&height=933',
};

const navItems = ['Home', 'Latest', 'World', 'Business', 'Technology', 'Culture', 'Lifestyle', 'Sports'];
const categories = ['World', 'Business', 'Technology', 'Culture', 'Lifestyle', 'Sports', 'Travel'];

function pressraPath(label: string) {
  if (label === 'Home') return '/';
  if (label === 'Latest') return '/latest';
  return `/category/${label.toLowerCase()}`;
}

const stories: Record<string, Story[]> = {
  picks: [
    { category: 'Business', title: 'The Next Chapter of the Global Economy', dek: 'The signals, challenges and emerging opportunities shaping the way businesses plan for what comes next.', author: 'Marcus Hale', time: '6 min read', image: image.business, href: '/article/the-next-chapter-of-the-global-economy' },
    { category: 'Culture', title: 'Inside the Creative Minds Redefining Modern Design', dek: 'Meet the studios and makers turning restraint, craft and curiosity into a new design language.', author: 'Elena Moreau', time: '5 min read', image: image.culture, href: '/article/inside-the-creative-minds-redefining-modern-design' },
    { category: 'Technology', title: 'The Technology Quietly Changing Everyday Life', dek: 'The most important innovations are often the least visible — here’s where they are already at work.', author: 'Priya Raman', time: '7 min read', image: image.technology, href: '/article/the-technology-quietly-changing-everyday-life' },
    { category: 'Lifestyle', title: 'Why Our Cities Are Rethinking the Way We Live', dek: 'Planners, residents and architects are reimagining streets, homes and public space for a calmer urban life.', author: 'Elena Moreau', time: '4 min read', image: image.lifestyle, href: '/article/why-our-cities-are-rethinking-the-way-we-live' },
  ],
  latest: [
    { category: 'Business', title: 'Why the Future of Work Is Becoming More Flexible', dek: 'Hybrid schedules, distributed teams and new expectations are changing the shape of the working week.', author: 'Marcus Hale', time: '5 min read', href: '/article/why-the-future-of-work-is-becoming-more-flexible' },
    { category: 'Culture', title: 'A New Generation Is Redefining Personal Style', dek: 'Vintage finds, local labels and personal expression are replacing trends with something more lasting.', author: 'Elena Moreau', time: '4 min read', href: '/article/a-new-generation-is-redefining-personal-style' },
    { category: 'Technology', title: 'The Practical Guide to Making Technology Work for You', dek: 'Simple settings, smarter tools and better habits that put your devices back in service of your day.', author: 'Priya Raman', time: '8 min read', href: '/article/the-practical-guide-to-making-technology-work-for-you' },
    { category: 'Lifestyle', title: 'Small Changes That Can Make a City Feel More Human', dek: 'Benches, trees and shared spaces: the modest interventions with an outsized effect on daily life.', author: 'Elena Moreau', time: '6 min read', href: '/article/small-changes-that-can-make-a-city-feel-more-human' },
    { category: 'Sports', title: 'The Stories Behind This Week’s Biggest Sporting Moments', dek: 'The decisions, celebrations and quiet turning points behind the results everyone is discussing.', author: 'Daniel Okafor', time: '5 min read', href: '/article/the-stories-behind-this-week’s-biggest-sporting-moments' },
    { category: 'Travel', title: 'What to Know Before Your Next Big Trip', dek: 'From documents to timing to local etiquette — a calm checklist for travelling well.', author: 'Sofia Lindqvist', time: '7 min read', href: '/article/what-to-know-before-your-next-big-trip' },
  ],
};

const trendStories: Story[] = [
  { category: 'World', title: 'The Big Questions Facing the World This Year', href: '/article/the-big-questions-facing-the-world-this-year' },
  { category: 'Business', title: 'What the Latest Market Shifts Mean for Everyday Life', href: '/article/what-the-latest-market-shifts-mean-for-everyday-life' },
  { category: 'Culture', title: 'The Creators Changing the Future of Entertainment', href: '/article/the-creators-changing-the-future-of-entertainment' },
  { category: 'Technology', title: 'A Smarter Way to Think About Digital Wellbeing', href: '/article/a-smarter-way-to-think-about-digital-wellbeing' },
  { category: 'Travel', title: 'The New Travel Habits Changing How We Explore', href: '/article/the-new-travel-habits-changing-how-we-explore' },
];

const lowerSections = [
  {
    eyebrow: 'BEYOND THE HEADLINES', title: 'A Wider View of the World', intro: 'Understand the events, decisions and people influencing communities across the globe.', cta: 'EXPLORE WORLD NEWS',
    items: [
      { category: 'World', title: 'The Ideas, People and Decisions Defining Tomorrow', dek: 'A closer look at the developments making an impact far beyond today’s news cycle.', author: 'Olivia Bennett', time: '6 min read' },
      { category: 'World', title: 'The Big Questions Facing the World This Year', author: 'Olivia Bennett', time: '6 min read' },
      { category: 'World', title: 'The Global Shifts Changing the Conversation', author: 'Olivia Bennett', time: '7 min read' },
      { category: 'World', title: 'A Region in Focus: The People Behind the Headlines', author: 'Olivia Bennett', time: '6 min read' },
      { category: 'World', title: 'What Today’s Developments Could Mean Tomorrow', author: 'Olivia Bennett', time: '5 min read' },
    ] as Story[],
  },
  {
    eyebrow: 'MONEY, MARKETS & IDEAS', title: 'Business in Perspective', intro: 'Clear-eyed reporting on markets, leadership, work and the ideas driving change.', cta: 'MORE BUSINESS STORIES',
    items: [
      { category: 'Business', title: 'Why the Future of Work Is Becoming More Flexible', dek: 'Hybrid schedules, distributed teams and new expectations are changing the shape of the working week.', author: 'Marcus Hale', time: '5 min read' },
      { category: 'Business', title: 'The Next Chapter of the Global Economy', dek: 'The signals, challenges and emerging opportunities shaping the way businesses plan for what comes next.', author: 'Marcus Hale', time: '6 min read' },
      { category: 'Business', title: 'What the Latest Market Shifts Mean for Everyday Life', dek: 'Interest rates, prices and paychecks: translating market movements into what changes at home.', author: 'Marcus Hale', time: '5 min read' },
    ] as Story[],
  },
  {
    eyebrow: 'WHAT’S NEXT', title: 'Technology, Explained', intro: 'Explore the products, breakthroughs and digital shifts changing the way we live and work.', cta: 'EXPLORE TECHNOLOGY',
    items: [
      { category: 'Technology', title: 'The Practical Guide to Making Technology Work for You', dek: 'Simple settings, smarter tools and better habits that put your devices back in service of your day.', author: 'Priya Raman', time: '8 min read' },
      { category: 'Technology', title: 'The Technology Quietly Changing Everyday Life', dek: 'The most important innovations are often the least visible — here’s where they are already at work.', author: 'Priya Raman', time: '7 min read' },
      { category: 'Technology', title: 'A Smarter Way to Think About Digital Wellbeing', dek: 'Less screen guilt, more intention: a practical framework for healthier relationships with technology.', author: 'Priya Raman', time: '4 min read' },
    ] as Story[],
  },
  {
    eyebrow: 'PEOPLE, PLACES & PERSPECTIVES', title: 'The Things That Shape Us', intro: 'Thoughtful stories about creativity, identity, design, travel and modern life.', cta: 'DISCOVER CULTURE',
    items: [
      { category: 'Lifestyle', title: 'Small Changes That Can Make a City Feel More Human', author: 'Elena Moreau', time: '6 min read' },
      { category: 'Lifestyle', title: 'Why Our Cities Are Rethinking the Way We Live', author: 'Elena Moreau', time: '4 min read' },
      { category: 'Lifestyle', title: 'The Places Inspiring a New Kind of Travel', author: 'Sofia Lindqvist', time: '7 min read' },
      { category: 'Lifestyle', title: 'How Everyday Rituals Help Us Find More Balance', author: 'Elena Moreau', time: '4 min read' },
      { category: 'Culture', title: 'A New Generation Is Redefining Personal Style', dek: 'Vintage finds, local labels and personal expression are replacing trends with something more lasting.', author: 'Elena Moreau', time: '4 min read' },
    ] as Story[],
  },
  {
    eyebrow: 'THE GAME, AND BEYOND', title: 'Sport in Motion', intro: 'The people, performances and turning points behind the scores.', cta: 'MORE SPORTS NEWS',
    items: [
      { category: 'Sports', title: 'The Stories Behind This Week’s Biggest Sporting Moments', dek: 'The decisions, celebrations and quiet turning points behind the results everyone is discussing.', author: 'Daniel Okafor', time: '5 min read' },
      { category: 'Sports', title: 'The Moment That Changed the Match', dek: 'One decision, one pass, one second — revisiting the turning point everyone is still talking about.', author: 'Daniel Okafor', time: '4 min read' },
      { category: 'Sports', title: 'Inside the Preparation Behind Elite Performance', dek: 'Sleep, data and discipline: how top athletes prepare long before the whistle.', author: 'Daniel Okafor', time: '6 min read' },
    ] as Story[],
  },
];

const favorites = [
  ['01', 'Making Sense of a Fast-Moving Economic Landscape', 'Business'],
  ['02', 'Five Big Ideas Changing the Way We Think', 'Culture'],
  ['03', 'The Essential Guide to a More Intentional Digital Life', 'Technology'],
  ['04', 'What Business Leaders Are Watching Right Now', 'Business'],
  ['05', 'The Destinations Finding Their Way onto Everyone’s List', 'Travel'],
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
}

function StoryLink({ story, className = '' }: { story: Story; className?: string }) {
  return (
    <a className={`story-link ${className}`} href={story.href ?? '#'}>
      <span className="story-category">{story.category}</span>
      <h3>{story.title}</h3>
      {story.dek && <p>{story.dek}</p>}
      {(story.author || story.time) && <span className="meta">{story.author}{story.author && story.time ? ' · ' : ''}{story.time}</span>}
    </a>
  );
}

function TopBar({ onSearch }: { onSearch: () => void }) {
  const ticker = [
    'The New World Taking Shape Around Us',
    'The Ideas, People and Decisions Defining Tomorrow',
    'Why the Future of Work Is Becoming More Flexible',
    'A New Generation Is Redefining Personal Style',
    'The Practical Guide to Making Technology Work for You',
    'Small Changes That Can Make a City Feel More Human',
    'The Stories Behind This Week’s Biggest Sporting Moments',
    'What to Know Before Your Next Big Trip',
  ];
  return (
    <>
      <div className="topbar">
        <a className="mini-wordmark" href="#top" aria-label="Pressra home">Pressra</a>
        <nav className="top-nav" aria-label="Primary">
          {navItems.map((item) => <a key={item} href={pressraPath(item)}>{item}</a>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button" type="button" aria-label="Search PRESSRA" onClick={onSearch}><SearchIcon /></button>
          <a className="follow-button" href="#follow">FOLLOW US</a>
        </div>
      </div>
      <div className="ticker" aria-label="Just in">
        <span className="ticker-label"><i /> JUST IN</span>
        <div className="ticker-window">
          <div className="ticker-track">
            {[...ticker, ...ticker].map((title, index) => <a key={`${title}-${index}`} href="#latest">{title}</a>)}
          </div>
        </div>
      </div>
    </>
  );
}

function Masthead() {
  return (
    <header className="masthead" id="top">
      <div className="masthead-meta"><span>Thursday, October 22, 2026</span><span>Global Edition · Independent Journalism</span></div>
      <a className="wordmark" href="#top">Pressra</a>
      <nav className="category-nav" aria-label="Sections">
        {categories.map((category) => <a key={category} href={`/category/${category.toLowerCase()}`}>{category}</a>)}
      </nav>
    </header>
  );
}

function LeadGrid() {
  const leadSide: Story[] = [
    { category: 'World', title: 'The Ideas, People and Decisions Defining Tomorrow', dek: 'A closer look at the developments making an impact far beyond today’s news cycle.', author: 'Olivia Bennett', time: '6 min read', image: image.world, href: '/article/the-ideas-people-and-decisions-defining-tomorrow' },
    { category: 'Business', title: 'The Next Chapter of the Global Economy', author: 'Marcus Hale', time: '6 min read', href: '/article/the-next-chapter-of-the-global-economy' },
    { category: 'Culture', title: 'Inside the Creative Minds Redefining Modern Design', author: 'Elena Moreau', time: '5 min read', href: '/article/inside-the-creative-minds-redefining-modern-design' },
    { category: 'Technology', title: 'The Technology Quietly Changing Everyday Life', author: 'Priya Raman', time: '7 min read', href: '/article/the-technology-quietly-changing-everyday-life' },
  ];
  return (
    <section className="lead-grid" aria-label="Featured stories">
      <div className="side-stories">
        {leadSide.map((story, index) => <StoryLink key={story.title} story={story} className={index === 0 ? 'lead-side-first' : ''} />)}
      </div>
      <article className="big-story">
        <a className="hero-image-wrap" href="/article/the-new-world-taking-shape-around-us" aria-label="Read The New World Taking Shape Around Us">
          <img src={image.hero} alt="A city skyline at night" />
        </a>
        <p className="image-caption">A changing landscape reflects a world in transition.</p>
        <span className="section-kicker"><i /> THE BIG STORY</span>
        <a href="/article/the-new-world-taking-shape-around-us" className="big-story-title">The New World<br className="desktop-break" /> Taking Shape Around Us</a>
        <p className="big-story-dek">From shifting economies to emerging ideas, the forces shaping our lives are moving faster than ever. PRESSRA brings the context behind the headlines into focus.</p>
        <div className="big-story-meta"><span>Olivia Bennett</span><span>8 min read</span><span>World</span></div>
        <a className="underlined-link" href="/article/the-new-world-taking-shape-around-us">READ THE FULL STORY <Arrow /></a>
      </article>
      <aside className="trending">
        <div className="section-kicker">WHAT’S GETTING ATTENTION</div>
        <h2>Trending Now</h2>
        <p className="section-intro">The conversations readers are following right now.</p>
        <div className="trend-list">
          {trendStories.map((story, index) => (
            <a href={story.href} className="trend-item" key={story.title}>
              <span className="trend-number">{index + 1}</span>
              <span><strong>{story.title}</strong><em>{story.category}</em></span>
            </a>
          ))}
        </div>
      </aside>
    </section>
  );
}

function EditorialSection({ section, id }: { section: typeof lowerSections[number]; id: string }) {
  return (
    <section className="editorial-section" id={id}>
      <div className="section-heading">
        <div>
          <span className="section-kicker">{section.eyebrow}</span>
          <h2>{section.title}</h2>
          <p>{section.intro}</p>
        </div>
      </div>
      <div className="editorial-list">
        {section.items.map((story, index) => (
          <StoryLink key={`${section.title}-${story.title}`} story={{ ...story, href: `/article/${story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }} className={index === 0 ? 'editorial-feature' : ''} />
        ))}
      </div>
      <a className="section-cta" href={`#${id}`}>{section.cta} <Arrow /></a>
    </section>
  );
}

function Footer({ onSubscribe }: { onSubscribe: () => void }) {
  return (
    <>
      <section className="favorites-section">
        <div className="section-kicker">READER FAVORITES</div>
        <h2>Most Read This Week</h2>
        <div className="favorites-list">
          {favorites.map(([number, title, category]) => <a className="favorite" href="#latest" key={number}><span>{number}</span><strong>{title}</strong><em>{category}</em></a>)}
        </div>
      </section>
      <section className="briefing" id="briefing">
        <div><span className="section-kicker">THE PRESSRA BRIEFING</span><h2>The Stories That Matter, Delivered.</h2></div>
        <div><p>Get our editors’ essential reads, sharp perspectives and the week’s most important developments in one thoughtful email.</p><button type="button" className="solid-button" onClick={onSubscribe}>SIGN ME UP <Arrow /></button><small>By subscribing, you agree to receive editorial updates from PRESSRA. You can unsubscribe at any time.</small></div>
      </section>
      <footer className="site-footer" id="follow">
        <div className="footer-social"><span className="section-kicker">STAY IN THE CONVERSATION</span><h2>Follow PRESSRA for new stories, newsroom highlights and perspectives worth sharing.</h2><div className="social-links"><a href="#follow">INSTAGRAM</a><a href="#follow">X</a><a href="#follow">LINKEDIN</a><a href="#follow">YOUTUBE</a></div></div>
        <div className="footer-grid">
          <div className="footer-brand"><a className="footer-wordmark" href="#top">Pressra</a><p>Independent perspective. Stories with substance.</p><p>PRESSRA brings context, curiosity and clarity to the stories shaping our world.</p></div>
          <div><span className="footer-label">SECTIONS</span>{categories.map((category) => <a href={`#${category.toLowerCase()}`} key={category}>{category}</a>)}</div>
          <div><span className="footer-label">EXPLORE</span>{['Home', 'Latest Stories', 'Authors', 'Search'].map((item) => <a href="#top" key={item}>{item}</a>)}</div>
          <div><span className="footer-label">PRESSRA</span>{['About PRESSRA', 'Contact', 'Editorial Tips'].map((item) => <a href="#follow" key={item}>{item}</a>)}</div>
          <div><span className="footer-label">LEGAL</span>{['Privacy Policy', 'Terms of Use'].map((item) => <a href="#follow" key={item}>{item}</a>)}</div>
        </div>
        <div className="footer-bottom"><span>© 2026 PRESSRA. All rights reserved.</span><span><a href="#follow">Privacy Policy</a><a href="#follow">Terms of Use</a><a href="#follow">Contact</a></span></div>
      </footer>
    </>
  );
}

function ListingPage({ title, eyebrow, intro, items }: { title: string; eyebrow: string; intro: string; items: Story[] }) {
  return (
    <div className="page-shell">
      <TopBar onSearch={() => {}} />
      <Masthead />
      <main className="listing-page">
        <section className="listing-heading"><span className="section-kicker">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></section>
        <div className="listing-grid">{items.map((story, index) => <StoryLink key={`${story.category}-${slugify(story.title)}-${index}`} story={{ ...story, href: story.href ?? `/article/${slugify(story.title)}` }} />)}</div>
        <Footer onSubscribe={() => {}} />
      </main>
    </div>
  );
}

function ArticlePage({ slug }: { slug: string }) {
  const allStories = [...stories.picks, ...stories.latest, ...trendStories, ...lowerSections.flatMap((section) => section.items)];
  const story = allStories.find((item) => slugify(item.title) === slug) ?? { category: 'World', title: 'The New World Taking Shape Around Us', dek: 'From shifting economies to emerging ideas, the forces shaping our lives are moving faster than ever. PRESSRA brings the context behind the headlines into focus.', author: 'Olivia Bennett', time: '8 min read', image: image.hero };
  return (
    <div className="page-shell">
      <TopBar onSearch={() => {}} />
      <Masthead />
      <main className="article-page">
        <article className="article-copy">
          <span className="section-kicker">{story.category}</span>
          <h1>{story.title}</h1>
          {story.dek && <p className="article-dek">{story.dek}</p>}
          <div className="big-story-meta"><span>{story.author ?? 'PRESSRA Editorial'}</span><span>{story.time ?? '6 min read'}</span></div>
          <img className="article-image" src={story.image ?? image.hero} alt="" />
          <p>Stories move quickly. Context takes more time. PRESSRA follows the ideas, people and decisions behind the headline, bringing a clear-eyed view of what is changing and why it matters.</p>
          <p>Read the full perspective from our newsroom, with reporting that keeps the wider picture in focus.</p>
        </article>
      </main>
    </div>
  );
}

function InkvoraHeader() {
  return (
    <header className="ink-header">
      <a className="ink-logo" href="/video">INKVORA</a>
      <nav aria-label="Inkvora primary navigation"><a href="/video">Latest</a><a href="/video">Technology</a><a href="/video">Design</a><a href="/video">Business</a><a href="/video">Culture</a><a href="/video">Innovation</a><a href="/video">Magazine</a><a className="active" href="/video">Video</a></nav>
      <div className="ink-actions"><button type="button" aria-label="Search">⌕</button><a href="#ink-subscribe">Subscribe</a></div>
    </header>
  );
}

const inkVideos = [
  { duration: '4:12', title: 'Ideas in Motion', date: 'Oct 20, 2026', image: videoImage.ideas, slug: 'ideas-in-motion' },
  { duration: '12:48', title: 'The Big Ideas, Clearly Told', date: 'Oct 14, 2026', image: videoImage.featured, slug: 'the-big-ideas-clearly-told' },
  { duration: '9:30', title: 'Founders on Building Small', date: 'Oct 8, 2026', image: videoImage.founders, slug: 'founders-on-building-small' },
  { duration: '7:05', title: 'The City as a Living Room', date: 'Oct 1, 2026', image: videoImage.city, slug: 'the-city-as-a-living-room' },
];

function InkvoraFooter() {
  return <footer className="ink-footer" id="ink-subscribe"><div className="ink-footer-top"><div><a className="ink-logo" href="/video">INKVORA</a><p>Stories that shape tomorrow.</p><p>Thoughtful reporting and fresh perspectives on technology, design, business, and culture.</p></div><form onSubmit={(event) => event.preventDefault()}><label htmlFor="ink-email">Subscribe</label><div><input id="ink-email" type="email" placeholder="Your email address" /><button type="submit">Subscribe</button></div></form></div><div className="ink-footer-links"><div><b>Explore</b><a href="/video">Latest</a><a href="/video">Topics</a><a href="/video">Magazine</a><a href="/video">Video</a></div><div><b>Company</b><a href="/video">About</a><a href="/video">Contact</a><a href="/video">Advertise</a><a href="/video">Careers</a></div><div><b>Readers</b><a href="#ink-subscribe">Newsletter</a><a href="/video">Search</a><a href="/video">Contributors</a><a href="/video">Corrections</a></div><div><b>Follow INKVORA</b><div className="ink-social"><a href="https://x.com">X</a><a href="https://www.instagram.com">Instagram</a><a href="https://www.linkedin.com">LinkedIn</a><a href="https://www.youtube.com">YouTube</a></div></div></div><div className="ink-footer-bottom"><span>INKVORA</span><span>© 2026 INKVORA. All rights reserved.</span><span><a href="/video">Privacy Policy</a><a href="/video">Terms of Use</a><a href="/video">Editorial Standards</a></span></div></footer>;
}

function VideoPage() {
  return <div className="ink-page"><InkvoraHeader /><main className="ink-main"><section className="ink-intro"><span className="ink-eyebrow">VIDEO</span><h1>Watch, Listen, Understand</h1><p>Visual stories, interviews, and concise explainers for curious minds.</p></section><a className="ink-featured" href="/video/the-big-ideas-clearly-told"><div className="ink-featured-media"><img src={videoImage.featured} alt="Interview in a gallery" /><span className="ink-play">▶</span></div><div className="ink-featured-copy"><span className="ink-eyebrow">FEATURED</span><h2>The Big Ideas, Clearly Told</h2><p>Watch conversations and short features that make complex subjects easier to explore, from intelligent tools to the future of cities.</p><span className="ink-duration">12:48 · Video feature</span><span className="ink-watch">Watch Now</span></div></a><section className="ink-all"><h2>All Videos</h2><p>Short films, conversations, and visual explainers that bring important stories closer.</p><div className="ink-video-grid">{inkVideos.map((video) => <a href={`/video/${video.slug}`} className="ink-video-card" key={video.title}><div className="ink-video-media"><img src={video.image} alt="" /><span className="ink-play small">▶</span></div><span className="ink-duration">{video.duration}</span><h3>{video.title}</h3><time>{video.date}</time></a>)}</div></section></main><InkvoraFooter /></div>;
}

function App() {
  const path = window.location.pathname;
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const allStories = useMemo(() => [...stories.picks, ...stories.latest, ...trendStories, ...lowerSections.flatMap((section) => section.items)], []);
  const matches = search.trim() ? allStories.filter((story) => `${story.title} ${story.category}`.toLowerCase().includes(search.toLowerCase())).slice(0, 6) : [];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (path === '/video' || path.startsWith('/video/')) return <VideoPage />;
  if (path.startsWith('/article/')) return <ArticlePage slug={path.split('/')[2] ?? ''} />;
  if (path === '/latest') return <ListingPage title="The Latest" eyebrow="FRESHLY PUBLISHED" intro="New reporting, useful perspectives and fresh ideas from across the PRESSRA newsroom." items={stories.latest} />;
  if (path.startsWith('/category/')) {
    const category = (path.split('/')[2] ?? 'world').replace(/-/g, ' ');
    const items = [...stories.picks, ...stories.latest, ...trendStories, ...lowerSections.flatMap((section) => section.items)].filter((story) => story.category.toLowerCase() === category.toLowerCase());
    return <ListingPage title={`${category.charAt(0).toUpperCase()}${category.slice(1)} in Perspective`} eyebrow={category.toUpperCase()} intro={`Clear-eyed stories and perspectives from across the ${category} desk.`} items={items.length ? items : stories.latest} />;
  }

  return (
    <div className="page-shell">
      <TopBar onSearch={() => setSearchOpen(true)} />
      <Masthead />
      <main>
        <LeadGrid />
        <section className="story-section" id="latest">
          <div className="section-title-row"><div><span className="section-kicker">EDITOR’S PICKS</span><h2>Stories Worth Your Time</h2><p>A considered selection of the stories, perspectives and discoveries our editors think you should know.</p></div></div>
          <div className="story-card-grid picks-grid">{stories.picks.map((story) => <StoryLink story={story} key={story.title} />)}</div>
        </section>
        <section className="story-section latest-section">
          <div className="section-title-row"><div><span className="section-kicker">FRESHLY PUBLISHED</span><h2>The Latest</h2><p>New reporting, useful perspectives and fresh ideas from across the PRESSRA newsroom.</p></div></div>
          <div className="story-card-grid latest-grid">{stories.latest.map((story) => <StoryLink story={story} key={story.title} />)}</div>
          <a className="section-cta" href="#latest">VIEW ALL STORIES <Arrow /></a>
        </section>
        {lowerSections.map((section, index) => <EditorialSection key={section.title} section={section} id={['world', 'business', 'technology', 'culture', 'sports'][index]} />)}
        <Footer onSubscribe={() => setSubscribed(true)} />
      </main>
      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search PRESSRA"><button className="overlay-close" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button><div className="search-box"><span className="section-kicker">SEARCH PRESSRA</span><div className="search-input-wrap"><SearchIcon /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stories, sections and ideas" /></div>{search.trim() ? <div className="search-results">{matches.length ? matches.map((story) => <a href={story.href ?? `/article/${slugify(story.title)}`} key={`${story.category}-${story.title}`} onClick={() => setSearchOpen(false)}><span>{story.category}</span><strong>{story.title}</strong></a>) : <p>No stories found.</p>}</div> : <p className="search-hint">Try “technology”, “world” or “cities”.</p>}</div></div>}
      {subscribed && <div className="toast" role="status"><strong>You’re on the list.</strong><span>The PRESSRA briefing is coming your way.</span><button onClick={() => setSubscribed(false)} aria-label="Dismiss">×</button></div>}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
