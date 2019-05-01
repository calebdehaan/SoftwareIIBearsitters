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

	public void cancelPost(String id) {
		postingDao.cancel(id);
	}

	public void deletePost(String id) {
		postingDao.delete(id);
	}
}
