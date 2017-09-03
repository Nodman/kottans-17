import {h, Component} from 'preact'
import style from './style'
import PropTypes from 'proptypes'
import Card from './card'


class CardsList extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    links: PropTypes.object,
    reposData: PropTypes.array,
    fetchRepos: PropTypes.func,
    name: PropTypes.string
  }

  handleScroll = ({target: {scrollTop, scrollHeight, offsetHeight}}) => {
    const {links, busy, fetchRepos} = this.props
    if (!links.next || busy) {
      return
    }
    const scrollValue = scrollTop + offsetHeight
    const scrollDelta = scrollHeight - scrollValue
    scrollDelta < 400 && fetchRepos()
  }

  componentDidMount() {
    this.scrollAreaNode.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.scrollAreaNode.removeEventListener('scroll', this.handleScroll)
  }


  render({reposData, busy, name}) {
    return (
      <div className={style.contentWrapper}>
        <div className={style.settingsPanel}/>
        <div className={style.scrollArea} ref={ref => (this.scrollAreaNode = ref)}>
          {name && !busy && !reposData.length
            ? <div className={style.loader}>Nothing found</div>
            : reposData.map(repo => <Card key={repo.id} {...repo}/>)}
          {busy && <div className={style.loader}>Fetching page...</div>}
        </div>
      </div>
    )
  }

}

export default CardsList
