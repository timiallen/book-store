# REST API for a bookstore

### To list books collection

```
GET /books
```

Response list of books:

```javascript
[{
  "id": "...",
  "title": "...",
  "authors": [ "..." ],
  "descriptions": [ "..." ],
  ...
}, ...]
```

### To get books

```
GET /books
```

Response 0 or more books:

```javascript
{
} // books objects
```

### To get a book by Id:

```
GET /books/:bookId
```

Response 1 book or 404 if not found:

```javascript
{
  "id": "...",
  "title": "...",
  "authors": [ "..." ],
  ...
}
```

# to order book

```
POST /order
```

# to get books ordered

```
GET /order:id
```

# Install

```
npm install
```

# Run

```
npm run server
```
