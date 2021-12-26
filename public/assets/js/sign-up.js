const signUpForm = $("#sign-up-form");
const emailInput = $("#email");
const passwordInput = $("#password");
const confirmPasswordInput = $("#confirm-password");
const firstNameInput = $("#first-name");
const lastNameInput = $("#last-name");
const heightInput = $("#height");
const weightInput = $("#weight");
const ageInput = $("#age");

const getErrors = ({
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

  const email = emailInput.val();
  const password = passwordInput.val();
  const confirmPassword = confirmPasswordInput.val();
  const firstName = firstNameInput.val();
  const lastName = lastNameInput.val();
  const height = heightInput.val();
  const weight = weightInput.val();
  const age = ageInput.val();

  const errors = getErrors({
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
      window.location.replace("/login");
    }
  }
};

signUpForm.on("submit", handleSignUp);
