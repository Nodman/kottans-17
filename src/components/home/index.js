import {h, Component} from 'preact'
import PropTypes from 'proptypes'
import style from './style.scss'
import CardsList from '../cards-list'

export default class Home extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    name: PropTypes.string,
    fetchRepos: PropTypes.func
  }


  render({busy, name, reposData}) {
    return (
      <div className={style.contentWrapper}>
        <CardsList reposData={reposData}/>
      </div>
    )
  }
}
