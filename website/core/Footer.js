/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            <img
              src={this.props.config.baseUrl + this.props.config.footerIcon}
              alt={this.props.config.title}
              width="66"
              height="58"
            />
          </a>
          <div>
            <h5>Docs</h5>
            <a
              href={
                this.props.config.baseUrl +
                'docs/' +
                this.props.language +
                '/abstract.html'
              }>
              Introduction
            </a>
            <a
              href={
                this.props.config.baseUrl +
                'docs/' +
                this.props.language +
                '/architecture-remote-local.html'
              }>
              Architecture
            </a>
            <a
              href={
                this.props.config.baseUrl +
                'docs/' +
                this.props.language +
                '/tutorial.html'
              }>
              Tutorial
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="http://goo.gl/forms/xm5KFo35tu">Join Slack</a>
            <a href="https://vuls-github.slack.com/">Slack</a>
            <a href="https://twitter.com/vuls_en">Twitter(English)</a>
            <a href="https://twitter.com/vuls_ja">Twitter(Japanese)</a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>Blog</a>
            <a href="https://github.com/future-architect/vuls">GitHub</a>
          </div>
        </section>

        <a
          href="https://github.com/future-architect/vuls"
          target="_blank"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/docs/vuls_logo.png'}
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} kotakanbe
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
