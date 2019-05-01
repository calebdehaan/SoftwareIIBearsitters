package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import petfinder.site.common.posting.PostingDto;

public class PostingTest {
  @DisplayName("Posting Dto")
  @Nested
  class PostingDtoTest {
    PostingDto dto = new PostingDto(null, null, null, null, null, null, null, null, null, null);
    @DisplayName("Setters")
    @Nested
    class Setters {
      @DisplayName("Valid Values")
      @Nested
      class Valid {
        @DisplayName("ID")
        @Test
        void id() {
          String id = "id";
          dto.setId(id);
          assertEquals(id, dto.getId());
        }

        @DisplayName("Owner Principal")
        @Test
        void ownerPrincipal() {
          String ownerPrincipal = "ownerPrincipal";
          dto.setOwnerPrincipal(ownerPrincipal);
          assertEquals(ownerPrincipal, dto.getOwnerPrincipal());
        }

        @DisplayName("Sitter Principal")
        @Test
        void sitterPrincipal() {
          String sitterPrincipal = "sitterPrincipal";
          dto.setSitterPrincipal(sitterPrincipal);
          assertEquals(sitterPrincipal, dto.getSitterPrincipal());
        }

        @DisplayName("Start Date")
        @Test
        void startDate() {
          String startDate = "01/01/1970";
          dto.setStartDate(startDate);
          assertEquals(startDate, dto.getStartDate());
        }

        @DisplayName("End Date")
        @Test
        void endDate() {
          String endDate = "01/02/1970";
          dto.setEndDate(endDate);
          assertEquals(endDate, dto.getEndDate());
        }
      }
    }
  }
}
