package com.BoxCricket.BoxCricket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BoxCricket.BoxCricket.entity.Plans;

@Repository
public interface PlansRepository extends JpaRepository<Plans, Long> {

}
