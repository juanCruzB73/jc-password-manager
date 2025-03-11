package com.jcPasswordMannager.jcpm_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public List<UserDTO> getUsers(){
        return userService.getUsers();
    }
    @GetMapping("/user/{id}")
    public UserModel getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
    }
    @PostMapping("/createUser")
    public UserModel createUser(String username,String email,String password){
        return userService.createUser(username,email,password);
    }

}
