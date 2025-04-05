package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.group.GroupCreateDTO;
import com.jcPasswordMannager.jcpm_backend.group.GroupModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<List<CredentialModel>> getCredentialsByUser(Integer userId) {
        try{
            return new ResponseEntity<>(credentialRepository.findByUser(userRepository.findById(userId).get()),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CredentialModel> createCredential(CredentialCreateDTO createDTO) {
        try{
            var credential = credentialMapper.fromCreateToCredential(createDTO);
            return new ResponseEntity<>(credentialRepository.save(credential), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CredentialModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CredentialModel> updateCredential(Integer credentialId, CredentialCreateDTO createDTO) {
        try{
            if(credentialId==createDTO.credentialId().get()){
                var credential=credentialMapper.fromCreateToCredential(createDTO);
                return new ResponseEntity<>( credentialRepository.save(credential),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new CredentialModel(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CredentialModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteCredential(Integer credentialId) {
        try{
            credentialRepository.deleteById(credentialId);
            return new ResponseEntity<String>("deleted succesfully",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Error deleting Credential",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
