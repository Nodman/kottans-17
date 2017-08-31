import {h, Component} from 'preact'
import {Router} from 'preact-router'
import Header from '../header'
import Home from '../../routes/home'
import SearchForm from '../search-form'
import style from './style.scss'
import request from '../../utils/request'
// import Profile from '../routes/profile'
// import Home from 'async!./home'
// import Profile from 'async!./profile'

export default class App extends Component {
  state = {
    busy: false
  }

  fetchRepos = name => request.get(`https://api.github.com/users/${name}/repos`)
    .then(response => {
      console.log(response)
    })

  formHandler = value => {
    if (this.state.busy) {
      return
    }
    this.setState({busy: true})
    this.fetchRepos(value).then(() => this.setState({busy: false}))
  }

  render() {
    const {busy} = this.state
    return (
      <div id="app">
        <Header busy={busy}/>
        <SearchForm formHandler={this.formHandler} busy={busy}/>
        <div className={style.contentWrapper}>
          <Router>
            <Home path="/"/>
          </Router>
        </div>
      </div>
    )
  }
}
