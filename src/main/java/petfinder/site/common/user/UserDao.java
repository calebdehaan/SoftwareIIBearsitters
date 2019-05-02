package petfinder.site.common.user;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import alloy.elasticsearch.ElasticSearchClientProvider;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.index.get.GetResult;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.posting.PostingDto;
import petfinder.site.elasticsearch.PetElasticsearchRepository;
import petfinder.site.elasticsearch.PostingElasticsearchRepository;
import petfinder.site.elasticsearch.UserElasticSearchRepository;
import petfinder.site.elasticsearch.UserPetElasticsearchRepository;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class UserDao {
	@Autowired
	private UserElasticSearchRepository userRepository;

	@Autowired
	private UserPetElasticsearchRepository userPetRepository;

	@Autowired
	private PetElasticsearchRepository petRepository;

	@Autowired
	private ElasticSearchClientProvider eProvider;

	@Autowired
	private PostingElasticsearchRepository postingRepository;

	public Optional<UserAuthenticationDto> findUserByPrincipal(String principal) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("user.principal=\"%s\"", principal.replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		return userRepository.search(searchSourceBuilder).stream().findFirst();
	}

	public void save(UserAuthenticationDto userAuthentication) {

		userRepository.save(userAuthentication);
	}


	public List<Optional<PetDto>> findPets(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));
		// List<UserPetDto> userPets = userPetRepository.search(searchSourceBuilder);
		List<String> userPets = user.getPets();
		return userPets.stream()
				.map(id -> petRepository.find(id))
				.collect(Collectors.toList());
	}

	public List<Optional<PostingDto>> findPostings(UserDto user) {
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

		String queryString = String.format("userPrincipal=\"%s\"", user.getPrincipal().replace("\"", ""));
		searchSourceBuilder.query(QueryBuilders.queryStringQuery(queryString));

		List<String> userPosts = user.getPosts();
		return userPosts.stream()
				.map(id -> postingRepository.find(id))
				.collect(Collectors.toList());
	}



	public UserPetDto save(UserPetDto userPetDto) {
		return userPetRepository.save(userPetDto);
	}

	public void delete(String principal) {
		userRepository.delete(principal);
	}

	public void update(UserDto user) throws IOException {
		// Helpful to understand
		//https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/java-docs-update.html
		UpdateRequest updateRequest = new UpdateRequest();
		updateRequest.index("petfinder-users");
		updateRequest.type("doc");
		updateRequest.id(user.getPrincipal());
		updateRequest.doc(jsonBuilder()
				.startObject()
				.startObject("user")
				.field("principal", user.getPrincipal())
				.field("attributes", user.getAttributes())
				.field("roles", user.getRoles())
				.field("address", user.getAddress())
				.field("pets", user.getPets())
				.field("posts", user.getPosts())
				.field("ratings", user.getRatings())
				.endObject()
				.endObject());

		UpdateResponse response = eProvider.getClient().update(updateRequest);
	}
}