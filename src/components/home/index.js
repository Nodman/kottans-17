import {h, Component} from 'preact'
import style from './style.scss'
import CardsList from '../cards-list'

export default class Home extends Component {
  render(props) {
    return (
      <div className={style.contentWrapper}>
        <div className={style.settingsPanel}/>
        <CardsList {...props}/>
      </div>
    )
  }
}
