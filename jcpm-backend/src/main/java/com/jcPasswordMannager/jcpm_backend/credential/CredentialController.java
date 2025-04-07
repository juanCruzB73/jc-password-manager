package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.group.GroupCreateDTO;
import com.jcPasswordMannager.jcpm_backend.group.GroupModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CredentialController {

    @Autowired
    CredentialService credentialService;

    @GetMapping("/credentials/filter/{userid}")
    public ResponseEntity<List<CredentialModel>> getCredentialsByUser(@PathVariable("userid") Integer userId){
        return credentialService.getCredentialsByUser(userId);
    }
    @PostMapping("/create/credential")
    public ResponseEntity<CredentialModel> createCredential(@RequestBody CredentialCreateDTO createDTO){
        return credentialService.createCredential(createDTO);
    }
    @PutMapping("/edit/credential/{credentialid}")
    public ResponseEntity<CredentialModel> updateCredential(@PathVariable("credentialid")Integer credentialId, @RequestBody CredentialCreateDTO createDTO){
        return credentialService.updateCredential(credentialId,createDTO);
    }
    @DeleteMapping("/delete/credential/{credentialid}")
    public ResponseEntity<String> deleteCredential(@PathVariable("credentialid")Integer credentialId){
        return credentialService.deleteCredential(credentialId);
    }
}
