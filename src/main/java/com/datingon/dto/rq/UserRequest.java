package com.datingon.dto.rq;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class UserRequest {
    @NotEmpty
    @Pattern(regexp = "^(\\\\+\\\\d{1,3}( )?)?((\\\\(\\\\d{1,3}\\\\))|\\\\d{1,3})[- .]?\\\\d{3,4}[- .]?\\\\d{4}$", message = "Phone number is not valid")
    private String phoneNumber;

    @NotEmpty
    @Size(min = 4, message = "Full name is not valid")
    private String fullName;

    private LocalDate birthday;

    private String country;
    private String interests;
    private String about;
}
