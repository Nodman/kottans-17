import {route} from 'preact-router'
import {h, Component} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import {parseQuery, composeQuery} from '../../utils/url-util'

class Filters extends Component {
  state = {
    has_open_issues: false,
    has_topics: false,
    starred_gt: 0,
    type: 'all'
  }

  updateQueryRoute = query => route(`${location.pathname}?${query}`.replace(/\?$/, ''))

  applyFilterToRouter = type => {
    const query = parseQuery(location.search)
    // console.log(query);
    query[type] = this.state[type]
    // console.log(query);
    const newQuery = composeQuery(query)
    // console.log(newQuery);
    this.updateQueryRoute(newQuery)
  }

  handleCheckBoxChange = (event, type) => {
    this.setState({[type]: event.target.checked}, () => this.applyFilterToRouter(type))
  }

  handleStarsInputChange = event => this.setState({stars: event.target.value})
  handleStarsInputBlur = () => this.applyFilterToRouter('starred_gt')

  handleChangeDate = event =>
    this.setState({updated_at: event.target.value}, () => this.applyFilterToRouter('updated_at'))
  handleChangeLanguage = event =>
    this.setState({language: event.target.value}, () => this.applyFilterToRouter('language'))
  handleChangeType = event =>
    this.setState({type: event.target.value}, () => this.applyFilterToRouter('type'))

  componentDidMount() {
    const query = parseQuery(location.search)
    this.setState(query)
  }


  render({languages}, {has_open_issues, has_topics, starred_gt, date, language, type}) {
    return (
      <div className={style.settingsPanel}>
        <div className={style.filtersWrapper}>
          <div>
            <label htmlFor="hasOpenIssues">Has open issues</label>
            <input
              id="hasOpenIssues"
              type="checkbox"
              onChange={event => this.handleCheckBoxChange(event, 'has_open_issues')}
              checked={has_open_issues}/>
          </div>
          <div>
            <label htmlFor="hasTopics">Has topics</label>
            <input
              id="hasTopics"
              type="checkbox"
              onChange={event => this.handleCheckBoxChange(event, 'has_topics')}
              checked={has_topics}/>
          </div>
          <div>
            <label htmlFor="stars">Has more or equal </label>
            <input
              id="stars"
              type="text"
              onChange={this.handleStarsInputChange}
              onBlur={this.handleStarsInputBlur}
              value={starred_gt}/>
            <label htmlFor="stars">stars</label>
          </div>
          <div>
            <label htmlFor="date">Updated after</label>
            <input
              id="date"
              value={date}
              onChange={this.handleChangeDate}
              type="date"/>
          </div>
          <div>
            <label htmlFor="language">Language</label>
            <select id="language" onChange={this.handleChangeLanguage}>
              <option value={false} selected>all</option>
              {languages.map(lang => <option selected={language === lang} key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
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
            <label htmlFor="type_source">Fork</label>
            <input
              type="radio"
              id="type_source"
              name="type"
              onChange={this.handleChangeType}
              value="source"
              checked={type === 'source'}/>
          </div>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  busy: PropTypes.bool,
  handleClose: PropTypes.func
}


export default Filters
