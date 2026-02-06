
const API_URL = "https://booking-system-api-c0rz.onrender.com/api/appointments";


//const API_URL = "http://localhost:3000/api/appointments";



const form = document.getElementById("form-container");
const name = document.getElementById("name");
const number = document.getElementById("number");
const email = document.getElementById("email");
const date = document.getElementById("date");
const time = document.getElementById("time");
const reason = document.getElementById("reason");
const editedId = document.getElementById('editId');
const addBtn = document.getElementById("create-button");
 const tableBody = document.getElementById("appointments");
  const div = document.createElement("div");
async function getAdminKey() {
    return prompt("Please enter your password to delete or edit an appointment:");
}

async function fetchAppointments(){

    try{
          const res = await fetch(API_URL);
    const data = await res.json();

 if(data.length === 0){
         

  tableBody.innerHTML = ` <h2>There is no booked appointment yet</h2>`
        console.log("No booked appointment yet");
        return;
 }


    tableBody.innerHTML = "";

    data.forEach(app => {
        
        
        tableBody.innerHTML += `
        <tr>
        <td>${app.name} </td>
        <td>${app.email} </td>
        <td>${app.number} </td>
        <td>${app.date} </td>
        <td>${app.time} </td>
        <td>${app.reason} </td>

        <td class="btn-container" >

     
 <button type="button"  class="edit-btn" onclick='editAppointment(${JSON.stringify(app)})'>Edit</button>
         <button type="button"   class="delete-btn" onclick="deleteAppointment('${app._id}')">Delete</button>
        </td>
        </tr>
        `
     
    });

    } catch(error){
        return console.error("Network error:", error);
    }


    
}


async function createAppointment(){
   
    const id = editedId.value;

    const appointment = {
        name: name.value,
        number: number.value,
        email: email.value, 
        date: date.value,
        time: time.value,
        reason: reason.value
    }


if(id){
       
    const adminAuth = window.currentAdminKey;
    await fetch(`${API_URL}/${id}`, {
        method: "PUT", 
        headers:{
             "Content-Type": "application/json",
               "x-api-key": adminAuth
        },
        body: JSON.stringify(appointment)
    })
   

toastMessage("Your changes been Saved!", "#32B1CE");
  

    editedId.value = "";
} else{
        await fetch( API_URL,{
        method: "POST", 
        headers:{
            "Content-Type": "application/json",
             
        },
        body: JSON.stringify(appointment)
    });
 
toastMessage("Appointment added successfully!", "#458BFB");

}



clearForm();

fetchAppointments();
}


//clear the form 

function clearForm(){
      name.value = "";
    number.value = "";
    email.value = "";
    date.value = "";
    time.value = "";
    reason.value = "";
    addBtn.innerText = "Add Appointment";
    editedId.value = "";
   

}





function toastMessage(message = "action", color = "#458BFB"){
  
    div.innerHTML = `<h2>${message}</h2>`;
     div.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color:${color};
        color: white;
        padding: 19.2px 16px;
        border-radius: .3125rem;
        font-size: 12.8px;
        z-index: 1000;
        box-shadow: 0 .25rem .375rem rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(div);



    setTimeout(()=>{
        div.remove();
    },3000) 
 
}






 async function deleteAppointment(id) {
    const adminAuth = await getAdminKey(); 
    if (!adminAuth) return;



    try {

        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
           headers: {
    "x-api-key": adminAuth
  }
        });




        if(res.ok){
                    console.log("Deleted successfully");
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;
    toastMessage("Appointment has been canceled!" , "#950864ff")
        await fetchAppointments();

        }else{
  console.error("Deleting appointment failed:", await res.text());

            return;
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}



async function editAppointment(app){
  const adminAuth = await getAdminKey(); 
    if (!adminAuth) return;
 
    try{
        const res = await fetch(`${API_URL}/${app._id}`,{
            method: 'GET',
            headers:{
                 "x-api-key": adminAuth
            }
        });

        if(!res.ok){
            alert("Access is denied: Incorrect Password");
        }else{
    window.currentAdminKey = adminAuth;
    editedId.value = app._id;

    name.value = app.name;
    number.value = app.number;
    email.value = app.email;
    date.value = app.date;
    time.value = app.time;
    reason.value = app.reason;
    addBtn.innerText = "Save Changes"
    form.style.display = "grid";
    return;
        }
    }catch{error}{
        console.error("Password verification failed");
        alert("Server error; couldn't verify password")
    }
      addBtn.innerText = "Add Appointment"
}




fetchAppointments();
