package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.group.GroupModel;
import com.jcPasswordMannager.jcpm_backend.group.GroupRepository;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CredentialMapper {

    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    CredentialRepository credentialRepository;

    public CredentialModel fromCreateToCredential(CredentialCreateDTO createDTO){

        CredentialModel credential = createDTO.credentialId()
                .map(id -> credentialRepository.findById(id).orElseThrow(() -> new RuntimeException("Grupo no encontrado")))
                .orElse(new CredentialModel());

        UserModel user = userRepository.findById(createDTO.user()).orElseThrow(null);
        credential.setUser(user);

        credential.setTitle(createDTO.title());
        credential.setEmail(createDTO.email());
        credential.setPassword(createDTO.password());
        credential.setWebsite(createDTO.website());


        return credential;
    }

}
