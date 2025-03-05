package com.jcPasswordMannager.jcpm_backend.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class UserDTOMapper implements Function<UserModel,UserDTO> {

    @Override
    public UserDTO apply(UserModel user){
        return new UserDTO(
                user.getUserId(),
                user.getUsername(),
                user.getEmail());
    }
}
