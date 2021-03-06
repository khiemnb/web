const express = require('express');
const Router = express.Router();
const fileController = require('../Controller/fileController');
const questionController = require('../Controller/questionController');

Router.get('/yes/:id',async (req, res) => {
    let id = req.params.id;
    const QuestionUpdated = await questionController.updateAnswer(true, id)
   res.redirect('/question/info/' + id);
});

Router.get('/no/:id',async (req, res) => {
    let id = req.params.id;
    const QuestionUpdated = await questionController.updateAnswer(false, id)
        res.redirect('/question/info/' + id);
});


Router.get('/:id', (req, res) => {
    let id = req.params.id;
    questionController.getQuestionByID(id, (err, doc) => {
        if (err) console.log(err);
        else {
            res.render('question', {
                do: 'active',
                question: doc.questionContent,
                id: doc.id
            });
        }

    });

})
Router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    questionController.getQuestionByID(id, (err, doc) => {
        if(err) console.log(err);
        else{
            if(doc.yes == 0 && doc.no ==0){
                res.render('home', {
                    question: doc.questionContent,
                    totalVote:0,
                    percentYes: 50,
                    percentNo: 50
                });
            }
            else{
                res.render('home', {
                    question: doc.questionContent,
                    totalVote: doc.yes + doc.no,
                    percentYes: ((doc.yes * 100) / (doc.yes + doc.no)).toFixed(2),
                    percentNo: ((doc.no * 100) / (doc.yes + doc.no)).toFixed(2)
                });
            }
            
        }
        
    });
})

module.exports = Router;