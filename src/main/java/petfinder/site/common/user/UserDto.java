package petfinder.site.common.user;

import java.util.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Momento;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private Map<String, Object> attributes;
	private Map<String, Object> address;
	private List<String> pets;
	private List<String> posts;
	private UserDto() {

	}

	public UserDto(String principal, List<String> roles, Map<String, Object> attributes, Map<String, Object> address, List<String> pets, List<String> posts) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.address = address;
		this.pets = pets;
		this.posts = posts;
	}

	public String getPrincipal() {
		return principal;
	}

	public List<String> getRoles() {
		return roles;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public Map<String, Object> getAddress() {
		return address;
	}

	public List<String> getPets() {
		return pets;
	}

	public void setPets(List<String> pets) {
		this.pets = pets;
	}

	public void addPet(String id) {
		if (this.pets == null) {
			this.pets = new ArrayList<>();
		}
		this.pets.add(id);
	}

	public void deletePet(String id) {
		if (this.pets != null) {
			this.pets.remove(id);
		}
	}

	public List<String> getPosts() {
		return posts;
	}

	public void setPosts(List<String> posts) {
		this.posts = posts;
	}

	public void addPost(String id) {
		if (this.posts == null) {
			this.posts = new ArrayList<>();
		}
		this.posts.add(id);
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