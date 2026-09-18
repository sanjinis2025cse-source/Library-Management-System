package com.example.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.author;
import com.example.repository.authorrepository;

@Service
public class authorservice {

    private final authorrepository repository;

    public authorservice(authorrepository repository) {
        this.repository = repository;
    }

    // GET all authors
    public List<author> getAllAuthors() {
        return repository.findAll();
    }

    // GET author by ID
    public author getAuthorById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));
    }

    // POST
    public author addAuthor(author author) {
        return repository.save(author);
    }

    // PUT
    public author updateAuthor(Long id, author updatedAuthor) {

        author existingAuthor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));

        existingAuthor.setName(updatedAuthor.getName());
        existingAuthor.setCountry(updatedAuthor.getCountry());

        return repository.save(existingAuthor);
    }

    // DELETE
    public void deleteAuthor(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Author not found");
        }

        repository.deleteById(id);
    }
}