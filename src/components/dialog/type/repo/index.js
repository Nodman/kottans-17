import {h, Component} from 'preact'
import style from '../../style'
import PropTypes from 'proptypes'
import {get} from '../../../../utils/request'
import RepoContent from './content'


class RepoDialog extends Component {
  static propTypes = {
    repo: PropTypes.object
  }

  state = {
    busy: true
  }

  fetchRepoData = async(url) => {
    this.setState({busy: true})
    try {
      const {
        body: {
          pulls_url,
          contributors_url,
          languages_url,
          html_url: repoURL,
          fork,
          name,
          parent
        }
      } = await get(url)
      const {body: pullsData} = await get(
        `${pulls_url.replace(/{\/\w+}/, '')}?sort=popularity&direction=desc&per_page=5`)
      const {body: contribData} = await get(`${contributors_url}?per_page=3`)
      const {body: langData} = await get(languages_url)
      const parentURL = fork ? parent.html_url : null
      const result = {pullsData, contribData, langData, parentURL, repoURL, name, fork}
      this.setState({repoData: result, busy: false})
      return result
    } catch (error) {
      this.props.openErrorDialog(error)
      return error
    }
  }

  componentDidMount() {
    this.fetchRepoData(this.props.repo.url)
  }
  render() {
    const {busy, repoData} = this.state
    return (
      <div className={style.repo}>
        {busy ? <div className={style.loader}/> : <RepoContent {...repoData}/>}
      </div>
    )
  }
}


export default RepoDialog
