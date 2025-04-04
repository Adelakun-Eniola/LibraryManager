package org.dev.lap.mapper.admin;

import org.dev.lap.data.models.Admin;
import org.dev.lap.data.models.Role;
import org.dev.lap.dtos.request.AdminRegisterRequest;
import org.dev.lap.dtos.response.AdminRegisterResponse;

public class AdminMapper {

    public static Admin mapToAdmin(AdminRegisterRequest request) {
        Admin admin = new Admin();
        admin.setFirstName(request.getFirstName());
        admin.setLastName(request.getLastName());
        admin.setEmailAddress(request.getEmailAddress());
        admin.setRole(Role.ADMIN);
        return admin;
    }

    public static AdminRegisterResponse mapToAdminResponse(Admin admin) {
        AdminRegisterResponse response = new AdminRegisterResponse();
        response.setAdminId(admin.getAdminId());
        response.setData("Admin " + admin.getFirstName() + " " + admin.getLastName() + " registered successfully.");
        response.setMessage("Successfully Created");
        response.setRole(admin.getRole().name());
        return response;
    }
}
