package com.BoxCricket.BoxCricket.service;

import com.BoxCricket.BoxCricket.dto.Role;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.repository.UserRepository;
import com.BoxCricket.BoxCricket.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

     @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<ApiResponse<?>> registerUser(User user) throws Exception {

        User oldUser = userRepository.findByEmail(user.getEmail());

        if(oldUser != null){
            return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(false, "Email already exists.", null)
            );
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPhone(user.getPhone());
        newUser.setRole(Role.USER);
        newUser.setPassword(encoder.encode(user.getPassword()));


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        String token = jwtService.generateToken(user.getEmail(),Role.USER);

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User Registered Succesfully", Map.of("token",token))
            );

    }

    public ResponseEntity<ApiResponse<?>> registerOwner(User user) throws Exception {

        User oldUser = userRepository.findByEmail(user.getEmail());

        if(oldUser != null){
            return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(false, "Email already exists.", null)
            );
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPhone(user.getPhone());
        newUser.setRole(Role.OWNER);
        newUser.setPassword(encoder.encode(user.getPassword()));


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        String token = jwtService.generateToken(user.getEmail(),Role.OWNER);

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User Registered Succesfully", Map.of("token",token))
            );

    }

    public ResponseEntity<ApiResponse<?>> verify(User user) {
        
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            User authenticatedUser = findByEmail(user.getEmail());
            String token = jwtService.generateToken(user.getEmail(), authenticatedUser.getRole());;
            return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Login Successfully", Map.of("token", token))
                );
            
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(false, "Wrong Credentials", null)
                );
        }
    }



    public User findById(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new Exception("User not found of "+ id);
    }

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
        
    }


    public User updateUser(User user, Long id) throws Exception {
        Optional<User> user1 = userRepository.findById(id);

        if(user1.isEmpty()){
            throw new Exception("User not exist of "+ id);
        }

        User oldUser = user1.get();

        if(user.getName() != null){
            oldUser.setName(user.getName());
        }
        if(user.getPhone() != null){
            oldUser.setPhone(user.getPhone());
        }
        if(user.getEmail() != null){
            oldUser.setEmail(user.getEmail());
        }

        User updatedUser = userRepository.save(oldUser);

        return updatedUser;
    }

    public void deleteUser(Long id) throws Exception {
        Optional<User> user1 = userRepository.findById(id);

        if(user1.isEmpty()){
            throw new Exception("User not exist of "+ id);
        }

        userRepository.deleteById(id);
        
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User getUserByToken(String token) {

        String pureToken = token.substring(7);
        String email = jwtService.extractUserName(pureToken);

        log.info(token,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        User user = findByEmail(email);
        return user;
    }


}
