package com.jcPasswordMannager.jcpm_backend.auth;

import com.jcPasswordMannager.jcpm_backend.jwt.JwtService;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    //private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest) {
        return null;
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        UserModel user = UserModel.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();
        userRepository.save(user);
        return  AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
