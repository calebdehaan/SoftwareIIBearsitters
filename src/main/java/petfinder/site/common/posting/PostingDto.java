package petfinder.site.common.posting;
import alloy.util.Momento;

import java.util.List;

public class PostingDto implements Momento<String> {
	private String id;
	private String ownerPrincipal;
	private String sitterPrincipal;
	private String startDate;
	private String endDate;
	private String startTime;
	private String endTime;
	private List<String> pets;

	private PostingDto() {
	}

	public PostingDto(String id, String ownerPrincipal, String sitterPrincipal, String startDate,
			String endDate, String startTime, String endTime, List<String> pets) {
		setId(id);
		setOwnerPrincipal(ownerPrincipal);
		setSitterPrincipal(sitterPrincipal);
		setStartDate(startDate);
		setEndDate(endDate);
		setStartTime(startTime);
		setEndTime(endTime);
		setPets(pets);
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

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public boolean isEmpty() {
		return id == null;
	}

	@Override
	public String getMomento() {
		return id;
	}
}
