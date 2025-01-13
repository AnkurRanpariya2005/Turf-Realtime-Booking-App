package com.BoxCricket.BoxCricket.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.BoxCricket.BoxCricket.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
