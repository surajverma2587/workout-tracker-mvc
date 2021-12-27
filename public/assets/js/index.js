const loginForm = $("#login-form");
const signUpForm = $("#sign-up-form");
const signUpConfirmationModal = $("#sign-up-confirmation-modal");

const getErrorsSignUp = ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  height,
  weight,
  age,
}) => {
  const errors = {};

  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (
    !password ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    errors.password = "Invalid password";
  }

  if (!confirmPassword || password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!firstName) {
    errors.firstName = "First name is required";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  }

  if (!height || +height <= 0) {
    errors.height = "Height is required and cannot be 0";
  }

  if (!weight || +weight <= 0) {
    errors.weight = "Weight is required and cannot be 0";
  }

  if (!age || +age <= 0) {
    errors.age = "Age is required and cannot be 0";
  }

  return errors;
};

const renderErrorMessages = (errors) => {
  const fields = [
    "email",
    "password",
    "confirmPassword",
    "firstName",
    "lastName",
    "height",
    "weight",
    "age",
  ];
  fields.forEach((field) => {
    const errorDiv = $(`#${field}-error`);

    if (errors[field]) {
      errorDiv.text(errors[field]);
    } else {
      errorDiv.text("");
    }
  });
};

const handleSignUp = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirm-password").val();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const height = $("#height").val();
  const weight = $("#weight").val();
  const age = $("#age").val();

  const errors = getErrorsSignUp({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    height,
    weight,
    age,
  });

  renderErrorMessages(errors);

  if (!Object.keys(errors).length) {
    const response = await fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        height,
        weight,
        age,
      }),
    });

    const data = await response.json();

    if (data.success) {
      signUpConfirmationModal.modal("show");
      signUpConfirmationModal.on("hide.bs.modal", () => {
        window.location.replace("/login");
      });
    }
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  $("#login-error").text("");

  if (!email || !password) {
    $("#login-error").text("Login failed, please try again");
  } else {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.replace("/my-workouts");
    } else {
      $("#login-error").text("Login failed, please try again");
    }
  }
};

const onReady = () => {
  signUpConfirmationModal.modal("hide");
};

signUpForm.on("submit", handleSignUp);
loginForm.on("submit", handleLogin);

$(document).ready(onReady);
