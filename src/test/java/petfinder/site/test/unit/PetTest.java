package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import petfinder.site.common.pet.PetDto;

public class PetTest {
  @DisplayName("PetDto")
  @Nested
  class PetDtoTest {
    private PetDto dto = new PetDto();

    @DisplayName("Setters")
    @Nested
    class Setters {
      @DisplayName("Valid Values")
      @Nested
      class Valid {
        @DisplayName("Set ID")
        @Test
        void setId() {
          String testId = "test id";
          dto.setId(testId);
          assertEquals(testId, dto.getId());
        }

        @DisplayName("Set Name")
        @Test
        void setName() {
          String testName = "Test Name";
          dto.setName(testName);
          assertEquals(testName, dto.getName());
        }

        @DisplayName("Set Type")
        @Test
        void setType() {
          String testType = "Type";
          dto.setType(testType);
          assertEquals(testType, dto.getType());
        }
      }
    }
  }
}
