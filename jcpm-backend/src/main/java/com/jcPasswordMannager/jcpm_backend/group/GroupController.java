package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class GroupController {

    @Autowired
    GroupService groupService;

    @GetMapping("/groups/{id}")
    public ResponseEntity<GroupModel> getCredentialById(@PathVariable Integer id){
        return groupService.getCredentialById(id);
    }
    @GetMapping("/groups/filter/{userid}")
    public ResponseEntity<List<GroupModel>> getGroupsByUser(@PathVariable("userid") Integer userId){
        return groupService.getGroupsByUser(userId);
    }
    @PostMapping("/create/group")
    public ResponseEntity<GroupModel> createGroup(@RequestBody GroupCreateDTO createDTO){
        return groupService.createGroup(createDTO);
    }
    @PutMapping("/edit/group/{groupid}")
    public ResponseEntity<GroupModel> updateGroup(@PathVariable("groupid")Integer groupId,@RequestBody GroupCreateDTO createDTO){
        return groupService.updateGroup(groupId,createDTO);
    }
    @DeleteMapping("delete/groups/{groupid}")
    public ResponseEntity<String> deleteGroup(@PathVariable("groupid")Integer groupId){
        return groupService.deleteGroup(groupId);
    }
}
