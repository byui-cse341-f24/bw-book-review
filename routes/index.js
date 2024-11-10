const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
const bookRoutes = require('../routes/bookRoute');
const userRoutes = require('../routes/userRoute');

dotenv.config();

// Auth0 configuration
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Use Auth0 authentication middleware
router.use(auth(config));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns the authentication status
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged in
 *       401:
 *         description: User is not authenticated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out
 */
// Example route to check authentication status
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/logout', (req, res) => {
    res.oidc.logout({
        returnTo: process.env.BASE_URL
    });
});

// Use book routes
router.use('/', bookRoutes);

// Use user routes
router.use('/', userRoutes);

module.exports = router;