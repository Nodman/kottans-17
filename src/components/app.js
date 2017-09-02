import {h, Component} from 'preact'
import {Router, route} from 'preact-router'
import Header from './header'
import {get} from '../utils/request'
import Home from './home'
import SearchForm from './search-form'
import {parseGHLink} from '../utils/url-util'

export default class App extends Component {
  state = {
    busy: false,
    name: '',
    links: {}
  }

  reposData = []

  handleRouteChange = ({current: {attributes: {matches: {name}}}}) => {
    const _name = name.trim()
    _name && this.fetchRepos(_name)
  }

  fetchRepos = async(name) => {
    const {links: _links, name: _name} = this.state
    const reposURL = !name && _links.next
      ? _links.next.link
      : `https://api.github.com/users/${name}/repos`
    this.setState({busy: true, name: name || _name})
    try {
      const {body, headers: {Link}} = await get(reposURL)
      const links = Link ? parseGHLink(Link) : {}
      this.reposData = name ? body : [...this.reposData, ...body]
      this.setState({busy: false, links})
    } catch (error) {
      console.info(error)
      this.setState({busy: false, error})
    }
  }

  formHandler = name => {
    if (this.state.busy || name === this.state.name) {
      return
    }
    route(`/${name}`)
  }

  render() {
    const {busy, name, links} = this.state
    return (
      <div id="app">
        <Header busy={busy}/>
        <SearchForm
          formHandler={this.formHandler}
          busy={busy}
          name={name}/>
        <Router onChange={this.handleRouteChange}>
          <Home
            path="/:name?"
            links={links}
            fetchRepos={this.fetchRepos}
            busy={busy}
            reposData={this.reposData}/>
        </Router>
      </div>
    )
  }
}
