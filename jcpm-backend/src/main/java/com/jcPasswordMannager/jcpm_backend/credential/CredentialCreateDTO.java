package com.jcPasswordMannager.jcpm_backend.credential;

import java.util.Optional;
import java.util.Set;

public record CredentialCreateDTO(Optional<Integer> credentialId, String title, String email, String password, String website, Integer user) {}
