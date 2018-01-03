/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/vuls/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const supportedOSes = [
  {
    caption: 'RedHat Enterprise Linux',
    image: '/vuls/img/redhat-logo_640x480.jpg',
    infoLink: 'https://www.prettier.io',
    // fbOpenSource: false,
    pinned: true,
  },
  {
    caption: 'FastText',
    image: '/img/fasttext.png',
    infoLink: 'https://fasttext.cc',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'Jest',
    image: '/img/jest.png',
    infoLink: 'https://facebook.github.io/jest/',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'Reason React',
    image: '/img/reason-react.svg',
    infoLink: 'https://reasonml.github.io/reason-react/',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'MakeItOpen',
    image: '/img/makeitopen.png',
    infoLink: 'http://makeitopen.com/',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'React Native',
    image: '/img/react-native.svg',
    infoLink: 'https://facebook.github.io/react-native',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'Relay',
    image: '/img/relay.svg',
    infoLink: 'https://facebook.github.io/relay/',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'Bucklescript',
    image: '/img/bucklescript.svg',
    infoLink: 'https://bucklescript.github.io/',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: 'Docusaurus',
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.docusaurus.io',
    fbOpenSource: true,
    pinned: true,
  },
  {
    caption: "Almin",
    image: "/img/almin.png",
    infoLink: "https://almin.js.org/",
    fbOpenSource: false,
    pinned: false,
  },
];

const siteConfig = {
  title: 'Vuls',
  tagline: 'Agentless Vulnerability Scanner for Linux/FreeBSD',
  url: 'https://github.com/future-architect/vuls',
  baseUrl: '/vuls/',
  editUrl: 'https://github.com/vulsdoc/vuls/edit/master/docs/',
  headerLinks: [
    {doc: 'abstract', label: 'Docs'},
    {doc: 'community', label: 'Community'},
    {blog: true, label: 'Blog'},
    { search: true },
    { languages: true },

    {
      href: "https://github.com/future-architect/vuls",
      label: "GitHub",
      external: true
    },
  ],
  users,
  supportedOSes,
  algolia: {
    apiKey: "2a8985a4307332f9c90d32a8f7c278a2",
    indexName: "vulsdoc"
  },
  /* path to images for header/footer */
  headerIcon: 'img/docs/vuls_icon.png',
  footerIcon: 'img/docs/vuls_icon.png',
  favicon: 'img/docs/vuls_icon.png',
  /* colors for website */
  colors: {
    primaryColor: '#1b47b8',
    secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    'kotakanbe',
  organizationName: 'vulsdoc', // or set an env variable ORGANIZATION_NAME
  projectName: 'vuls', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/future-architect/ uls',
};

module.exports = siteConfig;
