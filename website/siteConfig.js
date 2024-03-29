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
  {
    caption: 'Sansan',
    image: '/img/icons/sansan.png',
    infoLink: 'https://jp.corp-sansan.com/',
    pinned: true,
  },
  {
    caption: 'ITI',
    image: '/img/icons/iti.svg',
    infoLink: 'https://www.iti-inc.co.jp/',
    pinned: true,
  },
  {
    caption: 'Prott',
    image: '/img/icons/prott.svg',
    infoLink: 'https://prottapp.com/',
    pinned: true,
  },
  {
    caption: 'IDCF',
    image: '/img/icons/idcf.png',
    infoLink: 'https://www.idcf.jp/',
    pinned: true,
  },
  {
    caption: 'SAKURA internet',
    image: '/img/icons/sakura.svg',
    infoLink: 'https://www.sakura.ad.jp/',
    pinned: true,
  },
  {
    caption: 'Velc',
    image: '/img/icons/velc.svg',
    infoLink: 'https://www.velc.co.jp/',
    pinned: true,
  },
  {
    caption: 'cgate',
    image: '/img/icons/cgate.svg',
    infoLink: 'https://www.cgate.jp/',
    pinned: true,
  },
  {
    caption: 'DMM.com',
    image: '/img/icons/DMM.com_logo_RGB_small.png',
    infoLink: 'https://dmm-corp.com/',
    pinned: true,
  },
  {
    caption: 'lancers',
    image: '/img/icons/lancers.svg',
    infoLink: 'https://www.lancers.co.jp/',
    pinned: true,
  },
  {
    caption: 'mazrica',
    image: '/img/icons/mazrica.svg',
    infoLink: 'https://mazrica.com/',
    pinned: true,
  },
  {
    caption: 'livesense',
    image: '/img/icons/livesense.jpg',
    infoLink: 'https://en.livesense.co.jp/',
    pinned: true,
  },
  {
    caption: 'raksul',
    image: '/img/icons/raksul.jpg',
    infoLink: 'https://corp.raksul.com/',
    pinned: true,
  },
  {
    caption: 'ierae security',
    image: '/img/icons/ierae.png',
    infoLink: 'https://ierae.co.jp/',
    pinned: true,
  },
  {
    caption: 'Wedding Park',
    image: '/img/icons/weddingpark.png',
    infoLink: 'https://www.weddingpark.co.jp/',
    pinned: true,
  },
  {
    caption: 'Nihon University',
    image: '/img/icons/nichidai.svg',
    infoLink: 'https://www.nihon-u.ac.jp/',
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
    {
      href: "https://github.com/vulsdoc/vuls",
      label: "vulsdoc",
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
