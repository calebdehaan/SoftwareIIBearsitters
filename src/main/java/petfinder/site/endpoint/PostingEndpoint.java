package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.posting.PostingDto;
import petfinder.site.common.posting.PostingService;
import petfinder.site.common.user.UserDto;

import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostingEndpoint {
	// PetService contains our business logic for dealing with pets as well as saving/reading them
	@Autowired
	private PostingService postingService;

	@PostMapping(produces = "application/json")
	public void savePosting(@RequestBody PostingDto post) {
		postingService.save(post);
	}

	@PostMapping(value = "/update")
	public void updatePost(@RequestBody PostingDto post) {
		postingService.save(post);
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public Optional<PostingDto> getPosting(@PathVariable("id") String id) {
		return postingService.findPosting(id);
	}

	@GetMapping(value = "/recommended/{userName:.+}")
	public List<Optional<PostingDto>> getRecommended(@PathVariable String userName) {
		String user = URLDecoder.decode(userName);
		System.out.println(user);
		return postingService.findRecommendedPostings(user);
	}

	@GetMapping(value = "/all", produces = "application/json")
	public List<Optional<PostingDto>> getAllPostings() {
		return postingService.findAllPostings();
	}

	@PostMapping(value = "/cancel/{id}")
	public void cancelSession(@PathVariable("id") String id) {
		postingService.cancelPost(id);
	}

	@PostMapping(value = "/delete/{id}")
	public void deletePost(@PathVariable("id") String id) {
		postingService.deletePost(id);
	}


}