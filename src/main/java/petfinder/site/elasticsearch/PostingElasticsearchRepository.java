package petfinder.site.elasticsearch;

import alloy.elasticsearch.ElasticSearchClientProvider;
import alloy.elasticsearch.ElasticSearchIndex;
import alloy.elasticsearch.ElasticSearchRepository.ElasticSearchJsonRepository;
import org.springframework.stereotype.Service;
import petfinder.site.common.posting.PostingDto;

@Service
public class PostingElasticsearchRepository extends ElasticSearchJsonRepository<PostingDto, String> {
	public PostingElasticsearchRepository(ElasticSearchClientProvider provider) {
		super(new ElasticSearchIndex(provider, "petfinder-posts"), PostingDto.class);
	}
}