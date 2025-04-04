package org.dev.lap.dtos.response;

import lombok.Data;
import org.dev.lap.data.models.Role;

@Data
public class LibrarianRegisterResponse {
  private String message;
  private Object Data;

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  private String role;

  public LibrarianRegisterResponse(String librarianId, String s) {
  }

  public LibrarianRegisterResponse(Role role)  {
    this.role = (role != null) ? role.name() : null;
  }

  public  LibrarianRegisterResponse(){

  }


  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getData() {
    return Data;
  }

  public void setData(Object data) {
    Data = data;
  }
}
