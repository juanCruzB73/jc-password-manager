package com.jcPasswordMannager.jcpm_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public List<UserDTO> getUsers(){
        return userService.getUsers();
    }
    @PostMapping("/createUser")
    public UserModel createUser(String username,String email,String password){
        return userService.createUser(username,email,password);
    }

}
