package com.jcPasswordMannager.jcpm_backend.credential;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CredentialController {

    @Autowired
    CredentialService credentialService;

    @GetMapping("/credentials")
    public List<CredentialModel>getCredential(){
        return credentialService.getCredentials();
    }
    @PostMapping("/create/credential")
    public CredentialModel createCredential(@RequestBody CredentialCreateDTO createDTO){
        return credentialService.createCredential(createDTO);
    }
}
