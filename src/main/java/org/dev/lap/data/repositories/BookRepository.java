package org.dev.lap.data.repositories;

import org.dev.lap.data.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
}
