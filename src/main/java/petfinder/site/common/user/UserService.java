package petfinder.site.common.user;

import java.io.IOException;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.posting.PostingDto;
import petfinder.site.common.user.UserDto.UserType;

/**
 * Services are Spring concepts for classes which manage the application's buisness logic.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	public UserDto constructUser(RegistrationRequest request) {
		return new UserDto(request.getPrincipal(), request.getRoles(),request.getAttributes(), request.getAddress(), request.getPets(), request.getPosts(),request.getRatings());
	}

	public UserDto update(UserDto user) {
		try {
			userDao.update(user);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return user;
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String firstName;
		private String lastName;
		private String phone;
		private String street;
		private String city;
		private String zip;
		private String state;
		private String petSitter;
		private String petOwner;
		private String email;
		private List<String> pets;
		private List<String> posts;
		private List<Double> ratings;

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Map<String, Object> getAttributes() {
			Map<String, Object> theAttributes = new HashMap<>();
			theAttributes.put("firstName", this.firstName);
			theAttributes.put("lastName", this.lastName);
			theAttributes.put("phone", this.phone);
			if(this.email != null) {
				if(this.email.equals("true"))
					theAttributes.put("email", "true");
			}
			else {
				theAttributes.put("email", "false");
			}

			return theAttributes;
		}

		public Map<String, Object> getAddress() {
			Map<String, Object> myAddress = new HashMap<>();
			myAddress.put("street", this.street);
			myAddress.put("city", this.city);
			myAddress.put("zip", this.zip);
			myAddress.put("state", this.state);

			return myAddress;
		}

		public List<String> getRoles() {
			List<String> myRoles = new ArrayList<>();

			if(this.petOwner != null) {
                if (this.petOwner.equals("true")) {
                    myRoles.add(UserType.OWNER.toString());
                }
            }

            if(this.petSitter != null) {
                if (this.petSitter.equals("true")) {
                    myRoles.add(UserType.SITTER.toString());
                }
            }

			if (myRoles.isEmpty()){
			    myRoles.add("None");
			}

			return myRoles;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public String getStreet() {
			return street;
		}

		public void setStreet(String street) {
			this.street = street;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getZip() {
			return zip;
		}

		public void setZip(String zip) {
			this.zip = zip;
		}

		public String getPetSitter() {
			return petSitter;
		}

		public void setPetSitter(String petSitter) {
			this.petSitter = petSitter;
		}

		public String getPetOwner() {
			return petOwner;
		}

		public void setPetOwner(String petOwner) {
			this.petOwner = petOwner;
		}

		public List<String> getPets() {
			return pets;
		}

		public void setPets(List<String> pets) {
			this.pets = pets;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public List<String> getPosts() {
			return posts;
		}

		public void setPosts(List<String> posts) {
			this.posts = posts;
		}

		public List<Double> getRatings() {
			if(this.ratings == null) {
				this.ratings = new ArrayList<Double>();
				this.ratings.add(3.0);
				return this.ratings;
			}
			else{
				return this.ratings;
			}
		}

		public void setRatings(List<Double> ratings) {
			this.ratings = ratings;
		}

		public void setEmail(String email) {
			this.email = email;
		}
		public String getEmail() {
			return email;
		}
	}

	public UserDto register(RegistrationRequest request) {
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(constructUser(request), this.passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	public void delete(Optional<UserDto> user) {
		user.ifPresent(userDto -> userDao.delete(userDto.getPrincipal()));
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public List<Optional<PetDto>> findPets(UserDto user) {
		return userDao.findPets(user);
	}

	public List<Optional<PostingDto>> findPosts(UserDto user) {
		return userDao.findPostings(user);
	}
}