package petfinder.site.common.rating;

import alloy.util.Momento;
import java.util.List;

public class RatingDto implements Momento<String> {
	private String id;
	private int numStars;

	public RatingDto() {
		super();
	}

	public RatingDto(String id, int numStars) {
		setId(id);
		setNumStars(numStars);
	}

	public void setNumStars(int numStars) {
		this.numStars = numStars;
	}

	public int getNumStars() {
		return numStars;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String getMomento() {
		return id;
	}
}
