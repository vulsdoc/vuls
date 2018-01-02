/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

class HomeSplash extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="projectLogo">
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                <img src={siteConfig.baseUrl + 'img/docs/vuls_logo.png'} />
                <small>{siteConfig.tagline}</small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        this.props.language +
                        '/tutorial.html'
                      }>
                      Tutorial
                    </Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        this.props.language +
                        '/supported-os.html'
                      }>
                      Supported OS
                    </Button>
                    <Button href='https://github.com/future-architect/vuls'> GitHub </Button>
                  </div>
                </div>
              </div>
	      <div
	        className="productShowcaseSection paddingBottom"
	        style={{textAlign: 'center'}}>
	    <p>
	    Vuls is open-source, agent-less vulnerability scanner based on information from NVD, OVAL, etc.
	    </p>
	          <a href={siteConfig.baseUrl + "img/docs/vuls-abstract.png"} target="_blank"><img src={siteConfig.baseUrl + 'img/docs/vuls-abstract.png'} /></a>
	      </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    let language = this.props.language || 'en';
    const showcase = siteConfig.users
      .filter(user => {
        return user.pinned;
      })
      .map(user => {
        return (
          <a href={user.infoLink}>
            <img src={user.image} title={user.caption} />
          </a>
        );
      });

    const supportedOSes = siteConfig.supportedOSes
      .filter(os => {
        return os.pinned;
      })
      .map((os, i) => {
        return (
          <a href={os.infoLink} key={i}>
            <img src={os.image} title={os.caption} />
          </a>
        );
      });

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">

          <Container padding={["bottom", "top"]}>
            <GridBlock
              align="center"
              contents={[
                {
                  content:
                    `Cloud, on-premise, Docker and supports major distributions.`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  imageLink: `${siteConfig.baseUrl}docs/${this.props.language}/supported-os.html`,
                  title: "Run Anyware"
                },
                {
                  content:
                    `Vuls uses Multiple vulnerability databases OVAL, RHSA/ALAS/ELSA/FreeBSD-SA and Changelog.`,
                  // image: `${siteConfig.baseUrl}img/markdown.png`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  title: "High Quality Scan"
                },
                {
                  content:
                    `It is possible to acquire the state of the server executing some commands. Vuls warns when the scan target server was updated the kernel etc. but not restarting it.`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  title: "Dynamic Analysis"
                },
              ]}
              layout="threeColumn"
            />
            <br />
            <br />
            <GridBlock
              align="center"
              contents={[
                {
                  content:
                    `Remote scan mode is required to only setup one machine that is connected to other scan target servers via SSH. If you don't want the central Vuls server to connect to each server by SSH, you can use Vuls in the Local Scan mode.`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  imageLink: `${siteConfig.baseUrl}docs/${this.props.language}/architecture-remote-local.html`,
                  title: "Remote and Local Scan"
                },
                {
                  content:
                    `Fast scan mode scans without root privilege, no internet access, almost no load on the scan target server. Deep scan mode scans in more detail.`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  imageLink: `${siteConfig.baseUrl}docs/${this.props.language}/architecture-fast-deep.html`,
                  title: "Fast and Deep Scan"
                },
                {
                  content:
                    `It is possible to detect vulnerabilities in non-OS packages, such as something you compiled by yourself, language libraries and frameworks, that have been registered in the CPE.`,
                  image: `https://docusaurus.io/img/translation.svg`,
                  imageAlign: "top",
                  title: "Scan Vulnerabilites of non-OS packages",
                  imageLink: `${siteConfig.baseUrl}docs/${this.props.language}/usage-scan-non-os-packages.html`
                },
              ]}
              layout="threeColumn"
            />
          </Container>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content: 'Talk about trying this out', 
		  image: 'https://raw.githubusercontent.com/usiusi360/vulsrepo/master/gallery/demo.gif',
                  imageAlign: 'right',
                  title: 'VulsRepo',
                  imageLink: 'https://github.com/usiusi360/vulsrepo',
                },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']} id="try">
            <GridBlock
              contents={[
              {
                content: "Pre-trained on English webcrawl and Wikipedia",
                image: "https://asciinema.org/a/3y9zrf950agiko7klg8abvyck.png",
                imageAlign: "left",
                title: "[English word vectors](" + siteConfig.baseUrl + "docs/en/english-vectors.html)",
                imageLink: "https://asciinema.org/a/3y9zrf950agiko7klg8abvyck",
                pinned : "true",
              },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content:
                    '',
                  image: siteConfig.baseUrl + 'img/docs/vuls-slack-en.png',
                  imageAlign: 'right',
                  title: 'Description',
                },
              ]}
            />
          </Container>

          <div className="productShowcaseSection paddingBottom">
            <h2>{"Supported OS"}</h2>
            <p>Docusaurus is building websites for these projects...</p>
            <div className="logos">{supportedOSes}</div>
            <div className="more-users">
              <a
                className="button"
                href={`${siteConfig.baseUrl}${this.props.language}/os.html`}>
                Supported OS
              </a>
            </div>
          </div>


          <Container padding={['bottom', 'top']} background="light">
          <div className="productShowcaseSection paddingBottom">
            <h2>{"Who's Using This?"}</h2>
            <p>This project is used by all these people</p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
              <a
                className="button"
                href={
                  siteConfig.baseUrl + this.props.language + '/' + 'users.html'
                }>
                More {siteConfig.title} Users
              </a>
            </div>
          </div>
          </Container>

	  <div
          className="productShowcaseSection paddingTop"
          style={{ textAlign: "center" }} >
          <h2>
              <a href={siteConfig.baseUrl + "docs/en/english-vectors.html"}>Download pre-trained models</a>
          </h2>
          <Container>
            <GridBlock
            align="center"
            contents={[
              {
                content: "Pre-trained on English webcrawl and Wikipedia",
                image: "https://asciinema.org/a/3y9zrf950agiko7klg8abvyck.png",
                imageAlign: "top",
                title: "[English word vectors](" + siteConfig.baseUrl + "docs/en/english-vectors.html)",
                imageLink: "https://asciinema.org/a/3y9zrf950agiko7klg8abvyck",
                pinned : "true",
              },
              {
                content: "Pre-trained on 294 different languages of Wikipedia",
                image: siteConfig.baseUrl + "img/model-red.png",
                imageAlign: "top",
                title: "[Wiki word vectors](" + siteConfig.baseUrl + "docs/en/pretrained-vectors.html)",
                imageLink: siteConfig.baseUrl + "docs/en/pretrained-vectors.html",
              },
            ]}
          layout="twoColumn"
            />
            </Container>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Index;
