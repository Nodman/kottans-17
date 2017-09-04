import {h} from 'preact'
import style from '../style'
import PropTypes from 'proptypes'


const ErrorDialog = () => (
  <div className={style.error}>
    <div className={style.banner}/>
    <h2>Something went wrong.</h2>
    <h4>Please reload page and try again</h4>
  </div>
)

ErrorDialog.propTypes = {
  busy: PropTypes.bool
}

export default ErrorDialog
