const usernameInp = document.querySelector(".username_input");
const passwordInp = document.querySelector(".password_input");
const loginBtn = document.querySelector(".login_btn");
const loginForm = document.querySelector(".login_form");
const login = async(username, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/admin/login",
            data: {
                username,
                password,
            },
        });
        console.log(res)
        if (res.data.status === "success") {
            alert("Logged In Successfully!");
            window.setTimeout(() => {
                location.assign("/admin.html");
            }, 500);
        }
    } catch (err) {
        alert(err.response.data.message);
       
    }
};

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(usernameInp.value, passwordInp.value);
});
