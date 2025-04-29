package com.jcPasswordMannager.jcpm_backend.auth;

import com.jcPasswordMannager.jcpm_backend.jwt.JwtService;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import com.jcPasswordMannager.jcpm_backend.user.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        UserModel user=userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
        String token= jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        UserModel user = UserModel.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();
        userRepository.save(user);
        return  AuthResponse.builder()
                .userId(user.getUserId())
                .token(jwtService.getToken(user))
                .build();
    }

    public Object renewSession(String token) {
        try {
            // Extract user information (id, username, email) from the existing token
            Claims claims = jwtService.getAllClaims(token);
            Long userId = claims.get("userId", Long.class);
            String username = claims.getSubject(); // The subject (username) in the token
            String email = claims.get("email", String.class);

            // Fetch user details from the database (if necessary)
            UserModel user = userRepository.findByUsername(username).orElseThrow(); // Assuming you have a service for this

            // Generate new token
            String newToken = jwtService.getToken(user);
            return  AuthResponse.builder()
                    .userId(user.getUserId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .token(newToken)
                    .build();
        } catch (Exception e) {
            return "Error renewing token: " + e.getMessage(); // Error handling (token invalid, expired, etc.)
        }
    }


}
