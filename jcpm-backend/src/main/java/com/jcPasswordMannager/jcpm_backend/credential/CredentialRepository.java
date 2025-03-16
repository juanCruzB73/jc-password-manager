package com.jcPasswordMannager.jcpm_backend.credential;

import com.jcPasswordMannager.jcpm_backend.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CredentialRepository extends JpaRepository<CredentialModel, Integer> {
    List<CredentialModel> findByUser(UserModel user);
}
