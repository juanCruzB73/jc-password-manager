package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMapper groupMapper;
    @Autowired
    UserRepository userRepository;

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

    public List<GroupModel> getGroupsByUser(Integer userId) {
        return groupRepository.findByUser(userRepository.findById(userId).get());
    }

    public GroupModel updateGroup(Integer groupId, GroupCreateDTO createDTO) {
        if(groupId==createDTO.groupId().get()){
            var group=groupMapper.fromCreateToCredential(createDTO);
            return groupRepository.save(group);
        }else {
            throw new RuntimeException("the id are not valid");
        }
    }

    public String deleteGroup(Integer groupId) {
        groupRepository.deleteById(groupId);
        return "delete succesfull";
    }
}
