import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faSortAmountDown, faSitemap, faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { Container, Nav, Alert, Button } from 'reactstrap';
import Web3 from 'web3';
import Transactions from './Transactions';
import History from './History';
import logo from './logo.svg';
import './App.css';

library.add(faEthereum, faSignInAlt, faSignOutAlt, faSortAmountDown, faSitemap, faArrowRight, faExternalLinkAlt)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      metamaskInfoOpen: false,
    };

    this.onDismissMetamaskInfo = this.onDismissMetamaskInfo.bind(this);

    this.web3js = new Web3(window.web3.currentProvider);

    this.web3js.eth.net.getNetworkType().then((networkName) => {
      if (networkName !== 'rinkeby') {
        let state = this.state;
        state.metamaskInfoOpen = true;
        this.setState(state);
      } else {
        window.web3.currentProvider.publicConfigStore.on('update', () => {
          this.setMetaMaskAccount();
        });
        this.setMetaMaskAccount();
      }
    });
  }

  setMetaMaskAccount() {
    this.web3js.eth.getAccounts().then((accounts) => {
      if (this.state.account !== accounts[0]) {
        let state = this.state;
        state.account = accounts[0];
        this.setState(state);
      }
    });
  }

  onDismissMetamaskInfo() {
    let state = this.state;
    state.metamaskInfoOpen = false;
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal"><a href="/"><img src={logo} className="logo" alt="logo" /></a></h5>
          <Nav className="ml-md-3">
            <span className="p-2 mr-3 text-light d-none d-md-inline-block text-truncate">Address: <strong>{this.state.account}</strong></span>
            <span className="p-2 mr-3 text-light">ETH Balance: <strong>0.00</strong> <FontAwesomeIcon icon={["fab", "ethereum"]} /></span>
            <span className="p-2 mr-4 text-light">Plasma Balance: <strong>0.00</strong> <FontAwesomeIcon icon={["fab", "ethereum"]} /></span>
          </Nav>
            <Button color="primary"><FontAwesomeIcon icon="sign-in-alt" /> Deposit in <FontAwesomeIcon icon={["fab", "ethereum"]} /></Button>
        </div>
        <Container>
          <Alert color="info" isOpen={this.state.metamaskInfoOpen} toggle={this.onDismissMetamaskInfo}>
            Please enable MetaMask extension and select Rinkeby test network
          </Alert>
          <Transactions account={this.state.account} />
          <History />
          <footer className="pt-4 my-md-5 pt-md-5 border-top mx-3">
            <div className="row">
              <div className="col-12 col-md">
                <img className="mb-2 bg-dark logo-icon" src={logo} alt="" />
                <small className="d-block mb-3 text-muted">&copy;&nbsp;2018</small>
              </div>
              <div className="col-6 col-md">
                <h5>Features</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="https://thematter.io" target="_blank">Matter Plasma</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Resources</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="https://github.com/matterinc/" target="_blank">GitHub</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>About</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="https://thematter.io/#rec66652294" target="_blank">Team</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </Container>
      </div>
    );
  }
}

export default App;
