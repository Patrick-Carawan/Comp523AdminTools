const router = require('express').Router();
const auth = require('./auth');
var Proposal = require('../models/proposal.model');
var Letter = require('../models/letter.model');

// Get all proposals
router.get('/', auth.required, (req, res, next) => {
    Proposal.find()
        .then(proposals => res.json(proposals))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a proposal
router.delete('/:id', auth.required, (req, res, next) => {
    Proposal.findByIdAndDelete(req.params.id)
        .then(() => res.json("Proposal deleted."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a proposal
router.post('/', auth.required, (req, res, next) => {
    const _title = req.body.title;
    const _email = req.body.email;
    const _prop_name = req.body.prop_name;
    const _semester = req.body.semester;
    const _description = req.body.description;
    const _info_url = req.body.info_url;
    const _tech_requirements = req.body.tech_requirements;
    const _hardware_requirements = req.body.hardware_requirements;

    const proposal = new Proposal({
        title: _title,
        email: _email,
        prop_name: _prop_name,
        semester: _semester,
        description: _description,
        info_url:  _info_url,
        tech_requirements: _tech_requirements,
        hardware_requirements: _hardware_requirements,
    });

    proposal.save()
        .then(() => res.json("Proposal added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all proposal emails and their status
router.get('/emails', auth.required, (req, res, next) => {
    Proposal.find({}, "email status")
        .then(emails => res.json(emails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a letter
router.post('/addLetter', auth.required, (req, res, next) => {
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
router.get('/pendingLetter', auth.required, (req, res, next) => {
    Letter.find({status: 'Pending'})
        .then(pending => res.json(pending))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update pending letter
router.post('/pendingLetter', auth.required, (req, res, next) => {
    Letter.findOne({status: 'Pending'})
        .then(letter => {
            letter.text = req.body.text;
            letter.save()
                .then(() => res.json("Pending letter updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get rejection letter
router.get('/rejectionLetter', auth.required, (req, res, next) => {
    Letter.find({status: 'Rejected'})
        .then(rejection => res.json(rejection))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update rejection letter
router.post('/rejectionLetter', auth.required, (req, res, next) => {
    Letter.findOne({status: 'Rejected'})
        .then(letter => {
            letter.text = req.body.text;
            letter.save()
                .then(() => res.json("Rejection letter updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get acceptance letter
router.get('/acceptanceLetter', auth.required, (req, res, next) => {
    Letter.find({status: 'Accepted'})
        .then(acceptance => res.json(acceptance))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update acceptance letter
router.post('/acceptanceLetter', auth.required, (req, res, next) => {
    Letter.findOne({status: 'Accepted'})
        .then(letter => {
            letter.text = req.body.text;
            letter.save()
                .then(() => res.json("Accepted letter updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Only updates status of proposal, can be changed to update other elements
router.post('/update/:id', auth.required, (req, res, next) => {
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
