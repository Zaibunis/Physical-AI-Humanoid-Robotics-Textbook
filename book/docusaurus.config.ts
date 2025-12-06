import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Simulation to the Real World',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://Zaibunis.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Physical-AI-Humanoid-Robotics-Textbook/',

  // GitHub pages deployment config.
  organizationName: 'Zaibunis', // Usually your GitHub org/user name.
  projectName: 'Physical-AI-Humanoid-Robotics-Textbook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl: 'https://github.com/Zaibunis/Physical-AI-Humanoid-Robotics-Textbook',
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/card.jpg',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Book Logo',
        src: 'img/logo.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Book',
        },
        {
          href: 'https://github.com/Zaibunis/Physical-AI-Humanoid-Robotics-Textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
  style: 'dark',
  links: [
    {
      title: 'Content',
      items: [
        {
          label: 'Book',
          to: '/docs/intro',
        },
      ],
    },
    {
      title: 'Social Links',
      items: [
       {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/faria-mustaqeem-3367b5301/',
        },
        {
          label: 'Twitter',
          href: 'https://x.com/Faria1539114',
        },
         {
          label: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=61577614329277',
        }
      ],
    },
    {
      title: 'More',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/Zaibunis/Physical-AI-Humanoid-Robotics-Textbook',
        },
         {
          label: 'Portfolio',
          href: 'https://faria-mustaqim.vercel.app/',
        },
      ],
    },
  ],
  logo: {
    alt: 'Physical AI Logo',
    src: '/img/logo.jpg',
    href: '/',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Built with ❤️ by Faria Mustaqim. All rights reserved.`,
}
,
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;