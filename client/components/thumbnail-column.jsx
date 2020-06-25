import React from 'react';

export default class ThumbnailColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postThumbnails: this.props.thumbnails
    };
  }

  componentDidMount() {
    // this.setState({
    //   postThumbnails: this.props.thumbnails
    // });
  }

  render() {
    const { postThumbnails } = this.state;
    const thumbnails = postThumbnails.map(thumbnail => {
      return (
        <img
          key={thumbnail.postId}
          src={thumbnail.imageUrl}
          className="w-100 contain fadeIn"
          onClick={() => this.props.setView('post')}>
        </img>
      );
    });
    return (
      <div className="flex-column thumbnail-column">
        {thumbnails}
      </div>
    );
  }
}
