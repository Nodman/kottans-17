import {h} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import ErrorDialog from './type/error'
import RepoDialog from './type/repo'

const types = {
  error: ErrorDialog,
  repo: RepoDialog
}
const Decorator = Component => {
  const Dialog = ({handleClose, ...props}) => (
    <div className={style.dialogWrapper}>
      <div className={style.dialogBox}>
        <button className={style.closeButton} onClick={handleClose}/>
        <Component {...props}/>
      </div>
    </div>
  )

  Dialog.propTypes = {
    busy: PropTypes.bool,
    handleClose: PropTypes.func
  }

  return Dialog
}


export default (type) => Decorator(types[type])
