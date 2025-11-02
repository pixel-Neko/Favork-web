const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const FreelancerProfile = require('../models/FreelancerProfile');
const ClientProfile = require('../models/ClientProfile');

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    let profile;
    if (req.user.role === 'freelancer') {
      profile = await FreelancerProfile.findOne({ user: req.user.id }).populate('user', ['email', 'role']);
    } else if (req.user.role === 'client') {
      profile = await ClientProfile.findOne({ user: req.user.id }).populate('user', ['email', 'role']);
    }

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profiles
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio, skills, portfolio_url, phone_number, company_name, industry } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (bio) profileFields.bio = bio;
    if (portfolio_url) profileFields.portfolio_url = portfolio_url;
    if (phone_number) profileFields.phone_number = phone_number;
    if (company_name) profileFields.company_name = company_name;
    if (industry) profileFields.industry = industry;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    try {
      let profile;
      if (req.user.role === 'freelancer') {
        profile = await FreelancerProfile.findOne({ user: req.user.id });

        if (profile) {
          // Update
          profile = await FreelancerProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(profile);
        }

        // Create
        profile = new FreelancerProfile(profileFields);
        await profile.save();
        res.json(profile);
      } else if (req.user.role === 'client') {
        profile = await ClientProfile.findOne({ user: req.user.id });

        if (profile) {
          // Update
          profile = await ClientProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(profile);
        }

        // Create
        profile = new ClientProfile(profileFields);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
