/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'Future Architect',
    image: 'https://www.future.co.jp/assets/images/logo.svg',
    infoLink: 'https://www.future.co.jp/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Vuls',
  tagline: 'Agentless Vulnerability Scanner for Linux/FreeBSD',
  url: 'https://github.com/future-architect/vuls',
  baseUrl: '/',
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
  algolia: {
    apiKey: "2a8985a4307332f9c90d32a8f7c278a2",
    indexName: "vulsdoc"
  },
  /* path to images for header/footer */
  headerIcon: 'img/docs/vuls_icon.png',
  footerIcon: 'img/docs/vuls_icon.png',
  favicon: 'img/docs/vuls_icon.png',
  gaTrackingId: 'UA-112589928-1',
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
  repoUrl: 'https://github.com/future-architect/vuls',
};

module.exports = siteConfig;
