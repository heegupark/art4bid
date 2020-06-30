import React from 'react';
import Profile from './profile';
import LoginPage from './login-page';
import SearchPage from './search-page';
import Message from './message';
import NavBar from './navbar';
import CreatePost from './create-post';
import SpecificPost from './specific-post';
import ViewWatchlist from './user-can-view-watchlist';
const UserContext = React.createContext('userInfo');
export { UserContext };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loggedIn: false,
      userInfo: {},
      view: 'search',
      postInfo: null,
      previousView: 'search'
    };
    this.setView = this.setView.bind(this);
    this.login = this.login.bind(this);
    this.getPostInfo = this.getPostInfo.bind(this);
  }

  setView(currentView) {
    if (currentView === 'post') {
      this.setState({ view: this.state.previousView });
    }
    this.setState({ view: currentView, previousView: this.state.view });
  }

  getPostInfo(postId) {
    this.setState({ postInfo: postId });
  }

  componentDidMount() {}

  login(user) {
    fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName: user })
    })
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line no-console
        console.log(data, 'data');
        this.setState(() => {
          return { userInfo: data.userInfo, loggedIn: true };
        });
      });
  }

  render() {
    const { login, setView, getPostInfo } = this;
    let pageBody;
    if (this.state.loggedIn === false) {
      return <LoginPage userInfo={login} />;
    } else if (this.state.view === 'search') {
      pageBody = <SearchPage setView={setView} getPostInfo={getPostInfo} />;
    } else if (this.state.view === 'profile') {
      pageBody = (
        <Profile
          setView={setView}
          userInfo={this.state.userInfo}
          getPostInfo={getPostInfo}
        />
      );
    } else if (this.state.view === 'message') {
      pageBody = <Message setView={setView} userInfo={this.state.userInfo} />;
    } else if (this.state.view === 'post') {
      pageBody = (
        <SpecificPost
          setView={setView}
          postId={this.state.postInfo}
          userId={this.state.userInfo.userId}
          previousView={this.state.previousView}
        />
      );
    } else if (this.state.view === 'create') {
      pageBody = (
        <CreatePost setView={this.setView} userInfo={this.state.userInfo} />
      );
    } else if (this.state.view === 'watchlist') {
      pageBody = (
        <ViewWatchlist
          getPostInfo={getPostInfo}
          setView={setView}
          userInfo={this.state.userInfo}
          previousView={this.state.previousView}
        />
      );
    }

    return (
      <UserContext.Provider value={this.state.userInfo}>
        <div>
          {pageBody}
          <NavBar view={this.state.view} setView={setView} />
        </div>
      </UserContext.Provider>
    );
  }
}
