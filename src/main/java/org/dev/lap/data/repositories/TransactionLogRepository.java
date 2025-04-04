package org.dev.lap.data.repositories;

import org.dev.lap.data.models.TransactionLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionLogRepository extends MongoRepository<TransactionLog, String> {
}
