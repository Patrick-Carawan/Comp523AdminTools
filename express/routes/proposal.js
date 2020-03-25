const router = require('express').Router();
var Proposal = require('../models/proposal.model');
var Letter = require('../models/letter.model');

// Get all proposals
router.route('/').get((req, res) => {
    Proposal.find()
        .then(proposals => res.json(proposals))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all proposal emails
router.route('/emails').get((req, res) => {
    Proposal.find("email")
        .then(emails => res.json(emails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add a letter
router.route("/addLetter").post((req, res) => {
    const text = req.body.text;
    const status = req.body.status;

    const newLetter = new Letter({
        text,
        status
    });

    newLetter.save()
        .then(() => res.json("Letter added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get pending letter
router.route('/pendingLetter').get((req, res) => {
    Letter.find({status: 'pending'})
        .then(pending => res.json(pending))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update pending letter
router.route('/pendingLetter').post((req, res) => {
    Letter.findOne({status: 'pending'})
        .then(letter => {
            letter.text = req.body.text;
            letter.save()
                .then(() => res.json("Pending letter updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

// Get rejection letter
router.route('/rejectionLetter').get((req, res) => {
    Letter.find({status: 'rejection'})
        .then(rejection => res.json(rejection))
        .catch(err => res.status(400).json('Error: ' + err))
});

// Get acceptance letter
router.route('/acceptanceLetter').get((req, res) => {
    Letter.find({status: 'acceptance'})
        .then(acceptance => res.json(acceptance))
        .catch(err => res.status(400).json('Error: ' + err))
});

// Only updates status of proposal, can be changed to update other elements
router.route('update/:id').post((req, res) => {
    Proposal.findById(req.params.id)
        .then(proposal => {
            proposal.status = req.body.status;
            proposal.save()
                .then(() => res.json("Proposal status updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
