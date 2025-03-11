package com.jcPasswordMannager.jcpm_backend.credential;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CredentialService {

    @Autowired
    CredentialRepository credentialRepository;
    @Autowired
    CredentialMapper credentialMapper;

    public List<CredentialModel> getCredentials() {
        return credentialRepository.findAll();
    }

    public CredentialModel createCredential(CredentialCreateDTO createDTO) {
        var credential = credentialMapper.fromCreateToCredential(createDTO);
        return credentialRepository.save(credential);
    }
}
