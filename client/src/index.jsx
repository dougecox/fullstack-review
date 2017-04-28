import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  componentWillMount() {
    $.get('/repos', (data) => {
      console.log(data);
      this.setState({
        repos: data
      });
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    
  $.post('/repos/import', {term : term},
    () => { console.log('success'); } );
   }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
    
  