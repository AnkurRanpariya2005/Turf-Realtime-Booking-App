package com.BoxCricket.BoxCricket.repository;

import com.BoxCricket.BoxCricket.dto.Role;
import com.BoxCricket.BoxCricket.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByRole(Role role);



}
