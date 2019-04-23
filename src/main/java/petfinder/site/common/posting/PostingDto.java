package petfinder.site.common.posting;
import alloy.util.Momento;
import petfinder.site.common.pet.PetDto;

import java.util.ArrayList;
import java.util.List;

public class PostingDto implements Momento<String> {
	private String id;
	private String ownerPrincipal;
	private String sitterPrincipal;
	private String startDate;
	private String endDate;
	private List<String> pets;
	private List<String> possibleSitters;

	private PostingDto() {
	}

	public PostingDto(String id, String ownerPrincipal, String sitterPrincipal, String startDate,
			String endDate, List<String> pets, List<String> possibleSitters) {
		setId(id);
		setOwnerPrincipal(ownerPrincipal);
		setSitterPrincipal(sitterPrincipal);
		setStartDate(startDate);
		setEndDate(endDate);
		setPets(pets);
		setPossibleSitters(possibleSitters);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOwnerPrincipal() {
		return ownerPrincipal;
	}

	public void setOwnerPrincipal(String ownerPrincipal) {
		this.ownerPrincipal = ownerPrincipal;
	}

	public String getSitterPrincipal() {
		return sitterPrincipal;
	}

	public void setSitterPrincipal(String sitterPrincipal) {
		this.sitterPrincipal = sitterPrincipal;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public List<String> getPets() {
		return pets;
	}

	public void setPets(List<String> pets) {
		this.pets = pets;
	}

	public List<String> getPossibleSitters() {
		return possibleSitters;
	}

	public void setPossibleSitters(List<String> possibleSitters) {
		this.possibleSitters = possibleSitters;
	}

	public void addPossibleSitter(String principal){
		if(this.possibleSitters == null){
			this.possibleSitters = new ArrayList<>();
		}
		this.possibleSitters.add(principal);
	}

	public boolean isEmpty() {
		return id == null;
	}

	@Override
	public String getMomento() {
		return id;
	}
}
