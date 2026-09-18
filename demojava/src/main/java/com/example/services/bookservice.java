package com.example.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.book;
import com.example.repository.Bookrepository;

@Service
public class bookservice {

    private final Bookrepository repository;

    public bookservice(Bookrepository repository) {
        this.repository = repository;
    }

    public List<book> getAllBooks() {
        return repository.findAll();
    }

    public book getBookById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public book addBook(book book) {
        return repository.save(book);
    }

    public book updateBook(Long id, book updatedBook) {

        book existingBook = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        existingBook.setBookName(updatedBook.getBookName());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setAuthor(updatedBook.getAuthor());

        return repository.save(existingBook);
    }

    public void deleteBook(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }

        repository.deleteById(id);
    }
}