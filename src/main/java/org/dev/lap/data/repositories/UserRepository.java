package org.dev.lap.data.repositories;

import org.dev.lap.data.models.Borrower;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Borrower, String> {
    Optional<Borrower> findByEmailAddress(String emailAddress);
}
