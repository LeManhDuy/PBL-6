const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Account = require("../model/Account");

// @route POST api/auth/register
// @desc Register user
// @access Private
router.post('/register', async (req, res) => {
    const { account_username, account_password, account_role } = req.body
    //Simple validation
    if (!account_username || !account_password || !account_role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        // check for existing user
        const accountExisted = await Account.findOne({ account_username: account_username })
        if (accountExisted)
            return res.status(400).json({ success: false, message: 'Username is existing' })

        // all good
        const hashPassword = await argon2.hash(account_password)
        const newAccount = new Account({
            account_username: account_username,
            account_password: hashPassword,
            account_role: account_role,
        })
        await newAccount.save()
        const accessToken = jwt.sign({ accountId: newAccount._id }
            , process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create account successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET api/auth/
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { account_username, account_password } = req.body
    //Simple validation
    if (!account_username || !account_password)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })

    try {
        let validatePassword
        const checkAcccountUserName = await Account.findOne({ account_username: account_username })
        let accessToken
        if (checkAcccountUserName) {
            accessToken = jwt.sign({ accountId: checkAcccountUserName._id }
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(checkAcccountUserName.account_password, account_password)
            if (!validatePassword)
                return res.status(400).json({ success: false, message: 'Incorrect email or password' })
            return res.status(200).json({
                success: true,
                AccountUserName: checkAcccountUserName.account_username,
                AccountRole: checkAcccountUserName.account_role,
                accessToken
            })
        }
        else
            return res.status(400).json({ success: false, message: 'Incorrect email or password' })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router