package com.jcPasswordMannager.jcpm_backend.group;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMapper groupMapper;

    public List<GroupModel> getCredentials() {
        return groupRepository.findAll();
    }
    public GroupModel getCredentialById(Integer id) {
        return groupRepository.findById(id).orElseThrow(null);
    }

    public GroupModel createGroup(GroupCreateDTO createDTO) {
      var group=groupMapper.fromCreateToCredential(createDTO);
      return groupRepository.save(group);
    }
}
