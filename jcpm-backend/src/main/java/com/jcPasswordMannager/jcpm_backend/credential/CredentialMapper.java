package com.jcPasswordMannager.jcpm_backend.credential;


import com.jcPasswordMannager.jcpm_backend.group.GroupRepository;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


@Service
public class CredentialMapper {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CredentialRepository credentialRepository;
    private static String AES_SECRET_KEY="586E3272357538782F413F4428472B4B6250655368566B597033733676397924";

    public CredentialModel fromCreateToCredential(CredentialCreateDTO createDTO)throws Exception{

        CredentialModel credential = createDTO.credentialId()
                .map(id -> credentialRepository.findById(id).orElseThrow(() -> new RuntimeException("Grupo no encontrado")))
                .orElse(new CredentialModel());

        UserModel user = userRepository.findById(createDTO.user()).orElseThrow(null);
        credential.setUser(user);

        credential.setTitle(createDTO.title());
        credential.setEmail(createDTO.email());

        String encrypted = encrypt(createDTO.password(),AES_SECRET_KEY);

        credential.setPassword(encrypted);
        credential.setWebsite(createDTO.website());


        return credential;
    }
    public byte[] hexStringToByteArray(String hex){
        int len=hex.length();
        byte [] data = new byte[len/2];
        for(int i=0;i<len;i+=2){
            data[i/2]=(byte)((Character.digit(hex.charAt(i),16)<<4)+Character.digit(hex.charAt(i+1),16));
        }
        return data;
    }
    private String encrypt(String plainText, String haxKey)throws Exception {
        byte[] keyBytes = hexStringToByteArray(haxKey);
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encypted = cipher.doFinal(plainText.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encypted);
    }
}
