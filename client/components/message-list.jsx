import React from 'react';
import { Spring, config } from 'react-spring/renderprops';

export default class MessageList extends React.Component {
  render() {
    const { messages, userInfo, handleViewMessageClick, keyword, textBolder } = this.props;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={config.molasses}
      >
        {
          props =>
            <div style={props} className='align-items-center message-list-box'>
              <div className='mb-2 mt-1'>
                {messages.length > 0
                  ? (
                    messages.map((message, index) => {
                      const isMe = userInfo.userName === message.senderName;
                      let name = null;
                      if (keyword) {
                        name = textBolder(`${message.senderName}${isMe ? ' (Me)' : ''}`, keyword);
                      } else {
                        name = (
                          <>
                            {`${message.senderName}${isMe ? ' (Me)' : ''}`}
                          </>
                        );
                      }
                      return (
                        <div
                          key={index}
                          className={`mb-1 fadeIn mx-auto ${isMe ? 'message-box-list-me' : 'message-box-list-sender'}`}>
                          <div className="d-flex justify-space-between">
                            <span
                              className="col mt-2 ml-1 message-sender text-left"
                              id={message.senderId + ',' + message.senderName + ',' + message.postId + ',' + message.title + ',' + message.recipientId}
                              onClick={handleViewMessageClick}>
                              {name}
                            </span>
                            <span className="col mr-2 mt-2 text-right text-dark message-date">
                              {new Date(message.createdAt).toLocaleString().split(',')[0] + ' |' + new Date(message.createdAt).toLocaleString().split(',')[1]}
                            </span>
                          </div>
                          <div>
                            <div className="col text-dark pb-1 message-content">
                              <span
                                className="ml-1 text-left cursor-pointer"
                                id={message.senderId + ',' + message.senderName + ',' + message.postId + ',' + message.title + ',' + message.recipientId}
                                onClick={handleViewMessageClick}>{'Title: ' + message.title}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )
                  : (
                    <div className='d-flex flex-column align-items-center message-list-box'>
                      <div className='d-flex justify-content-between col-12 mb-2 mt-1'>
                        <div className='pt-3 pb-3 mx-auto'>You have no messages.</div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
        }
      </Spring>
    );
  }
}
