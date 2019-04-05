package petfinder.site.common.rating;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {
	@Autowired
	private RatingDao ratingDao;

	public void save(RatingDto rating) {
		ratingDao.save(rating);
	}

	public Optional<RatingDto> getRating(String id) {
		return ratingDao.getRating(id);
	}

	public static class RatingQuery {
		private String principal;
		private int numStars;

		public String getPrincipial() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public int getNumStars() {
			return numStars;
		}

		public void setNumStars(int numStars) {
			this.numStars = numStars;
		}
	}
}
