package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;

import java.util.Optional;
import java.util.Set;

public record GroupCreateDTO(Optional<Integer>groupId, String titleGroup, Integer user, Set<Integer>credentials) {
}
