package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.posting.PostingDto;
import petfinder.site.common.posting.PostingService;

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

	@GetMapping(value = "/{id}", produces = "application/json")
	public Optional<PostingDto> getPosting(@PathVariable("id") String id) {
		return postingService.findPosting(id);
	}

	@GetMapping(value = "/all", produces = "application/json")
	public List<Optional<PostingDto>> getAllPostings() {
		return postingService.findAllPostings();
	}

	@PostMapping(value = "/delete/{id}")
	public void deletePost(@PathVariable("id") String id) {
		postingService.deletePost(id);
	}


}