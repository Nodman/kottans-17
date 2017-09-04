import {h} from 'preact'
import style from '../../style'
import PropTypes from 'proptypes'


const Lang = ({name, size, percentage}) => (
  <div className={style.langItem}>
    <h4>{name}</h4>
    <h6>{size}</h6>
    <h6>{`${percentage}%`}</h6>
  </div>
)

export default Lang
