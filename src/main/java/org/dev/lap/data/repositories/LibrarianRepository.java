package org.dev.lap.data.repositories;

import org.dev.lap.data.models.Librarian;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LibrarianRepository extends MongoRepository<Librarian, String> {
    Optional<Librarian> findByEmailAddress(String emailAddress);

    Optional<Librarian> findByPhoneNumber(Long phoneNumber);
}
