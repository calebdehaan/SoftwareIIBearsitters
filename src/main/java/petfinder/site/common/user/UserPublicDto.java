package petfinder.site.common.user;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;
import java.util.Map;

public class UserPublicDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private Map<String, Object> attributes;
	private List<String> pets;
	private List<Double> ratings;
	private int posts;

	private UserPublicDto() {
	}

	public UserPublicDto(String principal, List<String> roles, Map<String, Object> attributes, List<String> pets, List<Double> ratings) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.pets = pets;
		this.ratings = ratings;
	}

	public UserPublicDto(UserDto user) {
		this.principal = user.getPrincipal();
		this.roles = user.getRoles();
		this.attributes = user.getAttributes();
		this.pets = user.getPets();
		this.ratings = user.getRatings();
		this.posts = user.getPosts().size();
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public List<String> getPets() {
		return pets;
	}

	public void setPets(List<String> pets) {
		this.pets = pets;
	}

	public List<Double> getRating() {
		return ratings;
	}

	public void setRatings(List<Double> ratings) {
		this.ratings = ratings;
	}

	public int getPosts() {
		return posts;
	}

	public void setPosts(int posts) {
		this.posts = posts;
	}

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}


	public enum UserType {
		OWNER, SITTER
	}
}
