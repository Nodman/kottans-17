import {h, Component} from 'preact'
import {Router, route} from 'preact-router'
import {get} from '../utils/request'
import {parseGHLink, parseQuery} from '../utils/url-util'

import CardsList from './cards-list'
import Header from './header'
import SearchForm from './search-form'
import Dialog from './dialog'
import Filters from './filters'

const ErrorDialog = Dialog('error')
const RepoDialog = Dialog('repo')

const filtersActions = {
  has_topics: value => repo => value ? repo.topics.length : true,
  has_open_issues: value => repo => value ? repo.open_issues_count > 0 : true,
  starred_gt: value => repo => repo.stargazers_count >= value,
  updated_at: value => repo => Date.parse(repo.updated_at) > Date.parse(value),
  language: value => repo => value === 'all' ? true : repo.language === value,
  type: value => repo => {
    switch (value) {
      case 'fork':
        return repo.fork
      case 'source':
        return !repo.fork
      default:
        return true
    }
  }
}

const yeap = () => () => true

export default class App extends Component {
  state = {
    busy: false,
    filters: false,
    name: '',
    links: {}
  }

  reposData = []
  filteredReposData = []

  handleRouteChange = ({current: {attributes: {matches: {name}}}}) => {
    const _name = name.trim()
    const query = parseQuery(location.search)
    const toggleFilter = () => {
      if (Object.keys(query).some(key => filtersActions[key])) {
        this.applyFilters(query)
      } else {
        this.setState({filters: false})
      }
    }

    if (_name && _name !== this.state.name) {
      this.fetchRepos(_name).then(toggleFilter)
    } else {
      toggleFilter()
    }
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
      const {body, headers = {}} = await get(reposURL)
      const {Link} = headers
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

  applyFilters = query => {
    this.setState({busy: true})
    const actions = Object.keys(query).map(key => (filtersActions[key] || yeap)(query[key]))
    window.actions = actions
    this.filteredReposData = this.reposData.filter(repo => actions.every(action => action ? action(repo) : true))
    this.setState({busy: false, filters: true})
  }

  openRepoDialog = repo => this.setState({dialog: {repo}})
  openErrorDialog = error => this.setState({dialog: null, error})
  closeRepoDialog = () => this.setState({dialog: null})
  closeErrorDialog = () => this.setState({error: null})

  getLanguages = reposData =>
    reposData.reduce((acc, {language}) => acc.includes(language) ? acc : [...acc, language], [])

  render() {
    const {busy, name, links, dialog, error, filters} = this.state
    const reposData = filters ? this.filteredReposData : this.reposData
    const languages = this.getLanguages(this.reposData)
    return (
      <div id="app">
        <Header busy={busy}/>
        {error &&
          <ErrorDialog handleClose={this.closeErrorDialog}/>}
        {dialog &&
          <RepoDialog
            openErrorDialog={this.openErrorDialog}
            handleClose={this.closeRepoDialog}
            repo={dialog.repo}/>}
        <SearchForm
          formHandler={this.formHandler}
          busy={busy}
          name={name}/>
        <div id="contentWrapper">
          <Filters languages={languages}/>
          <Router onChange={this.handleRouteChange}>
            <CardsList
              path="/:name?"
              links={links}
              error={error}
              openErrorDialog={this.openErrorDialog}
              openRepoDialog={this.openRepoDialog}
              fetchRepos={this.fetchRepos}
              busy={busy}
              reposData={reposData}/>
          </Router>
        </div>
      </div>
    )
  }
}
