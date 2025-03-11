package com.jcPasswordMannager.jcpm_backend.credential;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialRepository extends JpaRepository<CredentialModel,Integer> {

}
