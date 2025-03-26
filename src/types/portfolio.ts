export interface StoryHighlight {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export interface SocialLink {
  id: string;
  title: string;
  icon: string;
  url: string;
}

export interface PortfolioPost {
  id: string;
  title: string;
  image: string;
  description: string;
  caption: string;
  tags: string[];
  githubLink?: string;
  type: 'project' | 'experience' | 'education' | 'skill' | 'research';
}

export interface PortfolioData {
  socialLinks: SocialLink[];
  storyHighlights: StoryHighlight[];
  portfolioPosts: PortfolioPost[];
}
