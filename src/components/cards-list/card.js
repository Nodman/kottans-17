import {h} from 'preact'
import style from './style'
import {parseDate} from '../../utils/date'
import PropTypes from 'proptypes'
import classnames from 'classnames'
import {floorStars} from '../../utils/number'

const Card = ({fork, name, description, stargazers_count, url, language, updated_at}) => (
  <div className={style.card}>
    <div className={style.heading}>
      <h3>{name}</h3>
      <h5>{`${fork ? '[FORK]' : ''}`}</h5>
    </div>
    <div className={style.description}>
      {description}
    </div>
    <div className={style.infoWrapper}>
      <span className={classnames(style.item, style.langIcon)}>{language}</span>
      {stargazers_count
        ? <span className={classnames(style.item, style.starIcon)}>
            {floorStars(stargazers_count)}
          </span>
        : null
      }
      <span className={classnames(style.item, style.updateIcon)}>
        updated {parseDate(updated_at)}
      </span>
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
