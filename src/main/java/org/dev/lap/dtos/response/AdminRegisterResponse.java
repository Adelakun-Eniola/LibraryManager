package org.dev.lap.dtos.response;

import lombok.Data;
import org.dev.lap.data.models.Admin;
import org.dev.lap.data.models.Role;

@Data
public class AdminRegisterResponse {

    private String adminId;
    private Object data;
    private String message;

    public AdminRegisterResponse() {

    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private String role;

    public AdminRegisterResponse(String emailAddress, String adminRegisteredSuccessfully) {

    }

    public AdminRegisterResponse(String adminId, Object data, String message, Role role) {
        this.adminId = adminId;
        this.data = data;
        this.message = message;
        this.role = (role != null) ? role.name() : null;
    }

    public AdminRegisterResponse(String adminId, Admin admin, String successfullyCreated) {

    }


    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }
}
