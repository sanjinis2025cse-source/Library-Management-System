package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.book;

public interface Bookrepository extends JpaRepository<book, Long> {

}