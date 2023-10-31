
document.addEventListener("DOMContentLoaded", async function () {
    try {
      const token = sessionStorage.getItem("token");
  
      const response = await axios.get("http://localhost:4000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        const userData = response.data;
        const profileDataElement = document.getElementById("profile-data");
  
        profileDataElement.innerHTML = `
          <p>ID: ${userData.id}</p>
          <p>Name: ${userData.name}</p>
        `;
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
  