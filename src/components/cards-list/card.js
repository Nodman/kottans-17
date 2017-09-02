import {h} from 'preact'
import style from './style'
import {parseDate} from '../../utils/date'
import PropTypes from 'proptypes'

const Card = ({fork, name, description, stargazers_count, url, language, updated_at}) => (
  <div className={style.card}>
    <h3>{`${fork ? '[FORK]' : ''} ${name}`}</h3>
    <div>
      <span className="description">{description}</span>
    </div>
    <div className="infoWrapper">
      <span className="language">{language}</span>
      {stargazers_count ? <span className="starsCount">{stargazers_count}</span> : null}
      <span className="update">Last updated {parseDate(updated_at)}</span>
    </div>
  </div>
)

Card.propTypes = {
  name: PropTypes.string.isRequired,
  fork: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired
}

export default Card
