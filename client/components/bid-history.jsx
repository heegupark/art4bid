import React from 'react';

export default class BidHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: []
    };
    // this.getBids = this.getBids.bind(this)
  }

  // componentDidMount() {
  //   this.getBids(this.props.bidId)
  // }

  // getBids(bidId) {

  // }

  render() {
    return (
      <div className="bid-history text-center">
        <header>
          <div className="bid-back-icon-container">
            <img onClick={() => this.props.toggleBidHistory('off')} className="bid-back-icon" src="./images/kindpng.png"></img>
          </div>
          <p id="bid-history" className="mb-1">Bid History</p>
        </header>
        <div className="bid-table">
          <table>
            <thead>
              <tr>
                <th>Bid</th>
                <th>Username</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>spout</td>
                <td>4/20/20 | 120PM</td>
                <td>$20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }

}