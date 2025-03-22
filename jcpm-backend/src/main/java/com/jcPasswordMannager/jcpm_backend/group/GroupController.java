package com.jcPasswordMannager.jcpm_backend.group;

import com.jcPasswordMannager.jcpm_backend.credential.CredentialModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class GroupController {

    @Autowired
    GroupService groupService;


    @GetMapping("/groups")
    public List<GroupModel>getGroups(){
        return groupService.getCredentials();
    }
    @GetMapping("/groups/{id}")
    public GroupModel getCredentialById(@RequestBody Integer id){
        return groupService.getCredentialById(id);
    }
    @GetMapping("/groups/filter/{userid}")
    public List<GroupModel>getGroupsByUser(@PathVariable("userid") Integer userId){
        return groupService.getGroupsByUser(userId);
    }
    @PostMapping("/create/group")
    public GroupModel createGroup(@RequestBody GroupCreateDTO createDTO){
        return groupService.createGroup(createDTO);
    }
    @PutMapping("/edit/group/{groupid}")
    public GroupModel updateGroup(@PathVariable("groupid")Integer groupId,@RequestBody GroupCreateDTO createDTO){
        return groupService.updateGroup(groupId,createDTO);
    }
    @DeleteMapping("delete/groups/{groupid}")
    public String deleteGroup(@PathVariable("groupid")Integer groupId){
        return groupService.deleteGroup(groupId);
    }
}
