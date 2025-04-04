package org.dev.lap.data.repositories;

import org.dev.lap.data.models.BookCopy;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BookCopyRepository extends MongoRepository<BookCopy, String> {
//    Optional<BookCopy> findAvailableCopyByBookId(String bookId);

    List<BookCopy> findAvailableCopiesByBookId(String bookId);
}
