import {h, Component} from 'preact'
import {Router} from 'preact-router'
import Header from './header'
import {get} from '../utils/request'
import Home from './home'
import {parseGHLink} from '../utils/url-util'

export default class App extends Component {
  state = {
    busy: false,
    name: ''
  }

  reposData = []

  handleRouteChange = ({current: {attributes: {matches: {name}}}}) => {
    name.trim() && this.fetchRepos(name)
  }

  fetchRepos = async(name) => {
    const {name: currentName, links: _links} = this.state
    const isSameUser = name === currentName
    const reposURL = _links && _links.next
      ? _links.next.link
      : `https://api.github.com/users/${name}/repos`
    this.setState({busy: true})
    try {
      const {body, headers: {Link}} = await get(reposURL)
      const links = Link ? parseGHLink(Link) : null
      this.reposData = isSameUser ? [...this.reposData, ...body] : body
      this.setState({busy: false, name, links})
    } catch (error) {
      console.info(error)
      this.setState({busy: false, error})
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
