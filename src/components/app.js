import {h, Component} from 'preact'
import {Router} from 'preact-router'
import Header from './header'
import request from '../utils/request'
import Home from './home'
// import Profile from '../routes/profile'
// import Home from 'async!./home'
// import Profile from 'async!./profile'

export default class App extends Component {
  state = {
    busy: false,
    currentPage: 0,
    pagesTotal: 0,
    name: ''
  }

  reposData = []

  handleRouteChange = ({current: {attributes: {matches: {name}}}}) => {
    name.trim() && this.fetchRepos(name)
  }

  fetchRepos = async(name) => {
    this.setState({busy: true})
    const {name: currentName, currentPage} = this.state
    try {
      const {body, headers} = await request.get(`https://api.github.com/users/${name}/repos`)
      console.log(headers)
      this.reposData = name === currentName ? [...this.reposData, ...body] : body
      this.setState({busy: false, currentPage: currentPage + 1, name})
      return body
    } catch (error) {
      this.setState({busy: false, error})
      return error
    }
  }

  render() {
    const {busy} = this.state
    return (
      <div id="app">
        <Header busy={busy}/>
        <Router onChange={this.handleRouteChange}>
          <Home
            path="/:name?"
            fetchRepos={this.fetchRepos}
            busy={busy}
            reposData={this.reposData}/>
        </Router>
      </div>
    )
  }
}
