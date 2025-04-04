package org.dev.lap.mapper.admin;

import org.dev.lap.data.models.Admin;
import org.dev.lap.dtos.request.AdminLoginRequest;
import org.dev.lap.dtos.response.AdminLoginResponse;

public class AdminLoginMapper {
    public static Admin mapToAdmin(AdminLoginRequest request) {
        Admin admin = new Admin();
        admin.setLastName(request.getLastName());
        admin.setEmailAddress(request.getEmailAddress());
        return admin;
    }


        public static AdminLoginResponse mapToLoginResponse(boolean isSuccess, String message) {
            AdminLoginResponse response = new AdminLoginResponse();
            response.setSuccess(isSuccess);
            response.setMessage(message);
            return response;
        }


}
