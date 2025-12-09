import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Simulation to the Real World',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://Physical-AI-Humanoid-Robotics-Textbook.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/book-writing/',

  // GitHub pages deployment config.
  organizationName: 'Zaibunis', // Usually your GitHub org/user name.
  projectName: 'Physical-AI-Humanoid-Robotics-Textbook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

i18n: {
  defaultLocale: 'en',
  locales: ['ur'],
  localeConfigs: {
    ur: {
      label: 'اردو',    // This is what will appear in the dropdown
      direction: 'rtl',
    },
  },
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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Book Logo',
        src: '/img/book-cover.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Book',
        },
    {
  type: 'localeDropdown',
  position: 'right',
},
{
  type: 'dropdown',
  label: 'Account',
  position: 'right',
  items: [
    { label: 'Login', href: 'https://your-login.com' },
    { label: 'Sign Up', href: 'https://your-login.com/signup' },
    { label: 'Dashboard', href: 'https://app.yoursite.com' },
  ],
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
      title: 'Start Learning',
      items: [
        { label: 'Getting Started', to: '/docs/intro' },
        { label: 'Full Table of Contents', to: '/docs' },
        { label: 'Recommended Learning Path', to: '/docs/category/roadmap' },
      ],
    },
    {
      title: 'Connect',
      items: [
        { label: 'YouTube', href: 'https://www.youtube.com/@Huzaifasys' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/huzaifasys/' },
        { label: 'GitHub', href: 'https://github.com/Zaibunis' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Complete GitHub Repo', href: 'https://github.com/Zaibunis/Physical-AI-Humanoid-Robotics-Textbook' },
        { label: 'Simulation Examples', href: 'https://github.com/Zaibunis/Physical-AI-Humanoid-Robotics-Textbook/tree/main/examples' },
        { label: 'Download PDF', href: '/pdf/latest-book.pdf' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/zaibunis' },
        { label: 'GitHub Sponsors', href: 'https://github.com/sponsors/Zaibunis' },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics • Made with ❤️ by Zaibunis`,
},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;