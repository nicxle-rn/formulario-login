console.log("Hola mundo");

const nameInput = document.getElementById("name");
const edadInput = document.getElementById("edad");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const registrarUsuario = async (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const edad = edadInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const json = await response.json();

    const emailUsers = json.map(
        function (user){
            return user.email;
        }
    ) //se crea un nuevo array para almacenar nada mas los emails de los usuarios

    console.log(emailUsers);

    const emailFilter = emailUsers.filter(
        function (emailDB){
            return emailDB === email;
        }
    ) //metodo que permite filtrar items

    console.log(emailFilter);

    if (emailFilter.length > 0){
        alert("Ingresa otro email, este ya se encuentra registrado");
        console.error(email, "Email ya registrado");
        return
    }

    if (password !== confirmPassword){
        alert("Las contraseñas no coinciden");
        console.error(password, confirmPassword,"Contraseñas distintas");
        return;
    }

    if (edad < 18){
        alert("Debes ser mayor de edad para el registro");
        console.error(edad, "Edad menor a 18");
        return;
    }

    localStorage.setItem("emailUsuario", email);
    window.location.href = "bienvenida.html";
}

const validarRegistro = () => {
    const userRegistrado = localStorage.getItem("emailUsuario");

    if (userRegistrado) {
        window.location.href = "bienvenida.html";
    }
}

if (window.location.pathname !== "/bienvenida.html") {
    validarRegistro();
}

const logout = () => {
    localStorage.clear();
    window.location.href = "index.html";
}