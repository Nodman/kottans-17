import {h} from 'preact'
import style from './style'
import classnames from 'classnames'
import PropTypes from 'proptypes'


const Header = ({busy}) => (
  <header className={classnames(style.header, {[style.loading]: busy})}>
    <h1>GitHub Mini Client</h1>
  </header>
)

Header.propTypes = {
  busy: PropTypes.bool
}

export default Header
