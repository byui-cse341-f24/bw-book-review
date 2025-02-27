const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     oidcAuth:
 *       type: openIdConnect
 *       openIdConnectUrl: 'https://dev-kuz06fnjpkyzr40v.us.auth0.com'
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - rating
 *         - review
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         rating:
 *           type: number
 *           description: The rating of the book
 *           minimum: 1
 *           maximum: 5
 *         review:
 *           type: string
 *           description: The review of the book
 *       example:
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         rating: 5
 *         review: A classic novel of the Roaring Twenties.
 *         genre: Tragedy
 *         userId: 6725b763c41cb0247ef7068f
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get('/books/:id', bookController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - oidcAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the book
 *               example:
 *                 id: "60d0fe4f5311236168a109ca"
 *       412:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 data:
 *                   type: object
 *                   description: Validation errors
 *       500:
 *         description: Some server error
 */
router.post('/books', requiresAuth(), validation.saveBookReview, bookController.addBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update the book by the id
 *     tags: [Books]
 *     security:
 *       - oidcAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       204:
 *         description: The book was updated successfully
 *       412:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 data:
 *                   type: object
 *                   description: Validation errors
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 */
router.put('/books/:id', requiresAuth(), validation.saveBookReview, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     security:
 *       - oidcAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book Review deleted successfully
 *       404:
 *         description: The book was not found
 */
router.delete('/books/:id', requiresAuth(), bookController.deleteBook);

module.exports = router;