import React from 'react';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      detailMessages: [],
      isMessageDetail: false,
      postId: null
    };
    this.getMessageList = this.getMessageList.bind(this);
    this.getTimeMsg = this.getTimeMsg.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleViewMessageClick = this.handleViewMessageClick.bind(this);
    this.viewMessageDetail = this.viewMessageDetail.bind(this);
  }

  componentDidMount() {
    const { userInfo } = this.props;
    this.getMessageList(userInfo.userId);
  }

  getMessageList(userId) {
    const body = { recipientId: userId };
    fetch('/api/message/list/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(messages => {
        this.setState({
          messages
        });
      });
  }

  handleBackClick() {
    this.setState({
      isMessageDetail: false
    });
  }

  handleSearchClick() {

  }

  handleViewMessageClick() {
    const { userInfo } = this.props;
    this.setState({
      isMessageDetail: true
    });
    const senderId = event.target.id.split(',')[0];
    const postId = event.target.id.split(',')[1];
    this.setState({
      postId: postId
    });
    this.viewMessageDetail(userInfo.userId, senderId, postId);
  }

  viewMessageDetail(userId, senderId, postId) {
    const body = {
      recipientId: userId,
      senderId: senderId,
      postId: postId
    };
    fetch('/api/message/detail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(messages => {
        this.setState({
          detailMessages: messages
        });
      });
  }

  getTimeMsg(createdAt) {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    let diff = (currentTime - createdTime) / 1000;

    const second = 1;
    const minute = 60;
    const hour = 60;
    const day = 24;
    const month = 30;
    const year = 12;

    let divider = second;
    let timeMsg = 'minutes';

    if (diff < 60 * second) {
      divider = second;
      timeMsg = 'second';
    } else if (diff < 60 * second * minute) {
      divider = second * minute;
      timeMsg = 'minute';
    } else if (diff < 60 * second * minute * hour) {
      divider = second * minute * hour;
      timeMsg = 'hour';
    } else if (diff < 60 * second * minute * hour * day) {
      divider = second * minute * hour * day;
      timeMsg = 'day';
    } else if (diff < 60 * second * minute * hour * day * month) {
      divider = second * minute * hour * day * month;
      timeMsg = 'month';
    } else if (diff < 60 * second * minute * hour * day * month * year) {
      divider = second * minute * hour * day * month * year;
      timeMsg = 'month';
    }

    diff /= divider;

    const displayTime = Math.abs(Math.round(diff));
    const plural = displayTime > 1 ? 's' : '';
    const timeMessage = `${displayTime} ${timeMsg}${plural} ago`;
    return timeMessage;
  }

  render() {
    // const { userInfo } = this.props;
    const { handleBackClick, handleSearchClick, handleViewMessageClick } = this;
    const { messages, isMessageDetail, detailMessages, postId } = this.state;
    return (
      <div>
        <div className='d-flex flex-column align-items-center'>
          <div className='d-flex justify-content-between col-12 mb-2 mt-1'>
            <div className="my-auto icon-custom">
              {isMessageDetail
                ? (
                  <i
                    className="fas fa-chevron-left"
                    onClick={handleBackClick}>
                  </i>
                )
                : ('')
              }
            </div>
            <div className='header-title pt-3 pb-3 mx-auto'>MESSAGE</div>
            <div className="my-auto icon-custom">
              <i
                className="fas fa-search"
                onClick={handleSearchClick}>
              </i>
            </div>
          </div>
          <div>
            <p className="text-primary postid-custom">{isMessageDetail ? `postID: ${postId}` : '' }</p>
          </div>
        </div>
        {messages.length === undefined || messages.length === 0
          ? (
            <div className='d-flex flex-column align-items-center'>
              <div className='d-flex justify-content-between col-12 mb-2 mt-1'>
                <div className='pt-3 pb-3 mx-auto'>You have no messages.</div>
              </div>
            </div>
          )
          : isMessageDetail
            ? (
              <div>
                {
                  detailMessages.map((message, index) => {
                    return (
                      <div
                        key={index}
                        className="fadeIn mx-auto message-box">
                        <div className="row">
                          <span className="col-3 mt-1 ml-3 message-sender">
                            {message.senderName}
                          </span>
                          <span className="col mt-2 text-right text-secondary message-time">
                            {this.getTimeMsg(message.createdAt)}
                          </span>
                          <span className="col mr-2 mt-2 text-right text-dark message-date">
                            {new Date(message.createdAt).toLocaleString().split(',')[0] + ' |' + new Date(message.createdAt).toLocaleString().split(',')[1]}
                          </span>
                        </div>
                        <div className="row">
                          <div className="col text-dark mb-1 message-content">
                            <span className="ml-3 text-left">{message.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            )
            : (
              <div className='align-items-center'>
                <div className='mb-2 mt-1'>
                  {
                    messages.map((message, index) => {
                      return (
                        <div
                          key={index}
                          className="fadeIn mx-auto message-box"
                          onClick={handleViewMessageClick}>
                          <div className="row">
                            <span className="col-3 mt-1 ml-3 message-sender">
                              {message.senderName}
                            </span>
                            <span className="col mt-2 text-right text-secondary message-postid">
                              {'postId:' + message.postId}
                            </span>
                            <span className="col mt-2 text-right text-secondary message-time">
                              {this.getTimeMsg(message.createdAt)}
                            </span>
                            <span className="col mr-2 mt-2 text-right text-dark message-date">
                              {new Date(message.createdAt).toLocaleString().split(',')[0] + ' |' + new Date(message.createdAt).toLocaleString().split(',')[1]}
                            </span>
                          </div>
                          <div className="row">
                            <div className="col text-dark mb-1 message-content">
                              <span className="ml-3 text-left" id={message.senderId + ',' + message.postId}>{message.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
