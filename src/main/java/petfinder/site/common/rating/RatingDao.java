package petfinder.site.common.rating;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import petfinder.site.elasticsearch.RatingElasticSearchRepository;

@Repository
public class RatingDao {
	@Autowired
	private RatingElasticSearchRepository ratingElasticsearchRepository;

	public RatingDto save(RatingDto rating) {
		return ratingElasticsearchRepository.save(rating);
	}

	public Optional<RatingDto> getRating(String id) {
		return ratingElasticsearchRepository.find(id);
	}
}