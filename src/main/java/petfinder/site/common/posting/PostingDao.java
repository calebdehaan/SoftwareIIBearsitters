package petfinder.site.common.posting;

import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.elasticsearch.PostingElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class PostingDao {
	@Autowired
	private PostingElasticsearchRepository postingElasticsearchRepository;

	@Autowired
	private UserElasticSearchRepository userRepository;

	public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return userRepository.search(searchSourceBuilder).stream().findFirst();
	}

	public void save(PostingDto posting) {
		if(posting.getSitterPrincipal() != null){
			Optional<UserAuthenticationDto> optAuthUser = findUserByPrincipal(posting.getSitterPrincipal());
			if(optAuthUser.isPresent()){
				UserAuthenticationDto authUser = optAuthUser.get();
				UserDto user = authUser.getUser();
				userRepository.save(authUser);

			}
		}
		postingElasticsearchRepository.save(posting);
	}

	public Optional<PostingDto> findPosting(String id) {
		return postingElasticsearchRepository.find(id);
	}

	public List<Optional<PostingDto>> findAllPostings() {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		searchSourceBuilder.query(QueryBuilders.matchAllQuery());

		List<PostingDto> postingList = new ArrayList<>(postingElasticsearchRepository.search(searchSourceBuilder));

		List<Optional<PostingDto>> optPostingList = new ArrayList<>();
		for (PostingDto s : postingList) {
			optPostingList.add(Optional.ofNullable(s).filter(sf -> !sf.isEmpty()));
		}

		return optPostingList;
	}
}