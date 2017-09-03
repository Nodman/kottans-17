import {h, Component} from 'preact'
import {Router, route} from 'preact-router'
import {get} from '../utils/request'
import {parseGHLink} from '../utils/url-util'

import CardsList from './cards-list'
import Header from './header'
import SearchForm from './search-form'
import Dialog from './dialog'

const ErrorDialog = Dialog('error')
const RepoDialog = Dialog('repo')

export default class App extends Component {
  state = {
    busy: false,
    name: '',
    links: {},
    dialog: null
  }

  reposData = []

  handleRouteChange = ({current: {attributes: {matches: {name}}}}) => {
    const _name = name.trim()
    _name && this.fetchRepos(_name)
  }

  /**
   * Fetch user/org page.
   * @param {string} name - user or org name. If emtpty - try fetch next page
   */

  fetchRepos = async(name) => {
    const {links: _links, name: _name} = this.state
    const reposURL = !name && _links.next
      ? _links.next.link
      : `https://api.github.com/users/${name}/repos`
    this.setState({busy: true, name: name || _name, error: null})
    try {
      const {body, headers: {Link}} = await get(reposURL)
      const links = Link ? parseGHLink(Link) : {}
      this.reposData = name ? body : [...this.reposData, ...body]
      this.setState({busy: false, links})
    } catch (error) {
      this.setState({busy: false, error})
    }
  }

  formHandler = value => {
    const {busy, name, error} = this.state
    if (busy || value === name && error) {
      return
    }
    route(`/${value}`)
  }

  openRepoDialog = repoURL => this.setState({dialog: {repoURL}})
  closeRepoDialog = () => this.setState({dialog: null})
  closeErrorDialog = () => this.setState({error: null})

  render() {
    const {busy, name, links, dialog, error} = this.state
    return (
      <div id="app">
        <Header busy={busy}/>
        {error && <ErrorDialog handleClose={this.closeErrorDialog}/>}
        {dialog && <RepoDialog handleClose={this.closeRepoDialog}/>}
        <SearchForm
          formHandler={this.formHandler}
          busy={busy}
          name={name}/>
        <Router onChange={this.handleRouteChange}>
          <CardsList
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
