import React from 'react';

const Posts = (props) => {
    const { title, contents } = props.post;

    return (
        <div className="post">
        <ul>
            <h1>{title}</h1>
            <h3>{contents}</h3> 
        </ul>
            
        </div>
    )
}

export default Posts;