package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.model.author;
import com.example.model.book;
import com.example.services.authorservice;
import com.example.services.bookservice;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/library")
public class BookWebController {

    private final bookservice bookService;
    private final authorservice authorService;

    public BookWebController(
            bookservice bookService,
            authorservice authorService) {

        this.bookService = bookService;
        this.authorService = authorService;
    }


    // =========================
    // SHOW ALL BOOKS
    // =========================

    @GetMapping
    public String showBooks(Model model) {

        model.addAttribute(
                "books",
                bookService.getAllBooks()
        );

        return "books";
    }


    // =========================
    // SHOW ADD BOOK FORM
    // =========================

    @GetMapping("/new")
    public String showAddBookForm(Model model) {

        model.addAttribute(
                "book",
                new book()
        );

        model.addAttribute(
                "authors",
                authorService.getAllAuthors()
        );

        return "add-book";
    }


    // =========================
    // SAVE BOOK
    // =========================

    @PostMapping("/save")
    public String saveBook(
            @Valid @ModelAttribute("book") book book,
            BindingResult result,
            @RequestParam Long authorId,
            Model model) {

        if (result.hasErrors()) {

            model.addAttribute(
                    "authors",
                    authorService.getAllAuthors()
            );

            return "add-book";
        }

        author author =
                authorService.getAuthorById(authorId);

        book.setAuthor(author);

        bookService.addBook(book);

        return "redirect:/library";
    }


    // =========================
    // SHOW EDIT FORM
    // =========================

    @GetMapping("/edit/{id}")
    public String showEditForm(
            @PathVariable Long id,
            Model model) {

        book book =
                bookService.getBookById(id);

        model.addAttribute(
                "book",
                book
        );

        model.addAttribute(
                "authors",
                authorService.getAllAuthors()
        );

        return "edit-book";
    }


    // =========================
    // UPDATE BOOK
    // =========================

    @PostMapping("/update/{id}")
    public String updateBook(
            @PathVariable Long id,
            @Valid @ModelAttribute("book") book book,
            BindingResult result,
            @RequestParam Long authorId,
            Model model) {

        if (result.hasErrors()) {

            model.addAttribute(
                    "authors",
                    authorService.getAllAuthors()
            );

            return "edit-book";
        }

        author author =
                authorService.getAuthorById(authorId);

        book.setAuthor(author);

        bookService.updateBook(id, book);

        return "redirect:/library";
    }


    // =========================
    // DELETE BOOK
    // =========================

    @GetMapping("/delete/{id}")
    public String deleteBook(
            @PathVariable Long id) {

        bookService.deleteBook(id);

        return "redirect:/library";
    }
}