const fs = require('fs');
const express = require('express');

const books = JSON.parse(
	fs.readFileSync(`${__dirname}/../data/books/books.json`, 'utf-8')
);

exports.getAllBooks = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			books: books,
		},
	});
};

exports.createBook = (req, res) => {
	const id = books.length;
	const newBook = {
		id: id,
		...req.body,
	};
	books.push(newBook);
	fs.writeFile(
		`${__dirname}/../data/books/books.json`,
		JSON.stringify(books),
		() => console.log('file written')
	);

	res.status(200).json({
		status: 'success',
		data: {
			book: newBook,
		},
	});
};

exports.getBookById = (req, res) => {
	const book = books.find(b => b.id === req.params.id * 1);
	if (book) {
		res.status(200).json({
			status: 'success',
			data: {
				book: book,
			},
		});
	} else {
		res.status(404).json({
			status: 'fail',
			error: 'The requested resource could not be found',
		});
	}
};

exports.deleteBook = (req, res) => {
	const book = books.find(b => b.id === req.params.id * 1);
	if (book) {
		books.splice(book.id, 1);
		fs.writeFile(
			`${__dirname}/../data/books/books.json`,
			JSON.stringify(books),
			() => console.log('file written')
		);

		res.status(200).json({
			status: 'success',
			data: {
				book: book,
			},
		});
	} else {
		res.status(404).json({
			status: 'fail',
			error: 'The requested resource could not be found',
		});
	}
};

exports.updateBook = (req, res) => {
  let book = books.find(b => b.id === req.params.id * 1);
	if (book) {
    for(let prop in req.body){
      book[prop] = req.body[prop];
    }
    
    fs.writeFile(
      `${__dirname}/../data/books/books.json`,
      JSON.stringify(books),
      () => console.log('file written')
    );
    
    res.status(200).json({
			status: 'success',
			data: {
				book: book,
			},
		});
	} else {
		res.status(404).json({
			status: 'fail',
			error: 'The requested resource could not be found',
		});
	}
};
