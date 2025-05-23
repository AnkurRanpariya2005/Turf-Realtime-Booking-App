package com.BoxCricket.BoxCricket.service;

import com.BoxCricket.BoxCricket.dto.Role;
import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.BookingRepository;
import com.BoxCricket.BoxCricket.repository.UserRepository;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
import com.BoxCricket.BoxCricket.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

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

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private BookingRepository bookingRepository;   

    

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<ApiResponse<?>> registerUser(User user) throws Exception {
        user.setRole(Role.USER);
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
        User savedUser = userRepository.save(newUser);
        String token = jwtService.generateToken(savedUser.getId(),Role.USER);
        
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

        User savedUser = userRepository.save(newUser);
        String token = jwtService.generateToken(savedUser.getId(),Role.OWNER);

        
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User Registered Succesfully", Map.of("token",token))
            );

    }

    public ResponseEntity<ApiResponse<?>> verify(User user) {
        
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            User authenticatedUser = findByEmail(user.getEmail());
            String token = jwtService.generateToken(authenticatedUser.getId(), authenticatedUser.getRole());;
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
        String id = jwtService.extractUserId(pureToken);

        log.info(token,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        User user;
        try {
            user = findById(Long.valueOf(id));
            return user;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
    }


    public List<User> getAllOwners() {
        Role role = Role.OWNER;
        return userRepository.findByRole(role);
    }

    public List<User> getAllUsers() {
        Role role = Role.USER;
        return userRepository.findByRole(role);
    }
    

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    // Count total users
    public long countUsers() {
        return userRepository.countByRole(Role.USER); 
    }

    // Count total owners
    public long countOwners() {
        return userRepository.countByRole(Role.OWNER); 
    }
 
    public List<VenueDto> getAllVenues(String location) {
        log.info(location+"#######################");
        if (location != null && !location.isEmpty()) {
            return venueRepository.findVenuesByLocationContainingIgnoreCase(location);
        }
        return venueRepository.findAllVenues();
    }

    public Venue getVenueById(Long venueId) {
        return venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    @GetMapping("/my-booking")
    public List<Booking> myBookings(@RequestHeader("Authorization") String token) {
        User user = getUserByToken(token);
        user.setPassword(null);
        return bookingRepository.findByUserId(user.getId());
    }
}
