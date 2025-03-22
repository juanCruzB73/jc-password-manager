package com.jcPasswordMannager.jcpm_backend.credential;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jcPasswordMannager.jcpm_backend.group.GroupModel;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="credentials")
public class CredentialModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credential_id")
    private Integer credentialId;

    private String title;
    private String email;
    private String password;
    private String website;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private UserModel user;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<GroupModel> groups=new HashSet<>();
}
