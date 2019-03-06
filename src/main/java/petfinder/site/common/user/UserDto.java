package petfinder.site.common.user;

import java.util.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Identifiable;
import alloy.util.Momento;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private Map<String, Object> attributes;
	private Map<String, Object> address;
	private List<Long> pets;

	private UserDto() {

	}

	public UserDto(String principal, List<String> roles, Map<String, Object> attributes,Map<String, Object> address, List<Long> pets) {
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.address = address;
		this.pets = pets;
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

	public List<Long> getPets() {
		return pets;
	}

	public void setPets(List<Long> pets) {
		this.pets = pets;
	}

	public void addPet(Long id) {
		if (this.pets == null) {
			this.pets = new ArrayList<>();
		}
		this.pets.add(id);
	}

	public void deletePet(Long id) {
		if (this.pets != null) {
			this.pets.remove(id);
		}
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