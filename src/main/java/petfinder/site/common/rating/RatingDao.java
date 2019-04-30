package petfinder.site.common.rating;

import java.util.Optional;
import java.util.stream.Collectors;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
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

	public Optional<Double> getUserAvg(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return Optional.of(ratingElasticsearchRepository.search(searchSourceBuilder).stream().map(a -> a.getNumStars()).collect(
				Collectors.averagingDouble(a -> (double)a)));
	}
}