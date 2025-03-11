package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import com.jcPasswordMannager.jcpm_backend.credential.CredentialRepository;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class GroupMapper {

    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    CredentialRepository credentialRepository;

    public GroupModel fromCreateToCredential(GroupCreateDTO createDTO) {
        GroupModel group = createDTO.groupId()
                .map(id -> groupRepository.findById(id).orElseThrow(() -> new RuntimeException("Grupo no encontrado")))
                .orElse(new GroupModel());

        group.setTitleGroup(createDTO.titleGroup());
        group.setUser(userRepository.findById(createDTO.user()).orElseThrow(() -> new RuntimeException("user not found")));

        Set<CredentialModel> credentials = new HashSet<>();
        if ((createDTO.credentials().size() > 0) && createDTO.credentials() != null) {
            for (Integer credentialId : createDTO.credentials()) {
                CredentialModel credential = credentialRepository.findById(credentialId).orElseThrow(() -> new RuntimeException("credential not found"));
                if (credential != null) {
                    credentials.add(credential);
                }
            }
        }

        group.setCredentials(credentials);
        return group;
    }

}
