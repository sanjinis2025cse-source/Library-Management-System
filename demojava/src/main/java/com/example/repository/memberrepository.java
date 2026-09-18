package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.member;

public interface memberrepository extends JpaRepository<member, Long> {

}