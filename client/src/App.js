import React, { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts.js';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        console.log(response);
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="posts-list">
        {this.state.posts.map(post => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    );
  }
}



