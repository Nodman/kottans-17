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
    error: PropTypes.object,
    name: PropTypes.string
  }

  handleScroll = ({target: {scrollTop, scrollHeight, offsetHeight}}) => {
    const {links, busy, fetchRepos, error} = this.props
    if (!links.next || busy) {
      return
    }
    const scrollValue = scrollTop + offsetHeight
    const scrollDelta = scrollHeight - scrollValue
    scrollDelta < 400 && !error && fetchRepos()
  }

  componentDidMount() {
    this.scrollAreaNode.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.scrollAreaNode.removeEventListener('scroll', this.handleScroll)
  }


  render({reposData = [], busy, name, openRepoDialog}) {
    return (
      <div className={style.scrollArea} ref={ref => (this.scrollAreaNode = ref)}>
        {name && !busy && !reposData.length
          ? <div className={style.loader}>Nothing found</div>
          : reposData.map(repo => <Card key={repo.id} repo={repo} openRepoDialog={openRepoDialog}/>)}
        {busy && <div className={style.loader}>Fetching page...</div>}
      </div>
    )
  }

}

export default CardsList
