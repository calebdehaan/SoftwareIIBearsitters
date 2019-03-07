package petfinder.site.common.pet;

import java.util.UUID;

import alloy.util.Identifiable;
import alloy.util.Momento;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto implements Momento<String> {
	private String id;
	private String petName;
	private String petSpecies;
	private String petSex;
	private Long petAge;

	public PetDto(String id, String petName, String petSpecies, String petSex, Long petAge) {
		this.id = id;
		this.petName = petName;
		this.petSpecies = petSpecies;
		this.petSex = petSex;
		this.petAge = petAge;

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	@Override
	public String getMomento() {
		return id;
	}

	public String getPetName() {
		return petName;
	}

	public void setPetName(String petName) {
		this.petName = petName;
	}

	public String getPetSpecies() {
		return petSpecies;
	}

	public void setPetSpecies(String petSpecies) {
		this.petSpecies = petSpecies;
	}

	public String getPetSex() {
		return petSex;
	}

	public void setPetSex(String petSex) {
		this.petSex = petSex;
	}

	public Long getPetAge() {
		return petAge;
	}

	public void setPetAge(Long petAge) {
		this.petAge = petAge;
	}
}