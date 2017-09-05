import {h, Component} from 'preact'
import {Router, route} from 'preact-router'
import {get} from '../utils/request'
import {parseGHLink, parseQuery} from '../utils/url-util'

import CardsList from './cards-list'
import Header from './header'
import SearchForm from './search-form'
import Dialog from './dialog'
import FilterSort from './filter-sort'

import {yeap, filtersActions, applySort, getLanguages} from '../utils/helpers'

const ErrorDialog = Dialog('error')
const RepoDialog = Dialog('repo')


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

    const togleSort = () => {
      if (Object.keys(query).includes('sort')) {
        this.setState({sort: query.sort, order: query.order})
      } else {
        this.setState({sort: null})
      }
    }

    if (_name && _name !== this.state.name) {
      this.fetchRepos(_name).then(() => {
        toggleFilter()
        togleSort()
      })
    } else {
      toggleFilter()
      togleSort()
    }
  }

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
    route(`${PUBLIC_PATH}/${value}`)
  }

  applyFilters = query => {
    const actions = Object.keys(query).map(key => (filtersActions[key] || yeap)(query[key]))
    window.actions = actions
    this.filteredReposData = this.reposData.filter(repo => actions.every(action => action ? action(repo) : true))
    this.setState({filters: true})
  }

  openRepoDialog = repo => this.setState({dialog: {repo}})

  openErrorDialog = error => this.setState({dialog: null, error})

  closeRepoDialog = () => this.setState({dialog: null})

  closeErrorDialog = () => this.setState({error: null})

  render() {
    const {busy, name, links, dialog, error, filters} = this.state
    const reposData = applySort(filters ? this.filteredReposData : this.reposData, this.state)
    const languages = getLanguages(this.reposData)
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
          <FilterSort languages={languages}/>
          <Router onChange={this.handleRouteChange}>
            <CardsList
              path={`${PUBLIC_PATH}/:name?`}
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
