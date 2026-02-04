
const API_URL = "http://localhost:3000/api/appointments";
const API_KEY = "my-secret-key";


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



async function fetchAppointments(){
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

        <td >

     
 <button type="button"  class="edit-btn" onclick='editAppointment(${JSON.stringify(app)})'>Edit</button>
         <button type="button"   class="delete-btn" onclick="deleteAppointment('${app._id}')">Delete</button>
        </td>
        </tr>
        `
     
    });

    
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
    await fetch(`${API_URL}/${id}`, {
        method: "PUT", 
        headers:{
             "Content-Type": "application/json", 
             "x-api-key": API_KEY
        },
        body: JSON.stringify(appointment)
    })
    
    editedId.value = "";
} else{
        await fetch( API_URL,{
        method: "POST", 
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointment)
    });

}

toastMessage();

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
   

}

function toastMessage(){
    const div = document.createElement("div");
    div.innerHTML = `<h2>You have added a new appointment</h2>`;
     div.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #7371e4ff;
        color: white;
        padding: 1.2rem 1rem;
        border-radius: 5px;
        font-size: 0.8rem;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(div);



    setTimeout(()=>{
        div.remove();
    },3000)
 
}


   
 async function deleteAppointment(id) {
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "x-api-key": API_KEY
            }
        });




        if(res.ok){
                    console.log("Deleted successfully");

        await fetchAppointments();

        }else{
  console.error("Deleting appointment failed:", await res.text());
            return;
        }
    } catch (error) {
        console.error("Network error:", error);
    }






}



function editAppointment(app){
    editedId.value = app._id;

    name.value = app.name;
    number.value = app.number;
    email.value = app.email;
    date.value = app.date;
    time.value = app.time;
    reason.value = app.reason;
    addBtn.innerText = "Save changes"
    form.style.display = "block";
    return;
}




fetchAppointments()
