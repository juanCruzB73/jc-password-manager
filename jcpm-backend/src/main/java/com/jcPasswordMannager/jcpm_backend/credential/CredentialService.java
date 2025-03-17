package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CredentialService {

    @Autowired
    UserRepository userRepository;
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

    public List<CredentialModel> getCredentialsByUser(Integer userId) {
        return credentialRepository.findByUser(userRepository.findById(userId).get());
    }
}
