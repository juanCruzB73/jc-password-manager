package com.jcPasswordMannager.jcpm_backend.group;

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
    @PostMapping("/create/group")
    public GroupModel createGroup(@RequestBody GroupCreateDTO createDTO){
        return groupService.createGroup(createDTO);
    }
}
