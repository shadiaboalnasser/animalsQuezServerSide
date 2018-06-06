const express = require('express');

const router = express.Router();
const Question = require('./models/questionModel');
const Answer = require('./models/answerModel');


const routes = function () {
    router.route('/questions')
        .post((req, res) => {
            const question = new Question(req.body);
            question.save();
            res.status(201).send(question);
        })
        .get((req, res) => {
            Question.find({}, (err, questions) => {
                if (err) res.status(500).send(err);
                res.json(questions);
            });
        });

    router.route('/questions/:questionId')
        .get((req, res) => {
            Question.find({ id: req.params.questionId }, (err, question) => {
                if (err) {
                    res.status(500).send(err);
                } else if (question) {
                    req.question = question;
                } else {
                    res.status(404).send('no question found');
                }
                res.send(req.question);
            });
        })
        .put((req, res) => {
            Question.findOneAndUpdate(
                { id: req.params.questionId },
                req.body,
                { new: true },
                (err, question) => {
                    // Handle any possible database errors
                    if (err) return res.status(500).send(err);
                    return res.send(question);
                }
            );
        })
        .delete((req, res) => {
            // eslint-disable-next-line no-unused-vars
            Question.findOneAndRemove({ id: req.params.questionId }, (err, question) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send('Question successfully deleted');
            });
        });

    router.route('/answers')
        .post((req, res) => {
            const answer = new Answer(req.body);
            answer.save();
            res.status(201).send(answer);
        })
        .get((req, res) => {
            Answer.find({}, (err, answers) => {
                if (err) res.status(500).send(err);
                res.json(answers);
            });
        });

    router.route('/answers/:answerId')
        .get((req, res) => {
            Answer.find({ id: req.params.answerId }, (err, answer) => {
                if (err) res.status(500).send(err);
                res.json(answer);
            });
        })
        .put((req, res) => {
            Answer.findOneAndUpdate(
                { id: req.params.answerId },
                req.body,
                { new: true },
                (err, answer) => {
                    if (err) return res.status(500).send(err);
                    return res.send(answer);
                }
            );
        })
        .delete((req, res) => {
            // eslint-disable-next-line no-unused-vars
            Answer.findOneAndRemove({ id: req.params.answerId }, (err, answer) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send('Answer successfully deleted');
            });
        });

    return router;
};

module.exports = routes();