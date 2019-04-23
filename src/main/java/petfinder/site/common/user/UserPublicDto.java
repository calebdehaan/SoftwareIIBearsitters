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

	private UserPublicDto() {
	}

	public UserPublicDto(String principal, List<String> roles, Map<String, Object> attributes, List<String> pets) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.pets = pets;
	}

	public UserPublicDto(UserDto user) {
		this.principal = user.getPrincipal();
		this.roles = user.getRoles();
		this.attributes = user.getAttributes();
		this.pets = user.getPets();
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

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}


	public enum UserType {
		OWNER, SITTER
	}
}
