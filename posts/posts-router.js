const express = require('express');

const Posts = require('../data/db.js'); 

const router = express.Router();

// POST // make a new post
router.post('/', (request, response) => {
    const { title, contents } = request.body; 

    if (!title || !contents) {
        response.status(400)
            .json({ errorMessage: "Please provide title and contents for the post." }) 
    } else {
        Posts.insert(request.body)
            .then(post => {
            console.log(post);
            response.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            response.status(500)
                .json({ error: "There was an error while saving the post to the database" })
        });
    }
});

//  POST // make a new comment to an id
router.post('/:id/comments', (req, res) => {
    const { text } = req.body
    const post_id = req.params.id

    Posts.findById(req.params.id)
        .then(post => {
            if (!post[0]) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
    if (!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Posts.insertComment({ text, post_id })
            .then(data => {
                console.log(data.id)
                res.status(201).json(data)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ errorMessage: 'Error 500: This is a server side error. If this error persists contact your server admin. '
                })
            })
    }
})


// GET // posts
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
  });

// GET // posts by id
router.get('/:id', (request, response) => {
    const id = request.params.id;

    Posts.findById(id)
      .then(user => {
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(() => {
        response.status(500).json({ error: "The post information could not be retrieved." });
      });
  });

// GET // comments for a post by id
router.get('/:id/comments', (request, response) => {
    const id = request.params.id

    Posts.findCommentById(request.params.id)
      .then(post => {
        if (post) {
          response.status(200).json(post);
        } else {
          response.status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(() => {
        response.status(500).json({ error: "The comments information could not be retrieved" });
      });
    
})

// DELETE //  post by id
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    Posts.remove(id)
        .then(deleted => {
            if (deleted) {
                response.status(200).json(deleted);
            } else {
                response.status(404).json({ message: "The post with the specified ID does not exist."  })
            }
        })
        .catch(error => {
            console.log(error);
            // handle the error
            response.status(500).json({
                errorMessage: "The post could not be removed",
            });
        });
});


// PUT // edit a post
router.put('/:id', (request, response) => {
    const id = request.params.id;
    const { title, contents } = request.body;

    if (!title || !contents) {
        response.status(400)
            .json({ errorMessage: "Please provide title and contents for the post." }) 
    }
    Posts.update(id, {title, contents})
      .then(post => {
        if (post) {
          response.status(200).json(post);
        } else {
          response.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
      })
    .catch(error => {
        console.log(error);
        //handle the error
        response.status(500).json({ error: "The post information could not be modified." })
    })

})

module.exports = router;

