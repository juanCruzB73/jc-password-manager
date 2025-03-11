package com.jcPasswordMannager.jcpm_backend.group;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="groups")
public class GroupModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Integer groupId;

    private String titleGroup;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private UserModel user;

    @ManyToMany(mappedBy = "groups")
    private Set<CredentialModel>credentials= new HashSet<>();



}
