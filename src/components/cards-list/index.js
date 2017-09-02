import {h, Component} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import classnames from 'classnames'
import Card from './card'


class CardsList extends Component {
  static propTypes = {
  }

  render({reposData}) {
    return (
      <div>
        {reposData.map(repo => <Card key={repo.id} {...repo}/>)}
      </div>
    )
  }

}

export default CardsList
