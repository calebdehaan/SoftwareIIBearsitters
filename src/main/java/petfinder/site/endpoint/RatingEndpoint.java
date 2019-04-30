package petfinder.site.endpoint;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.rating.RatingDto;
import petfinder.site.common.rating.RatingService;

@RestController
@RequestMapping("/api/rating")
public class RatingEndpoint {
  @Autowired
  private RatingService ratingService;

  @PostMapping(produces = "application/json")
  public void saveRating(@RequestBody RatingDto rating) {
    ratingService.save(rating);
  }

  @GetMapping(value = "/{id}", produces = "application/json")
  public Optional<RatingDto> getRating(@PathVariable("id") String id) {
    return ratingService.getRating(id);
  }

  @GetMapping(value = "/{username}", produces = "application/json")
  public Optional<Double> getUserAverage(@PathVariable("username") String username) {
    return ratingService.getUserAverage(username);
  }
}
