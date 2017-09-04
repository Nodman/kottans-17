import {h} from 'preact'
import style from '../../style'
import PropTypes from 'proptypes'
import {calcLanguages} from '../../../../utils/number'
import Lang from './lang-item'
import Pr from './pr-item'
import Contributor from './contributor'
const RepoContent = ({name, repoURL, parentURL, langData, pullsData, contribData}) => {
  const langsArray = calcLanguages(langData)
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h3>{name}</h3>
        <a target="_blank" href={repoURL}>
          Repo url:
          <h5>{repoURL}</h5>
        </a>
        {parentURL &&
          <a target="_blank" href={parentURL}>
            Forked from:
            <h5>{parentURL}</h5>
          </a>
        }
      </div>
      <div className={style.languages}>
        {langsArray.map(language => <Lang key={language.name} {...language}/>)}
      </div>
      {pullsData.length
        ? <div className={style.pulls}>
          <h3>Most commented PRs</h3>
          {pullsData.map(pr => <Pr key={pr.number} {...pr}/>)}
        </div>
        : null
      }
      <h3>Most active contributors</h3>
      <div className={style.contributors}>
        {contribData.map(user => <Contributor key={user.id} {...user}/>)}
      </div>
      <div className="contributors"></div>
      <div className="pulls"></div>
    </div>
  )
}

export default RepoContent
