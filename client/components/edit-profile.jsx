import React from 'react';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: this.props.userInfo.profileImg,
      coverImg: this.props.userInfo.coverImg,
      location: this.props.userInfo.location,
      description: this.props.userInfo.description,
      email: this.props.userInfo.email,
      userId: this.props.userInfo.userId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'zip-input') {
      this.setState({
        location: event.target.value
      });
    }
    if (event.target.id === 'description-input') {
      this.setState({
        description: event.target.value
      });
    }
    if (event.target.id === 'email-input') {
      this.setState({
        email: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const profileDetails = {
      profileImg: this.state.profileImg,
      coverImg: this.state.coverImg,
      description: this.state.description,
      location: this.state.location,
      email: this.state.email,
      userId: this.state.userId
    };
    fetch(`/api/user/${this.state.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileDetails)
    })
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  handleCancel() {
    event.preventDefault();
    this.props.editModeToggle();
  }

  render() {
    const { profileImg, coverImg, description, userName, location, email } = this.state;

    return (
      <div className='d-flex flex-column align-items-center'>
        <div className='d-flex justify-content-between col-12 mb-2 mt-1'>
          <button
            className='btn btn-cancel-header text-center d-flex justify-content-center align-items-center'
            onClick={this.handleCancel}>
            CANCEL
          </button>
          <div className='header-title pt-3 pb-3'>EDIT</div>
          <button
            className='btn btn-submit-header text-center'
            onClick={this.handleSubmit}>
            SAVE
          </button>
        </div>
        <div className='coverPhotoEdit d-flex flex-column align-items-center justify-content-center pt-4 pb-4' style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${coverImg})` }}>
          <button
            className='profileImgEdit btn'
            style={profileImg && { backgroundImage: `url(${profileImg})` } }>
            {!profileImg ? <i className="fas fa-plus fa-3x"></i> : null}
          </button>
          <input
            type="file"
            id="profile-img-upload"
            name="profile-img-upload"
            accept=".png, .jpeg, .gif"
            className="profile-img-upload"
          />
          <h4>{userName}</h4>
        </div>
        <textarea
          name="description-input"
          id="description-input"
          className='description-input mt-2 mb-2 border-0'
          cols="50"
          rows="4"
          placeholder='Enter description here...'
          value={description}
          onChange={this.handleChange}>
        </textarea>
        <div className='location-info d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex flex-end justify-content-center align-items-end col-12'>
            <label htmlFor="zip-input" className='col-5 text-center'>Your Zip-code:</label>
            <input
              name='zip-input'
              id='zip-input'
              type="number"
              value={location}
              className='zip-input mt-3 col-5 border-0'
              onChange={this.handleChange}/>
          </div>
          <div className='d-flex flex-end justify-content-center align-items-end col-12'>
            <label htmlFor="zip-input" className='col-5 text-center'>Location:</label>
            <input
              name='zip-input'
              id='zip-input'
              type="number"
              className='zip-input mt-3 col-5 border-0'
              disabled/>
          </div>
          <div className='d-flex flex-end justify-content-center align-items-end col-12'>
            <label htmlFor="zip-input" className='col-5 text-center'>Email:</label>
            <input
              name='email-input'
              id='email-input'
              type="text"
              value={email}
              onChange={this.handleChange}
              className='email-input mt-3 col-5 border-0'
            />
          </div>
        </div>
      </div>
    );
  }
}
