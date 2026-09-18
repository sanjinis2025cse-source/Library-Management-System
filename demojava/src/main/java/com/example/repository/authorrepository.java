package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.author;

public interface authorrepository extends JpaRepository<author, Long> {

}