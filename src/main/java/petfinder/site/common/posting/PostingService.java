package petfinder.site.common.posting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostingService {
	@Autowired
	private PostingDao postingDao;

	public void save(PostingDto posting) {
		postingDao.save(posting);
	}
	public Optional<PostingDto> findPosting(String id) {
		return postingDao.findPosting(id);
	}

	public List<Optional<PostingDto>> findAllPostings() {
		return postingDao.findAllPostings();
	}

	public List<Optional<PostingDto>> findRecommendedPostings(String user) {
		return postingDao.findRecommendedPostings(user);
	}

	public void deletePost(String id) {
		postingDao.delete(id);
	}

	public static class PostingQuery {
		private List<String> pets;
		private String dateRangeStart;
		private String dateRangeEnd;
		private String timeRangeStart;
		private String timeRangeEnd;

		public List<String> getPets() {
			return pets;
		}

		public void setPets(List<String> pets) {
			this.pets = pets;
		}

		public String getDateRangeStart() {
			return dateRangeStart;
		}

		public void setDateRangeStart(String dateRangeStart) {
			this.dateRangeStart = dateRangeStart;
		}

		public String getDateRangeEnd() {
			return dateRangeEnd;
		}

		public void setDateRangeEnd(String dateRangeEnd) {
			this.dateRangeEnd = dateRangeEnd;
		}

		public String getTimeRangeStart() {
			return timeRangeStart;
		}

		public void setTimeRangeStart(String timeRangeStart) {
			this.timeRangeStart = timeRangeStart;
		}

		public String getTimeRangeEnd() {
			return timeRangeEnd;
		}

		public void setTimeRangeEnd(String timeRangeEnd) {
			this.timeRangeEnd = timeRangeEnd;
		}

	}
}
