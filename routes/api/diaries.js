const express = require('express');
const router = express.Router();

const Diary = require('../../model/Diary');

router.get('/', (req, res) => {
    Diary.find()
        .sort({ date: -1 })
        .then(diaries => res.json(diaries))
});

router.get('/:id', (req, res) => {
    Diary.find({userId: req.params.id})
        .sort({ date: -1 })
        .then(diaries => res.json(diaries))
});

router.put('/:id', (req, res) => {
    Diary.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(diary => res.json(diary));
})

router.post('/', (req, res) => {
    const newDiary = Diary({
        userId: req.body.userId,
        author: req.body.author,
        sentiment: req.body.sentiment,
        text: req.body.text
    });

    newDiary.save().then(diary => res.json(diary));
});

router.delete('/:id', (req, res) => {
    Diary.findById(req.params.id)
        .then(diary => diary.remove()
            .then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: err }));
});


module.exports = router;