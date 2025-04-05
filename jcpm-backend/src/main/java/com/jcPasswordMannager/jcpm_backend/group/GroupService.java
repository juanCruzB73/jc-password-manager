package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import com.jcPasswordMannager.jcpm_backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    GroupMapper groupMapper;
    @Autowired
    UserRepository userRepository;


    public ResponseEntity<GroupModel> getCredentialById(Integer id) {
        try{
            GroupModel group =groupRepository.findById(id).orElseThrow(null);
            return new ResponseEntity<>(group,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new GroupModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<List<GroupModel>> getGroupsByUser(Integer userId) {

        try{
            List<GroupModel>groups=groupRepository.findByUser(userRepository.findById(userId).get());
            return new ResponseEntity<>(groups, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<GroupModel> createGroup(GroupCreateDTO createDTO) {

        try{
            var group=groupMapper.fromCreateToCredential(createDTO);
            GroupModel groupToSave=groupRepository.save(group);
            return new ResponseEntity<>(groupToSave,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new GroupModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<GroupModel> updateGroup(Integer groupId, GroupCreateDTO createDTO) {
        try{
            if(groupId==createDTO.groupId().get()){
                var group=groupMapper.fromCreateToCredential(createDTO);
                GroupModel groupToUpdate = groupRepository.save(group);
                return new ResponseEntity<>(groupToUpdate,HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new GroupModel(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new GroupModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteGroup(Integer groupId) {
        try{
            groupRepository.deleteById(groupId);
            return new ResponseEntity<String>("delete succesfull",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Error deleting ",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
