import {h, Component} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import classnames from 'classnames'


class SearchForm extends Component {
  static propTypes = {
    formHandler: PropTypes.func.isRequired,
    name: PropTypes.string
  }

  state = {
    value: '',
    alert: false
  }

  handleFormSubmit = event => {
    const {value} = this.state
    event.preventDefault()
    if (value.trim()) {
      this.props.formHandler(value.trim())
    } else {
      this.setState({alert: true})
    }
  }

  handleInputFocus = () => this.setState({alert: false})

  handleInputChange = ({target: {value}}) => this.setState({value, alert: false})

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.name})
  }

  render({busy}, {alert, value}) {
    return (
      <form className={style.searchForm} onSubmit={this.handleFormSubmit}>
        <label className={classnames({[style.alert]: alert, [style.disabled]: busy})}>
          <i className={style.searchIcon}></i>
          <input
            type="text"
            value={value}
            disabled={busy}
            placeholder="user or organization"
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}/>
        </label>
        <button
          disabled={busy}
          className={classnames({[style.disabled]: busy})}
          type="submit">Search</button>
      </form>
    )
  }

}

export default SearchForm
