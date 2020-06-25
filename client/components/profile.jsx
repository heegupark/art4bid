import React from 'react';
import EditProfile from './edit-profile';
import UserPosts from './user-posts';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };

    this.editModeToggle = this.editModeToggle.bind(this);
  }

  editModeToggle() {
    if (this.state.editMode) {
      this.setState({
        editMode: false
      });
    } else {
      this.setState({
        editMode: true
      });
    }
  }

  renderProfile() {
    const { profileImg, coverImg, description, userName } = this.props.userInfo;

    return (
      <div className='d-flex flex-column align-items-center'>
        <div className='d-flex justify-content-between col-12 mb-2 mt-1'>
          <button
            className='btn btn-cancel-header text-center d-flex justify-content-center align-items-center'
          >
            CANCEL
          </button>
          <div className='header-title pt-3 pb-3'>PROFILE</div>
          <button
            className='btn btn-submit-header text-center'
            onClick={this.editModeToggle}
          >
            EDIT
          </button>
        </div>
        <div className='coverPhoto d-flex flex-column align-items-center justify-content-center pt-4 col-12' style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${coverImg})` }}>
          <div className='profileImg-container' style={{ backgroundImage: `url(${profileImg})` }}>
          </div>
          <h4 id='profileUserName'>{userName}</h4>
          <p className='profile-description text-center mt-2 mb-2 ml-1 mr-1'>
            {description}
          </p>
        </div>
        <UserPosts/>
      </div>
    );
  }

  renderEditProfile() {
    return (
      <EditProfile editModeToggle={this.editModeToggle} userInfo={this.props.userInfo}/>
    );
  }

  render() {
    if (this.state.editMode === false) {
      return this.renderProfile();
    } else {
      return this.renderEditProfile();
    }
  }
}
