package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import petfinder.site.common.rating.RatingDto;

public class RatingTest {
  @DisplayName("RatingDto")
  @Nested
  class RatingDtoTest {
    RatingDto rating = new RatingDto(null, 0);

    @DisplayName("Setters")
    @Nested
    class Setters {
      @DisplayName("Set ID")
      @Test
      void id() {
        String id = "test@test.com";
        rating.setId(id);
        assertEquals(id, rating.getMomento());
      }

      @DisplayName("Set Rating")
      @Test
      void rating() {
        int stars = 5;
        rating.setNumStars(stars);
        assertEquals(stars, rating.getNumStars());
      }
    }

    @DisplayName("Constructor")
    @Nested
    class Constructor {
      @DisplayName("Good values")
      @Test
      void constr() {
        String id = "id";
        int numStars = 2;
        RatingDto dto = new RatingDto(id, numStars);
        assertEquals(id, dto.getMomento());
        assertEquals(dto.getNumStars(), numStars);
      }
    }
  }
}
