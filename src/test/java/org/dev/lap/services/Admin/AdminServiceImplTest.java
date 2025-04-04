package org.dev.lap.services.Admin;

import org.dev.lap.data.models.Admin;
import org.dev.lap.data.repositories.AdminRepository;
import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.dev.lap.dtos.response.AdminLoginResponse;
import org.dev.lap.dtos.response.AdminRegisterResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Transactional
class AdminServiceImplTest {
    @Autowired
    private MongoTemplate mongoTemplate;


        @Autowired
        private AdminService adminService;

        @Autowired
        private AdminRepository adminRepository;

    @BeforeEach
    public void setUp() {
        // Clean up the admin collection before each test
        mongoTemplate.dropCollection(Admin.class);
    }

    @AfterEach
    public void tearDown() {
        // Clean up the admin collection after each test
        mongoTemplate.dropCollection(Admin.class);
    }

//    @Test
//    public void testAdminRegistration() {
//        // 1. Arrange (Set up the test data)
//        AdminRegisterRequest adminRegisterRequest = new AdminRegisterRequest();
//        adminRegisterRequest.setFirstName("Test");
//        adminRegisterRequest.setLastName("Admin");
//        adminRegisterRequest.setEmailAddress("testadmin@example.com");
//
//        // 2. Act (Perform the action to be tested)
//        AdminRegisterResponse response = adminService.registerAdmin(adminRegisterRequest);
//
//        // 3. Assert (Verify the results)
//        assertNotNull(response);
////        assertNotNull(response.getAdminId());
//
//        // Verify that the admin was saved correctly in the database
//        Admin savedAdmin = mongoTemplate.findById(response.getAdminId(), Admin.class);
//        assertNotNull(savedAdmin);
//        assertEquals(adminRegisterRequest.getFirstName(), savedAdmin.getFirstName());
//        assertEquals(adminRegisterRequest.getLastName(), savedAdmin.getLastName());
//        assertEquals(adminRegisterRequest.getEmailAddress(), savedAdmin.getEmailAddress());
//    }

    }