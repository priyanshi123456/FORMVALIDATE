let form = document.querySelector("#form")
let nameerror = document.querySelector(".nameerror")
let emailerror = document.querySelector(".emailerror")
let passerror = document.querySelector(".passworderror")
let confrmpasserror = document.querySelector(".confrmpasserror")
let inputs = Array.from(document.querySelectorAll(".inputfield"))

inputs.forEach((input, index) => {
    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()  
            inputs[index + 1].focus()
        }
    })
})
function validate(formvalues) {
    let errors = {};
    let regex1 = /^[a-zA-Z]*$/
    let regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (formvalues.name.length <= 3 || formvalues.name.length >= 20) {
        errors.name = "Name must be between 3 - 20 characters"
    }
    if (formvalues.pass.length < 6 || formvalues.pass.length > 10) {
        errors.pass = "Password must be between 6-10 characters long"
    }
    else{
         if (formvalues.pass.search(/[0-9]/) == -1) {
            errors.pass = "password should contain atleast  1 number"
        }
         if (formvalues.pass.search(/[a-z]/) == -1) {
            errors.pass = "password should contain atleast  1 lowercase "
        }
         if (formvalues.pass.search(/[A-Z]/) == -1) {
            errors.pass = "password should contain atleast  1 uppercase "
        }
    }
    if (!formvalues.name) {
        errors.name = "Name cannot be empty"
    }
    if (!formvalues.email) {
        errors.email = "Email cannot be empty"
    }
    if (!formvalues.pass) {
        errors.pass = "password cannot be empty"
    }
    if (!(regex1.test(formvalues.name))) {
        errors.name = "Invalid name"
    }

    if (!(regex2.test(formvalues.email))) {
        errors.email = "please enter valid email"

    }
    if (formvalues.confrm !== formvalues.pass) {
        errors.confrm = "Passwords don't match"
    }
    return errors
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Array.from(event.target)
    const formvalues = {
        name: value[0].value,
        email: value[1].value,
        pass: value[2].value,
        confrm: value[3].value
    }
    let errors = validate(formvalues)
    if (Object.keys(errors).length > 0) {
        nameerror.innerText = errors.name || ""
        emailerror.innerText = errors.email || ""
        passerror.innerText = errors.pass || ""
        confrmpasserror.innerText = errors.confrm || ""
    }
    else {
        form.reset()
        window.location.href = "./signup.html";
    }
})