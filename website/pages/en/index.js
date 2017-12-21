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
              <img src={siteConfig.baseUrl + 'img/docusaurus.svg'} />
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
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
                    <Button href="#OS">Supported OS</Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        this.props.language +
                        '/doc2.html'
                      }>
                      GitHub
                    </Button>
                  </div>
                </div>
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
          <Container padding={['bottom', 'top']}>
            <GridBlock
              align="center"
              contents={[
                {
                  content: 'This is the content of my feature',
                  image: siteConfig.baseUrl + 'img/docusaurus.svg',
                  imageAlign: 'top',
                  title: 'Feature One',
                },
                {
                  content: 'The content of my second feature',
                  image: siteConfig.baseUrl + 'img/docusaurus.svg',
                  imageAlign: 'top',
                  title: 'Feature Two',
                },
              ]}
              layout="fourColumn"
            />
          </Container>

          <div
            className="productShowcaseSection paddingBottom"
            style={{textAlign: 'center'}}>
            <h2>Feature Callout</h2>
            <MarkdownBlock>These are features of this project</MarkdownBlock>
          </div>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content: 'Talk about learning how to use this',
                  image: siteConfig.baseUrl + 'img/docusaurus.svg',
                  imageAlign: 'right',
                  title: 'Learn How',
                },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']} id="try">
            <GridBlock
              contents={[
                {
                  content: 'Talk about trying this out', image: siteConfig.baseUrl + 'img/docusaurus.svg',
                  imageAlign: 'left',
                  title: 'Try it Out',
                },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content:
                    'This is another description of how this project is useful',
                  image: siteConfig.baseUrl + 'img/docusaurus.svg',
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
                image: siteConfig.baseUrl + "img/model-blue.png" ,
                imageAlign: "top",
                title: "[English word vectors](" + siteConfig.baseUrl + "docs/en/english-vectors.html)",
                imageLink: siteConfig.baseUrl + "docs/en/english-vectors.html",
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
