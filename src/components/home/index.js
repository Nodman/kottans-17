import {h, Component} from 'preact'
import {route} from 'preact-router'
import SearchForm from '../search-form'
import PropTypes from 'proptypes'
import style from './style.scss'

export default class Home extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    name: PropTypes.string,
    fetchRepos: PropTypes.func
  }

  formHandler = name => {
    if (this.props.busy) {
      return
    }
    route(`/${name}`)
  }

  render({busy, name}) {
    return (
      <div>
        <SearchForm
          formHandler={this.formHandler}
          busy={busy}
          name={name}/>
        <div className={style.contentWrapper}>
        </div>
      </div>
    )
  }
}
