function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const phonenumber = event.target.phonenumber.value;
    const obj = {
        name,
        email,
        phonenumber
    } 
        const data = axios.post("https://crudcrud.com/api/fd76ce88c7c1472697a0dd44ccc7c64d/appoinmentData",obj)
      .then((respone) =>{
        showNewUserOnScreen(respone.data) 
        console.log(respone);
      })
      .catch((err) =>{
        console.log(err);
      })
      
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("https://crudcrud.com/api/fd76ce88c7c1472697a0dd44ccc7c64d/appoinmentData")
    .then((respone) =>{
      console.log(respone);
  
      for(var i=0; i<respone.data.length; i++){
        showNewUserOnScreen(respone.data[1])
      }
    })
    .catch((error) =>{
      console.log(error);
    })
    
    console.log(data);
  
  })
  
  function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }
  
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')>Edit User </button>
                         </li>`
  
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  
  //Edit User
  
  function editUserDetails(emailId, name, phonenumber,userId){
  
    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;
  
    deleteUser(userId)
  }
  
  // deleteUser('abc@gmail.com')
  
  function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/fd76ce88c7c1472697a0dd44ccc7c64d/appoinmentData/${userId}`)
    .then((respone) =>{
      removeUserFromScreen(userId);
  
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  
  function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
  }
