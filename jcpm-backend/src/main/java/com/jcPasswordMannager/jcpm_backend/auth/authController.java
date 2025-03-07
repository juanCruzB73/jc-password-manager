package com.jcPasswordMannager.jcpm_backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class authController {

    @PostMapping("/login")
    public String login(){
        return "Login end point succesfully reached";
    }

    @PostMapping("/register")
    public String register(){
        return "register end point succesfully reached";
    }

}
