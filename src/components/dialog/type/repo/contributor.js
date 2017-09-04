import {h} from 'preact'
import style from '../../style'
import PropTypes from 'proptypes'


const Contributor = ({avatar_url, contributions, html_url, login}) => (
  <div className={style.user}>
    <a href={html_url} target="_blank">
      <img src={avatar_url}/>
    </a>
    <h5>{login}</h5>
    <h5>{`${contributions} contributions`}</h5>
  </div>
)

export default Contributor
