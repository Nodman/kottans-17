import {h} from 'preact'
import style from '../../style'
import PropTypes from 'proptypes'


const Pr = ({title, number, html_url}) => (
  <div className={style.prItem}>
    <a href={html_url} target="_blank">
      {`#${number} ${title}`}
      <h5>{html_url}</h5>
    </a>
  </div>
)

export default Pr
