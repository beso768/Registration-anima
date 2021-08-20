const form = $("#registration-form");
let errors = [];
const setError = (err) => {
  if (!errors.includes(err)) {
    errors.push(err);
  }
};

form.submit((e) => {
  e.preventDefault();
  validation();
});

const validation = () => {
  checkEmptyInputs();
  checkPassword();
  checkEmail();
  // check errors
  if (errors.length > 0) {
    if ($(document).find("#form-error").length === 0) {
      $("<div id='form-error'>გთხოვთ შეავსოთ ყველა ველი</div>").appendTo(form);
    }
  } else {
    //if no errors open popup
    $("#form-error").remove();
    showPopup();
    clearForm();
  }
};

// initialize fields
const fields = {
  region: $("#selectbox2"),
  position: $("#selectbox1"),
  email: $("#email"),
  username: $("#name"),
  surname: $("#surname"),
  password: $("#password"),
  passwordConfirm: $("#password-confirm"),
};
// initialize checkboxes
const checkboxes = {
  platformCheck: $("#platform"),
  confidence: $("#confidence"),
};

// toggle password visibility with eye icon
$("#eye").click(() => toggleVisibility($("#eye"), fields.password));
$("#eyeconfirm").click(() =>
  toggleVisibility($("#eyeconfirm"), fields.passwordConfirm)
);
const toggleVisibility = (btn, input) => {
  btn.toggleClass("fa-eye-slash");
  input.attr("type") === "password"
    ? input.attr("type", "text")
    : input.attr("type", "password");
};

// check valid email
const checkEmail = () => {
  // regex expression for email validation
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(fields.email.val()).toLowerCase())) {
    fields.email.next().text("არასწორი მეილი");
    setError("invalidEmail");
  } else {
    // if no errors delete from array
    errors = errors.filter((item) => item !== "invalidEmail");
  }
};

const checkPassword = () => {
  // paswords equal
  if (fields.password.val() !== fields.passwordConfirm.val()) {
    $("#password-error").text("პაროლები არ ემთხვევა");
    setError("nonEqualPasswords");
  } else {
    errors = errors.filter((item) => item !== "nonEqualPasswords");
  }
  // passwor lowercase / uppercase letters validation
  let reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!reg.test(fields.password.val())) {
    $("#main-password-error").text(
      "პაროლი უნდა შეიცავდეს მინ. 6 სიმბოლოს (პატარა ლათინური, დიდი ლათინური, ციფრი)."
    );
    setError("invalidPsswords");
  } else {
    errors = errors.filter((item) => item !== "invalidPsswords");
  }
};

const checkEmptyInputs = () => {
  // checkboxes
  for (let key in checkboxes) {
    if (!checkboxes[key].is(":checked")) {
      setError("checkBoxError");
    } else {
      errors = errors.filter((item) => item !== "checkBoxError");
    }
    // rest inputs
    for (let key in fields) {
      const wrapper = fields[key].closest(".field");
      if (!fields[key].val()) {
        wrapper.addClass("incorrect");
        wrapper.find(".error-message").text("ველი ცარიელია");
        setError(fields[key]);
      } else {
        errors = errors.filter((item) => item !== fields[key]);
        wrapper.removeClass("incorrect");
        wrapper.find(".error-message").text("");
      }
    }
    if (fields.position.val() === "სხვა") {
      if (!$("#other-position").val()) {
        $("#other-position").next().text("ველი ცარიელია");
        $("#other-position").closest(".field").addClass("incorrect");
        setError("position-error");
      } else {
        errors = errors.filter((item) => item !== "position-error");
      }
    }
  }
};
const clearForm = () => {
  for (let key in fields) {
    fields[key].val("");
  }
};
const hidePopup = () => {
  $(".popup-wr").css("top", "-120%");
};

const showPopup = () => {
  $(".popup-wr").css("top", 0);
  // Fill popup table with input values
  for (let key in fields) {
    $(`#${key}-value`).find("p").text(fields[key].val());
  }
  // If position select value is "other" print input value / print select value
  $(`#position-value`)
    .find("p")
    .text(
      $("#selectbox1").val() === "სხვა"
        ? $("#other-position").val()
        : $("#selectbox1").val()
    );
  $("document").click(() => console.log("e"));
};
$("#popup-close").click(hidePopup);
