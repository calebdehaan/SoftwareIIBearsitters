package petfinder.site.test.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserDto.UserType;

public class UserTest {
  @DisplayName("UserDto")
  @Nested
  class UserDtoTest {
    @DisplayName("Constructor")
    @Nested
    class Constructor {
      @Test
      void valid() {
        String principal = "principal";
        List<String> roles = Arrays.asList("role1", "role2");
        UserType type = UserType.OWNER;
        Map<String, Object> attributes = new HashMap<>();
        //UserDto dto = new UserDto(principal, roles, type, attributes);
      }
    }
  }
}
