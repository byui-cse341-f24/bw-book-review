# Book Review Project

# # Book Review API

This is a RESTful API for managing book reviews. The API allows you to create, read, update, and delete book reviews. It is built using Node.js, Express, and MongoDB, and it uses Mongoose for data modeling.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/book-review.git
    ```

2. Navigate to the project directory:
    ```sh
    cd book-review
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=your-mongodb-connection-string
    PORT=8080
    ```

5. Start the server:
    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the API at `http://localhost:8080`.

## API Endpoints

### Books

- **Get all books**
    ```http
    GET /books
    ```
    Response:
    ```json
    [
      {
        "id": "60d0fe4f5311236168a109ca",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "rating": 5,
        "review": "A classic novel of the Roaring Twenties."
      }
    ]
    ```

- **Get a book by ID**
    ```http
    GET /books/{id}
    ```
    Response:
    ```json
    {
      "id": "60d0fe4f5311236168a109ca",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "rating": 5,
      "review": "A classic novel of the Roaring Twenties."
    }
    ```

- **Create a new book**
    ```http
    POST /books
    ```
    Request Body:
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "rating": 5,
      "review": "A classic novel of the Roaring Twenties."
    }
    ```
    Response:
    ```json
    {
      "id": "60d0fe4f5311236168a109ca"
    }
    ```

- **Update a book by ID**
    ```http
    PUT /books/{id}
    ```
    Request Body:
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "rating": 5,
      "review": "A classic novel of the Roaring Twenties."
    }
    ```
    Response:
    ```json
    {
      "message": "Book Review updated successfully",
      "book": {
        "id": "60d0fe4f5311236168a109ca",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "rating": 5,
        "review": "A classic novel of the Roaring Twenties."
      }
    }
    ```

- **Delete a book by ID**
    ```http
    DELETE /books/{id}
    ```
    Response:
    ```json
    {
      "message": "Book Review deleted successfully"
    }
    ```

## Swagger Documentation

The API is documented using Swagger. You can access the Swagger UI at `http://localhost:8080/api-docs`.

## My Contact
- Name: Bryce Woodland
- woo17047@byui.edu
