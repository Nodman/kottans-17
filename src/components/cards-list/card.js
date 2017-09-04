import {h} from 'preact'
import style from './style'
import {parseDate} from '../../utils/date'
import PropTypes from 'proptypes'
import classnames from 'classnames'
import {floorStars} from '../../utils/number'

const Card = ({repo, openRepoDialog}) => {
  const {fork, name, description, stargazers_count, language, updated_at} = repo
  return (
    <div className={style.card}>
      <div className={style.heading}>
        <h3 onClick={() => openRepoDialog(repo)}>{name}</h3>
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
}

Card.propTypes = {
  repo: PropTypes.object,
  openRepoDialog: PropTypes.func
}

export default Card
