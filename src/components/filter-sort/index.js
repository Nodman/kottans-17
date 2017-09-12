import {route} from 'preact-router'
import {h, Component} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import {parseQuery, composeQuery} from '../../utils/url-util'

class FilterSort extends Component {
  state = {
    has_open_issues: false,
    has_topics: false,
    starred_gt: 0,
    type: 'all'
  }

  updateQueryRoute = query => route(`${location.pathname}?${query}`.replace(/\?$/, ''))

  applyToRouter = type => {
    const query = parseQuery(location.search)
    query[type] = this.state[type]
    const newQuery = composeQuery(query)
    this.updateQueryRoute(newQuery)
  }

  handleCheckBoxChange = (event, type) => {
    this.setState({[type]: event.target.checked}, () => this.applyToRouter(type))
  }

  handleStarsInputChange = event => this.setState({starred_gt: event.target.value})

  handleStarsInputBlur = () => this.applyToRouter('starred_gt')

  handleChangeDate = event =>
    this.setState({updated_at: event.target.value}, () => this.applyToRouter('updated_at'))

  handleChangeLanguage = event =>
    this.setState({language: event.target.value}, () => this.applyToRouter('language'))

  handleChangeType = event =>
    this.setState({type: event.target.value}, () => this.applyToRouter('type'))

  handleChangeSort = event => this.setState({sort: event.target.value}, () => this.applyToRouter('sort'))

  handleChangeOrder = event => this.setState({order: event.target.value}, () => {
    this.applyToRouter('order')
    !this.state.sort && this.handleChangeSort({target: {value: 'name'}})
  })

  componentDidMount() {
    const query = parseQuery(location.search)
    this.setState(query)
  }


  render({languages}, {has_open_issues, has_topics, starred_gt, updated_at, language, type, sort, order}) {
    return (
      <div className={style.settingsPanel}>
        <div className={style.filtersWrapper}>
          <h3>Filter by:</h3>
          <div className={style.filterItem}>
            <label htmlFor="hasOpenIssues">Has open issues</label>
            <input
              id="hasOpenIssues"
              type="checkbox"
              onChange={event => this.handleCheckBoxChange(event, 'has_open_issues')}
              checked={has_open_issues}/>
          </div>
          <div className={style.filterItem}>
            <label htmlFor="hasTopics">Has topics</label>
            <input
              id="hasTopics"
              type="checkbox"
              onChange={event => this.handleCheckBoxChange(event, 'has_topics')}
              checked={has_topics}/>
          </div>
          <div className={style.filterItem}>
            <label htmlFor="stars">Stars count</label>
            <input
              id="stars"
              type="text"
              className={style.inputItem}
              onChange={this.handleStarsInputChange}
              onBlur={this.handleStarsInputBlur}
              value={starred_gt}/>
          </div>
          <div className={style.filterItem}>
            <label htmlFor="date">Updated after</label>
            <input
              id="date"
              className={style.inputItem}
              value={updated_at}
              onChange={this.handleChangeDate}
              type="date"/>
          </div>
          <div className={style.filterItem}>
            <label htmlFor="language">Language</label>
            <select id="language" className={style.inputItem} onChange={this.handleChangeLanguage}>
              <option value="all" selected>All</option>
              {languages.map(lang => <option selected={language === lang} key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div className={style.filterItemRadio}>
            <label htmlFor="type_all">All</label>
            <input
              type="radio"
              id="type_all"
              name="type"
              value="all"
              onChange={this.handleChangeType}
              checked={type === 'all'}/>
            <label htmlFor="type_fork">Fork</label>
            <input
              type="radio"
              id="type_fork"
              name="type"
              onChange={this.handleChangeType}
              value="fork"
              checked={type === 'fork'}/>
            <label htmlFor="type_source">Source</label>
            <input
              type="radio"
              id="type_source"
              name="type"
              onChange={this.handleChangeType}
              value="source"
              checked={type === 'source'}/>
          </div>
          <h3>Sort:</h3>
          <div className={style.filterItem}>
            <label htmlFor="sort">Criteria</label>
            <select id="sort" className={style.inputItem} onChange={this.handleChangeSort}>
              <option value="name" selected={sort === 'name'}>Name</option>
              <option value="stargazers_count" selected={sort === 'stargazers_count'}>Stars</option>
              <option value="open_issues_count" selected={sort === 'open_issues_count'}>Issues</option>
              <option value="updated_at" selected={sort === 'updated_at'}>Updated</option>
            </select>
          </div>
          <div className={style.filterItem}>
            <label htmlFor="order">Order</label>
            <select id="order" className={style.inputItem} onChange={this.handleChangeOrder}>
              <option value="asc" selected={order === 'asc'}>asc</option>
              <option value="desc" selected={order === 'desc'}>desc</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

FilterSort.propTypes = {
  busy: PropTypes.bool,
  handleClose: PropTypes.func
}


export default FilterSort
