package com.jcPasswordMannager.jcpm_backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    public UserService(UserDTOMapper userDTOMapper) {
        this.userDTOMapper = userDTOMapper;
    }


    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public UserModel createUser(String username, String email, String password) {
        return null;
    }
}
