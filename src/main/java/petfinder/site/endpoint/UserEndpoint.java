package petfinder.site.endpoint;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.posting.PostingDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserPublicDto;
import petfinder.site.common.user.UserService;
import petfinder.site.common.user.UserService.RegistrationRequest;

import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;

/**
 * This is a controller endpoint which is intended to manage users and their association with pets. Because the class
 * is annotated with @RestController Spring will automatically take care of the creation of this class... we will never do
 * something like <code>UserEndpoint endpoint = new UserEndpoint()</code> in our code because this would break the Sping lifecycle.
 *
 * @RestController is like @Service, but implies a few additional attributes - it wires up with controller with Spring MVC so that
 * the @GetMapping and @PostMapping annotations work properly. If you had just used @Service here, those annotations would not have
 * any effect and our controller would not work like we anticipate. Additionally, @RestController differs from @Controller in that it
 * expects to receive and return JSON payloads at each of the endpoints. If we had just used @Controller here we would have to annotate our
 * function parameters and return types with @RequestBody and @ResponseBody respectively. @RestController annotation, then, is simply a convenience
 * which makes these additional annotations unnecessary.
 *
 * The typical Spring architecture is for Controllers to call down into Services, which then call into other Services or Daos. We'll talk more about
 * Services and Daos in other classes.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	/**
	 * @Autowired directs spring to set this field when creating the singleton instance of UserEndpoint. If you are familiar with Java but not Spring,
	 * you may wonder how this field is non-null because it doesn't get set equal to anything in the codebase. When Spring creates the singleton instance of
	 * UserEndpoint it looks in the Spring context for a singleton instance of UserService because of this @Autowired annotation and then sets that field appropriately.
	 * The UserService instances are created by the @Service annotation. Look inside of UserService for more information on how this works.
	 *
	 * The autowiring happens by type. If there are multiple of that type in the Spring context (this would be multiple instances of UserService in this case) then
	 * the application will fail to start - Spring will report that it cannot find a unique bean of type UserService. If you need to solve this, you can annotate one of those
	 * services with @Primary or you can @Autowire a list of elements.
	 */
	@Autowired
	private UserService userService;

	/**
	 * This @GetMapping annotation binds the below function to a GET HTTP request. Whenever the /api/user url is hit, the below function will be invoked. This is because
	 * the method level @GetMapping annotation inherits a root path from the class level @ReuestMapping annotation on UserEndpoint. The return type of UserDto will be
	 * serialized to a JSON representation via Jackson, a Java JSON marshalling library that Spring uses under the covers. You can hit this endpoint yourself in Postman, but
	 * will need to pass an authentication header as well. You can see how this is done by the application by opening up the network tab in the browser when you log in.
	 *
	 * Note: If you're wondering about what Optional is here, this is a Java utility for null saftey in that it forces the programmer to check the nullability of a value before
	 * accessing that value itself in an attempt to prevent occurence of NullPointerExceptions. In this case, it is possible that the user we want to get the details of does not exist.
	 * In this case, we would return Optional.empty() to signify that it is a null result. If you want to read more about Optional, see: https://www.baeldung.com/java-optional
	 */
	@GetMapping(value = "", produces = "application/json")
	public Optional<UserDto> getUserDetails() {
		// This line gets the "principal" of the currently logged in user - Spring sets this value for us based on the authentication header that is passed with the request
		// In this case "principal" refers to the email address of the user
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();

		// Then, we simply look up that user by their email address in Elasticsearch
		return userService.findUserByPrincipal(principal);
	}

	/**
	 * The @PostMapping annotation is very similar to the @GetMapping annotation except that it expects HTTP POST requests instead of GET request. Because of this, a post can
	 * accept a payload of data in its post body. You can almost think of a GET call as a function which takes no parameters, while a POST call is a function that takes a paramter
	 * via the POST body. In this case, the body of the request is JSON that is serialized via Jackson into a RegistrationRequest Java object. The application calls this when you
	 * register as a new user.
	 *
	 * In this function, we take a RegistrationRequest which includes a username, password, and map of additional attributes and we persist a new user in ElasticSearch. Then, we
	 * return that new user back to the frontend as a JSON payload - represented by the UserDto class here as the return type.
	 */
	@PostMapping(value = "/register")
	public UserDto register(@RequestBody RegistrationRequest request) {
		return userService.register(request);
	}

	/**
	 * This endpoint gets a list of pets associated with the current user. In this example we associate users and pets via a seperate index represented by the UserPetDto class.
	 * While this is one way to model this association, it is not the only way - pets could be included directly on the user object, for example. However, we have chosen to use a
	 * "mapping index" as an example of how to associate two indexes and relate them togther. UserPetDto is a document which simply references the corresponding user id and pet id and associates them together.
	 *
	 * You can find the meat of this method in UserDao.findPets(...) - its here we call out to Elasticsearch and manually join the various indexes together.
	 */
	@GetMapping(value = "/pet")
	public List<Optional<PetDto>> getPets() {
		return getUserDetails().map(userDto -> userService.findPets(userDto)).orElse(null);
	}

	@PostMapping(value = "/update")
	public UserDto update(@RequestBody RegistrationRequest request) {
		UserDto myUser = userService.constructUser(request);
		return userService.update(myUser);
	}

	@PostMapping(value = "/delete")
	public void delete() {
		userService.delete(getUserDetails());
	}

	@PostMapping(value = "/pet/{id}")
	public UserDto addPet(@PathVariable("id") String id) {
		return getUserDetails().map(userDto -> {
			userDto.addPet(id);
			return userService.update(userDto);
		}).orElse(null);
	}

	@PostMapping(value = "/rating/{userName:.+}/{num}")
	public UserDto addRating(@PathVariable("userName") String user, @PathVariable("num") String num) {
		Optional<UserDto> optUser = userService.findUserByPrincipal(user);
		if (optUser.isPresent()) {
			UserDto pubUser = optUser.get();
			pubUser.addRating(Double.parseDouble(num));
			return userService.update(pubUser);
		}
		return null;
	}

	@PostMapping(value = "/pet/delete/{id}")
	public UserDto deletePet(@PathVariable("id") String id) {
		return getUserDetails().map(userDto -> {
			userDto.deletePet(id);
			return userService.update(userDto);
		}).orElse(null);
	}

	@GetMapping(value = "/posts")
	public List<Optional<PostingDto>> getPosts() {
		return getUserDetails().map(userDto -> userService.findPosts(userDto)).orElse(null);
	}

	@PostMapping(value = "/posts/{id}")
	public UserDto addPost(@PathVariable("id") String id) {
		return getUserDetails().map(userDto -> {
			userDto.addPost(id);
			return userService.update(userDto);
		}).orElse(null);
	}

	@PostMapping(value = "/posts/delete/{id}")
	public UserDto deletePost(@PathVariable("id") String id) {
		return getUserDetails().map(userDto -> {
			userDto.deletePost(id);
			return userService.update(userDto);
		}).orElse(null);
	}

	@GetMapping(value = "/public/{userName:.+}", produces = "application/json")
	public UserPublicDto getUserr(@PathVariable String userName) {
		String user = URLDecoder.decode(userName);
		Optional<UserDto> optUser = userService.findUserByPrincipal(user);
		if (optUser.isPresent()) {
			UserDto pubUser = optUser.get();
			System.out.println(pubUser.getPrincipal());
			System.out.println(pubUser.getRoles());
			System.out.println(pubUser.getPets());
			System.out.println(pubUser.getAddress());
			System.out.println(pubUser.getRatings());
			return new UserPublicDto(pubUser);
		} else {
			return null;
		}
	}

	@PostMapping(value = "/sendEmailRegister")
	public void sendEmailReg() throws UnirestException {
		String principal = SecurityContextHolder.getContext().getAuthentication().getName();
		UserDto user = userService.findUserByPrincipal(principal).get();
		String subject = "Welcome to The BearSitters";
		String text = "Hey " + user.getAttributes().get("fname") + "!\nThank you for registering for The BearSitters. We hope you will love our pet care service as it offers all of the services you need for all of your pets and busy life.\n";

		if (user.getRoles().contains("SITTER") && user.getRoles().contains("OWNER"))
			text += "As a sitter and owner, be sure to schedule your pets' sessions as soon as you need to. You can find sessions to sit for as well. We greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet loving journey!";
		else if (user.getRoles().contains("OWNER"))
			text += "As a sitter, be sure to check out the currently available sessions to sit for near you.";
		else if (user.getRoles().contains("SITTER"))
			text += "As a pet owner, be sure to schedule your pet service with us soon so sitters can bid and and take care of your pet as fast as possible.";

		text += "\n\nWe greatly appreciate your dedication as a pet enthusiast and are glad you are joining us in this pet journey!\n\n Sincerely,\n The BearSitters";

		System.out.println(MGEmail.sendSimpleMessage(subject, text, user.getPrincipal()));
	}

}

class MGEmail {

	public static String sendSimpleMessage(String subject, String text, String to) throws UnirestException {
		HttpResponse<String> request = Unirest.post("https://api.mailgun.net/v3/mg.michaelibanez.org/messages")
				.basicAuth("api", "9d8cee7e65b579a52d1e37783f58abdf-a3d67641-58a139e2")
				.queryString("from", "donotreply@bearsitters.com")
				.queryString("to", to)
				.queryString("subject", subject)
				.queryString("text", text)
				.asString();
		// Or as .asJSon(), using string for readability purposes
		return request.getBody();
	}

}
