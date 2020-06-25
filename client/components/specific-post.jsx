import React from 'react';

export default class SpecificPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null
    };
  }

  render() {
    return (
      <div>
        <header className="post-header text-center d-flex justify-content-between align-items-center pt-3 pl-3 pr-3 pb-2">
          <div className="header-icon-container d-flex flex-column justify-content-center mt-2">
            <img
              onClick={() => this.props.setView('search')}
              className="header-icon" src="./images/kindpng.png"></img>
            <p className="following m-0 invisible">go back</p>
          </div>
          <div className="post-header-text">
            <p className="m-0">&ldquo;Vendetta&rdquo;</p>
            <p className="m-0">by</p>
            <p className="m-0">User</p>
          </div>
          <div className="header-icon-container d-flex flex-column justify-content-center mt-2">
            <img className="header-icon" src="./images/fire-alt-solid.svg"></img>
            <p className="following pt-1 m-0"><span>420</span> Watching</p>
          </div>
        </header>
        <div className="post-body">
          <div className="art-info">
            <div className="post-image-container">
              <img src="https://i.picsum.photos/id/72/800/800.jpg?hmac=yUlan-c5Ns8rxfyTLLnVDNHAXBo68XLUgnr_IrGCgS0"></img>
            </div>
            <div className="post-description">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aspernatur odio hic ex! Nulla mollitia odit assumenda nemo voluptates, tempora ullam, sint quaerat nesciunt dolorum pariatur consequuntur maxime corrupti quod?</p>
            </div>
          </div>
        </div>
        <div className="post-bid-info d-flex">
          <div className="d-flex flex-column">
            <button>$80.00</button>
            <button>Submit Bid</button>
            <button>Message</button>
          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}
