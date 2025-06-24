package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.group.GroupCreateDTO;
import com.jcPasswordMannager.jcpm_backend.group.GroupModel;
import com.jcPasswordMannager.jcpm_backend.group.GroupRepository;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.swing.text.html.Option;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CredentialService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CredentialRepository credentialRepository;
    @Autowired
    CredentialMapper credentialMapper;
    @Autowired
    GroupRepository groupRepository;

    private static String AES_SECRET_KEY="586E3272357538782F413F4428472B4B6250655368566B597033733676397924";


    public ResponseEntity<List<CredentialModel>> getCredentialsByUser(Integer userId) {
        try{
            List<CredentialModel>encryptedCredentials=credentialRepository.findByUser(userRepository.findById(userId).get());
            List<CredentialModel> decryptedCredentials=decryptCredentials(encryptedCredentials);
            return new ResponseEntity<>(decryptedCredentials,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<CredentialModel>> getCredentialsByGroup(Integer groupId) {
        try{
            GroupModel groupAux=groupRepository.findAll().stream()
                    .filter(group -> group.getGroupId() == groupId)
                    .findFirst()
                    .orElseThrow(()->new RuntimeException("Group not found"));
            List <CredentialModel>groupAuxToList=new ArrayList<>(groupAux.getCredentials());
            List<CredentialModel> decryptedCredentials=decryptCredentials(groupAuxToList);
            return new ResponseEntity<>(decryptedCredentials,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<CredentialModel> createCredential(CredentialCreateDTO createDTO) {
        try{
            var credential = credentialMapper.fromCreateToCredential(createDTO);
            var credentialToSave=credentialRepository.save(credential);
            var decryptCredential=decryptCredential(credentialToSave);
            return new ResponseEntity<>(decryptCredential, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CredentialModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CredentialModel> updateCredential(Integer credentialId, CredentialCreateDTO createDTO) {
        try{
            if(credentialId==createDTO.credentialId().get()){
                var credential=credentialMapper.fromCreateToCredential(createDTO);
                var credentialToSave=credentialRepository.save(credential);
                var decryptCredential=decryptCredential(credentialToSave);
                return new ResponseEntity<>(decryptCredential,HttpStatus.OK);
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
    public List<CredentialModel> decryptCredentials(List<CredentialModel> credentialsEncrypted) {
        List<CredentialModel> credentialsDecrypted = new ArrayList<>();
        for (CredentialModel credential : credentialsEncrypted) {
            try {
                CredentialModel credentialAux = new CredentialModel();
                credentialAux.setCredentialId(credential.getCredentialId());
                credentialAux.setTitle(credential.getTitle());
                credentialAux.setEmail(credential.getEmail());
                credentialAux.setPassword(decrypt(credential.getPassword(), AES_SECRET_KEY));
                credentialAux.setWebsite(credential.getWebsite());
                credentialAux.setUser(credential.getUser());
                credentialAux.setGroups(credential.getGroups());
                credentialsDecrypted.add(credentialAux);
            } catch (Exception e) {
                System.err.println(" Failed to decrypt credential ID " + credential.getCredentialId());
                e.printStackTrace();
            }
        }
        return credentialsDecrypted;
    }
    public CredentialModel decryptCredential(CredentialModel credentialEncrypted) {
            try {
                CredentialModel credentialDecrypted = new CredentialModel();
                credentialDecrypted.setCredentialId(credentialEncrypted.getCredentialId());
                credentialDecrypted.setTitle(credentialEncrypted.getTitle());
                credentialDecrypted.setEmail(credentialEncrypted.getEmail());
                credentialDecrypted.setPassword(decrypt(credentialEncrypted.getPassword(), AES_SECRET_KEY));
                credentialDecrypted.setWebsite(credentialEncrypted.getWebsite());
                credentialDecrypted.setUser(credentialEncrypted.getUser());
                credentialDecrypted.setGroups(credentialEncrypted.getGroups());
                return credentialDecrypted;
            } catch (Exception e) {
                System.err.println(" Failed to decrypt credential ID " + credentialEncrypted.getCredentialId());
                e.printStackTrace();
            }
        return new CredentialModel();
    }

    public String decrypt(String ciphertext,String hexKey)throws Exception{
        byte[] keyBytes=credentialMapper.hexStringToByteArray(hexKey);
        SecretKeySpec secretkey=new SecretKeySpec(keyBytes,"AES");

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE,secretkey);

        byte[] decreypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        return new String(decreypted,"UTF-8");
    }
}
