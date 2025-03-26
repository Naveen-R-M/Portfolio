import React from 'react';
import { Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';
import { socialLinks } from '../data/portfolio-data';
import profileDark from '../assets/images/profile_dark.jfif';
import profilePurple from '../assets/images/profile_purple.png';
import profileLight from '../assets/images/profile_light.jpg';

const THEME_AVATARS = {
  dark: profileDark,
  purple: profilePurple,
  light: profileLight
} as const;

export const ProfileHeader = () => {
  const { theme, setTheme } = useTheme();
  const [avatarKey, setAvatarKey] = React.useState(Date.now());

  React.useEffect(() => {
    setAvatarKey(Date.now());
  }, [theme]);

  // Set default theme to dark on first load
  React.useEffect(() => {
    if (!theme) {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-content1 rounded-lg">
      <Avatar
        key={avatarKey}
        src={THEME_AVATARS[theme as keyof typeof THEME_AVATARS] || THEME_AVATARS.light}
        className="w-32 h-32 text-large"
        isBordered
        color="primary"
        imgProps={{
          loading: "eager",
          crossOrigin: "anonymous"
        }}
      />
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-2">
          Naveen Rajagopal Mohanraj
        </h1>
        <p className="text-xl text-primary mb-2">
          Research Assistant | MS in Software Engineering
        </p>
        <p className="text-default-600 mb-4">
          Ex-ADF Engineer & Problem Solver | GDG Cloud Member | Tech Enthusiast with a Dash of Humor 🎯
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
          {socialLinks.map((link) => (
            <Button
              key={link.id}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="flat"
              startContent={<Icon icon={link.icon} className="text-xl" />}
            >
              {link.title}
            </Button>
          ))}
        </div>
        <Button 
          color="primary" 
          variant="solid"
          size="lg"
          onPress={scrollToContact}
        >
          Contact Me
        </Button>
      </div>
    </div>
  );
};