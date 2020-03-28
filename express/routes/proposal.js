const router = require('express').Router();
var Proposal = require('../models/proposal.model');
var Letter = require('../models/letter.model');

// Get all proposals
router.route('/').get((req, res) => {
    Proposal.find()
        .then(proposals => res.json(proposals))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a proposal
router.route('/:id').delete((req, res) => {
    Proposal.findByIdAndDelete(req.params.id)
        .then(() => res.json("Proposal deleted."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a proposal
router.route('/').post((req, res) => {
    
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
