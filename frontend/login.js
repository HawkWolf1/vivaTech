async function login(event){
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

        const loginD = {
            email,
            password
        }
        console.log(loginD)
        

        if (!email || !password) {
        alert("Please enter a valid email and password.");
        return;
    }


    try {
        const pqr = await axios.post("http://localhost:4000/user/login", loginD);
        console.log(pqr);

        if (pqr.status === 200) {
            alert(pqr.data.message);
            sessionStorage.setItem('token', pqr.data.token)  
            window.location.href = "./verify-otp.html";
        } else {
            alert("Email or password is incorrect.");
        }
    } catch (err) {
        console.log(JSON.stringify(err));
        document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'>We have an Error!!!</h3>";
    }

    }