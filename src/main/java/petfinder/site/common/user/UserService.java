package petfinder.site.common.user;

import java.time.Duration;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alloy.util.AlloyAuthentication;
import alloy.util.Wait;
import alloy.util._Lists;
import alloy.util._Maps;
import petfinder.site.common.pet.PetDto;
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
		return new UserDto(request.getPrincipal(), request.getRoles(),request.getAttributes(), request.getAddress(), request.getPets());
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String firstName;
		private String lastName;
		private String phone;
		private String street;
		private String city;
		private String state;
		private String zip;
		private String petSitter;
		private String petOwner;
		private List<Long> pets;

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

			return theAttributes;
		}

		public Map<String, Object> getAddress() {
			Map<String, Object> myAddress = new HashMap<>();
			myAddress.put("street", this.street);
			myAddress.put("city", this.city);
			myAddress.put("state", this.state);
			myAddress.put("zip", this.zip);

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

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
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

		public List<Long> getPets() {
			return pets;
		}

		public void setPets(List<Long> pets) {
			this.pets = pets;
		}
	}

	public UserDto register(RegistrationRequest request) {
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(constructUser(request), this.passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public List<PetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}
}