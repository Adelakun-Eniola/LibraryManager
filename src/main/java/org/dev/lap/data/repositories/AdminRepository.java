package org.dev.lap.data.repositories;

import org.dev.lap.data.models.Admin;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
public interface AdminRepository extends MongoRepository<Admin, String>{
    Optional<Admin> findAdminByEmailAddress(String emailAddress);


}
